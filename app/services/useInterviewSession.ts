import { useState, useEffect, useRef, useCallback } from 'react';
import { useEphemeralSession } from './useEphemeralSession';
import { RealtimeSession } from './realtimeSession';
import { Message } from '../interview/page';

interface UseInterviewSessionResult {
  isConnecting: boolean;
  isConnected: boolean;
  error: Error | null;
  messages: Message[];
  transcriptions: Array<{ text: string; timestamp: number; source: 'user' | 'ai' }>;
  connect: (questionTitle: string, questionDescription: string) => Promise<void>;
  disconnect: () => void;
  sendMessage: (message: string) => void;
  clearTranscriptions: () => void;
  audioElement: HTMLAudioElement | null;
}

// Updated to use a custom function to get the ephemeral session with question details
async function getEphemeralSessionWithQuestion(questionTitle: string, questionDescription: string) {
  try {
    const response = await fetch('/api/session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ questionTitle, questionDescription }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Failed to get ephemeral session:', errorData);
      throw new Error('Failed to get ephemeral session');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error getting ephemeral session:', error);
    throw new Error('Failed to get ephemeral session');
  }
}

export function useInterviewSession(): UseInterviewSessionResult {
  // We'll manage the session ourselves instead of using useEphemeralSession
  const [session, setSession] = useState(null);
  const [sessionLoading, setSessionLoading] = useState(false);
  const [sessionError, setSessionError] = useState<Error | null>(null);
  
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      text: "Welcome to the technical interview! Click the Connect button above to start. You'll be able to speak with the AI interviewer and discuss your approach to the coding problem.",
      timestamp: Date.now()
    }
  ]);
  const [transcriptions, setTranscriptions] = useState<Array<{ text: string; timestamp: number; source: 'user' | 'ai' }>>([]);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
  
  const realtimeSessionRef = useRef<RealtimeSession | null>(null);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (realtimeSessionRef.current) {
        realtimeSessionRef.current.disconnect();
        realtimeSessionRef.current = null;
      }
    };
  }, []);

  // Handle session errors
  useEffect(() => {
    if (sessionError) {
      setError(sessionError);
    }
  }, [sessionError]);

  const connect = useCallback(async (questionTitle: string, questionDescription: string) => {
    if (isConnected || isConnecting) {
      return;
    }

    setIsConnecting(true);
    setError(null);
    setSessionLoading(true);

    try {
      // Get the ephemeral session with question details
      const newSession = await getEphemeralSessionWithQuestion(questionTitle, questionDescription);
      setSession(newSession);
      setSessionLoading(false);

      // Create a new realtime session
      const realtimeSession = new RealtimeSession({
        onMessage: (event) => {
          try {
            const data = JSON.parse(event.data);
            console.log('Received event:', data);
            
            // Handle legacy message format (if any)
            if (data.type === 'message' && data.content) {
              setMessages(prev => [...prev, { role: "ai", text: data.content, timestamp: Date.now() }]);
            } else if (data.type === 'error') {
              console.error('Realtime session error:', data);
              setError(new Error(data.message || 'Unknown error from realtime session'));
            }
          } catch (err) {
            console.error('Error parsing message:', err, event.data);
          }
        },
        
        // Handle text responses from the API
        onTextResponse: (text) => {
          console.log('Received text response:', text);
          setMessages(prev => {
            // Add a new complete message
            return [...prev, { role: "ai", text, timestamp: Date.now() }];
          });
        },
        
        // Handle transcriptions from the API
        onTranscription: (transcript) => {
          const eventType = realtimeSessionRef.current?.getLastEventType();
          console.log(`[useInterviewSession] Transcription received (${eventType}):`, transcript);
          
          // Determine the source based on the event type
          let source: 'user' | 'ai';
          
          if (eventType === 'conversation.item.input_audio_transcription.completed') {
            source = 'user';
            console.log('[useInterviewSession] User transcription detected');
          } else if (eventType === 'response.audio_transcript.done') {
            source = 'ai';
            console.log('[useInterviewSession] AI transcription detected');
          } else {
            // Default fallback logic
            source = eventType?.includes('input_audio_transcription') ? 'user' : 'ai';
            console.log(`[useInterviewSession] Using fallback logic for transcription source: ${source}`);
          }
          
          setTranscriptions(prev => [
            ...prev, 
            { 
              text: transcript, 
              timestamp: Date.now(),
              source
            }
          ]);
        },
        
        onConnectionStateChange: (state) => {
          setIsConnected(state === 'connected');
          if (state === 'failed' || state === 'disconnected' || state === 'closed') {
            setIsConnecting(false);
          }
        },
        onError: (err) => {
          setError(err);
          setIsConnecting(false);
          setIsConnected(false);
        }
      });

      // Initialize the session
      await realtimeSession.initialize(newSession);
      
      // Store the session reference
      realtimeSessionRef.current = realtimeSession;
      
      // Set the audio element
      setAudioElement(realtimeSession.getAudioElement());
      
      // Update state
      setIsConnecting(false);
      setIsConnected(true);
      
      // Replace the initial welcome message with the AI's welcome message
      setMessages([{
        role: "ai",
        text: `Welcome! I'm your technical interviewer today. I'll be asking you about the ${questionTitle} problem. Please feel free to ask any clarifying questions and outline your approach before you start coding. Good luck!`,
        timestamp: Date.now()
      }]);
      
      // Clear previous transcriptions
      setTranscriptions([]);
      
    } catch (err) {
      console.error('Error connecting to realtime session:', err);
      setError(err instanceof Error ? err : new Error(String(err)));
      setIsConnecting(false);
      setIsConnected(false);
      setSessionLoading(false);
    }
  }, [isConnected, isConnecting]);

  const disconnect = useCallback(() => {
    if (realtimeSessionRef.current) {
      realtimeSessionRef.current.disconnect();
      realtimeSessionRef.current = null;
      setIsConnected(false);
      setAudioElement(null);
    }
  }, []);

  const sendMessage = useCallback((message: string) => {
    if (!realtimeSessionRef.current || !isConnected) {
      setError(new Error('Not connected to realtime session'));
      return;
    }

    // Add message to the list
    setMessages(prev => [...prev, { role: "user", text: message, timestamp: Date.now() }]);
    
    // Send message to the AI
    realtimeSessionRef.current.sendMessage(message);
  }, [isConnected]);

  const clearTranscriptions = useCallback(() => {
    setTranscriptions([]);
  }, []);

  return {
    isConnecting,
    isConnected,
    error,
    messages,
    transcriptions,
    connect,
    disconnect,
    sendMessage,
    clearTranscriptions,
    audioElement
  };
} 