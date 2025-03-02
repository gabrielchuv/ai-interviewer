import { EphemeralSession } from './ephemeralSession';

interface RealtimeSessionOptions {
  onTrack?: (event: RTCTrackEvent) => void;
  onMessage?: (event: MessageEvent) => void;
  onConnectionStateChange?: (state: RTCPeerConnectionState) => void;
  onError?: (error: Error) => void;
}

export class RealtimeSession {
  private peerConnection: RTCPeerConnection | null = null;
  private dataChannel: RTCDataChannel | null = null;
  private mediaStream: MediaStream | null = null;
  private audioElement: HTMLAudioElement | null = null;
  private options: RealtimeSessionOptions;
  private ephemeralKey: string | null = null;
  private model: string | null = null;

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
        if (this.options.onConnectionStateChange && this.peerConnection) {
          this.options.onConnectionStateChange(this.peerConnection.connectionState);
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
      this.dataChannel.onmessage = (event) => {
        if (this.options.onMessage) {
          this.options.onMessage(event);
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
   */
  sendMessage(message: string): void {
    if (!this.dataChannel || this.dataChannel.readyState !== 'open') {
      console.warn('Data channel not open, cannot send message');
      return;
    }

    const messageObj = {
      type: 'message',
      content: message,
    };

    this.dataChannel.send(JSON.stringify(messageObj));
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
} 