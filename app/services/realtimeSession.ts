import { EphemeralSession } from './ephemeralSession';

interface RealtimeSessionOptions {
  onTrack?: (event: RTCTrackEvent) => void;
  onMessage?: (event: MessageEvent) => void;
  onTextResponse?: (text: string) => void;
  onTranscription?: (transcript: string) => void;
  onConnectionStateChange?: (state: RTCPeerConnectionState) => void;
  onError?: (error: Error) => void;
}

// Define interfaces for the OpenAI Realtime API events
interface OpenAIBaseEvent {
  event_id: string;
  type: string;
}

interface OpenAITextDoneEvent extends OpenAIBaseEvent {
  type: 'response.text.done';
  response_id: string;
  item_id: string;
  output_index: number;
  content_index: number;
  text: string;
}

interface OpenAITranscriptionEvent extends OpenAIBaseEvent {
  type: 'conversation.item.input_audio_transcription.completed';
  item_id: string;
  content_index: number;
  transcript: string;
}

interface OpenAIAudioTranscriptDoneEvent extends OpenAIBaseEvent {
  type: 'response.audio_transcript.done';
  response_id: string;
  item_id: string;
  transcript: string;
}

type OpenAIEvent = OpenAITextDoneEvent | OpenAITranscriptionEvent | OpenAIAudioTranscriptDoneEvent | OpenAIBaseEvent;

export class RealtimeSession {
  private peerConnection: RTCPeerConnection | null = null;
  private dataChannel: RTCDataChannel | null = null;
  private mediaStream: MediaStream | null = null;
  private audioElement: HTMLAudioElement | null = null;
  private options: RealtimeSessionOptions;
  private ephemeralKey: string | null = null;
  private model: string | null = null;
  private lastEventType: string | null = null;
  private isMuted: boolean = false;

  constructor(options: RealtimeSessionOptions = {}) {
    this.options = options;
  }

  /**
   * Initialize the WebRTC session with OpenAI Realtime API
   * @param session The ephemeral session containing the API key
   * @returns A promise that resolves when the connection is established
   */
  async initialize(session: EphemeralSession): Promise<void> {
    try {
      if (!session.client_secret?.value) {
        throw new Error('Invalid session: missing client_secret.value');
      }

      this.ephemeralKey = session.client_secret.value;
      this.model = session.model;

      // Create a new peer connection
      this.peerConnection = new RTCPeerConnection();

      // Set up audio element for remote audio from the model
      this.audioElement = document.createElement('audio');
      this.audioElement.autoplay = true;

      // Handle incoming tracks (audio from the AI)
      this.peerConnection.ontrack = (event) => {
        if (this.audioElement) {
          this.audioElement.srcObject = event.streams[0];
        }
        if (this.options.onTrack) {
          this.options.onTrack(event);
        }
      };

      // Handle connection state changes
      this.peerConnection.onconnectionstatechange = () => {
        if (this.peerConnection) {
          const state = this.peerConnection.connectionState;
          console.log(`[RealtimeSession] Connection state changed to: ${state}`);
          
          if (state === 'connected') {
            console.log('[RealtimeSession] WebRTC connection established successfully');
          } else if (state === 'failed' || state === 'disconnected' || state === 'closed') {
            console.warn(`[RealtimeSession] WebRTC connection ${state}`);
          }
          
          if (this.options.onConnectionStateChange) {
            this.options.onConnectionStateChange(state);
          }
        }
      };

      // Get user's microphone
      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      // Add local audio track to the peer connection
      this.mediaStream.getAudioTracks().forEach(track => {
        if (this.peerConnection) {
          this.peerConnection.addTrack(track, this.mediaStream!);
        }
      });

      // Create data channel for sending and receiving events
      this.dataChannel = this.peerConnection.createDataChannel('oai-events');
      
      // Log when the data channel opens
      this.dataChannel.onopen = () => {
        console.log('[RealtimeSession] Data channel opened');
      };
      
      // Log when the data channel closes
      this.dataChannel.onclose = () => {
        console.log('[RealtimeSession] Data channel closed');
      };
      
      // Log data channel errors
      this.dataChannel.onerror = (error) => {
        console.error('[RealtimeSession] Data channel error:', error);
      };
      
      // Set up event handling for OpenAI events
      this.dataChannel.onmessage = (event) => {
        try {
          // Parse the event data
          const serverEvent = JSON.parse(event.data) as OpenAIEvent;
          
          // Enhanced logging for all events
          console.log('[OpenAI Event Received]', serverEvent.type, serverEvent);
          
          // Store the last event type
          this.lastEventType = serverEvent.type;
          
          // Handle different event types
          switch (serverEvent.type) {
            case 'response.text.done':
              // Handle completed text response
              if (this.options.onTextResponse) {
                const textEvent = serverEvent as OpenAITextDoneEvent;
                console.log('[OpenAI Event] Text response completed:', textEvent.text);
                this.options.onTextResponse(textEvent.text);
              }
              break;       
              
            case 'conversation.item.input_audio_transcription.completed':
              // Handle user audio transcription
              console.log('[OpenAI Event] User audio transcription completed:', (serverEvent as OpenAITranscriptionEvent).transcript);
              if (this.options.onTranscription) {
                const transcriptEvent = serverEvent as OpenAITranscriptionEvent;
                this.options.onTranscription(transcriptEvent.transcript);
              }
              break;
              
            case 'response.audio_transcript.done':
              // Handle audio transcript done event
              console.log('[OpenAI Event] AI audio transcript done:', (serverEvent as OpenAIAudioTranscriptDoneEvent).transcript);
              if (this.options.onTranscription) {
                const transcriptEvent = serverEvent as OpenAIAudioTranscriptDoneEvent;
                this.options.onTranscription(transcriptEvent.transcript);
              }
              break;

            case 'response.created':
              console.log('[OpenAI Event] Response created');
              break;

            case 'response.completed':
              console.log('[OpenAI Event] Response completed');
              break;

            case 'response.chunk':
              console.log('[OpenAI Event] Response chunk received');
              break;

            case 'response.audio.chunk':
              console.log('[OpenAI Event] Audio chunk received');
              break;

            default:
              console.log(`[OpenAI Event] Unhandled event type: ${serverEvent.type}`);
              break;
          }
          
          // Pass the raw event to the general message handler if provided
          if (this.options.onMessage) {
            this.options.onMessage(event);
          }
        } catch (error) {
          console.error('Error processing server event:', error, event.data);
        }
      };

      // Create and set local description (offer)
      const offer = await this.peerConnection.createOffer();
      await this.peerConnection.setLocalDescription(offer);

      // Send the offer to OpenAI and get the answer
      const baseUrl = 'https://api.openai.com/v1/realtime';
      const sdpResponse = await fetch(`${baseUrl}?model=${this.model}`, {
        method: 'POST',
        body: offer.sdp,
        headers: {
          Authorization: `Bearer ${this.ephemeralKey}`,
          'Content-Type': 'application/sdp',
        },
      });

      if (!sdpResponse.ok) {
        const errorText = await sdpResponse.text();
        throw new Error(`Failed to connect to OpenAI Realtime API: ${errorText}`);
      }

      // Set the remote description (answer from OpenAI)
      const answer = {
        type: 'answer' as RTCSdpType,
        sdp: await sdpResponse.text(),
      };
      await this.peerConnection.setRemoteDescription(answer);

    } catch (error) {
      if (this.options.onError) {
        this.options.onError(error instanceof Error ? error : new Error(String(error)));
      }
      this.disconnect();
      throw error;
    }
  }

  /**
   * Send a message to the AI through the data channel
   * @param message The message to send
   * @param role The role of the message sender ('user' or 'system')
   */
  sendMessage(message: string, role?: 'user' | 'system'): void {
    if (!this.dataChannel || this.dataChannel.readyState !== 'open') {
      console.warn('Data channel not open, cannot send message');
      return;
    }

    // Check data channel state
    console.log('[RealtimeSession] Data channel state:', this.dataChannel.readyState);
    
    // Create message object in the format expected by the OpenAI Realtime API
    const messageObj = {
      type: "conversation.item.create",
      item: {
        type: "message",
        role: role || 'user',
        content: [
          {
            type: "input_text",
            text: message,
          }
        ]
      },
    };

    // Log the message being sent
    console.log('[RealtimeSession] Sending message:', messageObj);
    
    try {
      // Send the message
      this.dataChannel.send(JSON.stringify(messageObj));
      console.log('[RealtimeSession] Message sent successfully');
      
      // Trigger a response creation
      const responseCreateEvent = {
        type: "response.create"
      };
      
      console.log('[RealtimeSession] Sending response.create event:', responseCreateEvent);
      this.dataChannel.send(JSON.stringify(responseCreateEvent));
      console.log('[RealtimeSession] response.create event sent successfully');
    } catch (error) {
      console.error('[RealtimeSession] Error sending message:', error);
    }
  }

  /**
   * Mute the microphone without disconnecting the session
   * @returns boolean indicating if the operation was successful
   */
  mute(): boolean {
    if (!this.mediaStream) {
      console.warn('No media stream available to mute');
      return false;
    }

    try {
      this.mediaStream.getAudioTracks().forEach(track => {
        track.enabled = false;
      });
      this.isMuted = true;
      console.log('[RealtimeSession] Microphone muted');
      return true;
    } catch (error) {
      console.error('Error muting microphone:', error);
      return false;
    }
  }

  /**
   * Unmute the microphone
   * @returns boolean indicating if the operation was successful
   */
  unmute(): boolean {
    if (!this.mediaStream) {
      console.warn('No media stream available to unmute');
      return false;
    }

    try {
      this.mediaStream.getAudioTracks().forEach(track => {
        track.enabled = true;
      });
      this.isMuted = false;
      console.log('[RealtimeSession] Microphone unmuted');
      return true;
    } catch (error) {
      console.error('Error unmuting microphone:', error);
      return false;
    }
  }

  /**
   * Toggle the mute state of the microphone
   * @returns The new mute state (true = muted, false = unmuted)
   */
  toggleMute(): boolean {
    return this.isMuted ? this.unmute() : this.mute();
  }

  /**
   * Check if the microphone is currently muted
   * @returns boolean indicating if the microphone is muted
   */
  getMuteState(): boolean {
    return this.isMuted;
  }

  /**
   * Disconnect and clean up resources
   */
  disconnect(): void {
    // Stop all media tracks
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(track => track.stop());
      this.mediaStream = null;
    }

    // Close data channel
    if (this.dataChannel) {
      this.dataChannel.close();
      this.dataChannel = null;
    }

    // Close peer connection
    if (this.peerConnection) {
      this.peerConnection.close();
      this.peerConnection = null;
    }

    // Clean up audio element
    if (this.audioElement) {
      this.audioElement.srcObject = null;
      this.audioElement = null;
    }

    this.ephemeralKey = null;
    this.model = null;
  }

  /**
   * Get the audio element for the remote audio
   * @returns The audio element or null if not initialized
   */
  getAudioElement(): HTMLAudioElement | null {
    return this.audioElement;
  }

  /**
   * Check if the session is connected
   * @returns True if connected, false otherwise
   */
  isConnected(): boolean {
    return (
      !!this.peerConnection &&
      ['connected', 'completed'].includes(this.peerConnection.connectionState)
    );
  }

  /**
   * Get the type of the last received event
   * @returns The event type or null if no event has been received
   */
  getLastEventType(): string | null {
    return this.lastEventType;
  }
} 