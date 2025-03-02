import { useState, useEffect, useRef, useCallback } from 'react';
import { useEphemeralSession } from './useEphemeralSession';
import { RealtimeSession } from './realtimeSession';

interface UseRealtimeSessionResult {
  isConnecting: boolean;
  isConnected: boolean;
  error: Error | null;
  messages: Array<{ role: 'user' | 'assistant'; content: string; isComplete?: boolean }>;
  transcriptions: Array<{ text: string; timestamp: number; source: 'user' | 'ai' }>;
  connect: () => Promise<void>;
  disconnect: () => void;
  sendMessage: (message: string) => void;
  clearTranscriptions: () => void;
  audioElement: HTMLAudioElement | null;
}

export function useRealtimeSession(): UseRealtimeSessionResult {
  const { session, loading: sessionLoading, error: sessionError } = useEphemeralSession();
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string; isComplete?: boolean }>>([]);
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

  const connect = useCallback(async () => {
    if (sessionLoading) {
      setError(new Error('Session is still loading'));
      return;
    }

    if (!session) {
      setError(new Error('No session available'));
      return;
    }

    if (isConnected || isConnecting) {
      return;
    }

    setIsConnecting(true);
    setError(null);

    try {
      // Create a new realtime session
      const realtimeSession = new RealtimeSession({
        onMessage: (event) => {
          try {
            const data = JSON.parse(event.data);
            console.log('Received event:', data);
            
            // Handle legacy message format (if any)
            if (data.type === 'message' && data.content) {
              setMessages(prev => [...prev, { role: 'assistant', content: data.content }]);
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
            // Check if we already have an incomplete assistant message
            const lastMessage = prev[prev.length - 1];
            if (lastMessage && lastMessage.role === 'assistant' && !lastMessage.isComplete) {
              // Update the existing message
              return [
                ...prev.slice(0, prev.length - 1),
                { ...lastMessage, content: text, isComplete: true }
              ];
            } else {
              // Add a new complete message
              return [...prev, { role: 'assistant', content: text, isComplete: true }];
            }
          });
        },
        
        // Handle transcriptions from the API
        onTranscription: (transcript) => {
          const eventType = realtimeSessionRef.current?.getLastEventType();
          console.log(`[useRealtimeSession] Transcription received (${eventType}):`, transcript);
          
          // Determine the source based on the event type
          let source: 'user' | 'ai';
          
          if (eventType === 'conversation.item.input_audio_transcription.completed') {
            source = 'user';
            console.log('[useRealtimeSession] User transcription detected');
          } else if (eventType === 'response.audio_transcript.done') {
            source = 'ai';
            console.log('[useRealtimeSession] AI transcription detected');
          } else {
            // Default fallback logic
            source = eventType?.includes('input_audio_transcription') ? 'user' : 'ai';
            console.log(`[useRealtimeSession] Using fallback logic for transcription source: ${source}`);
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
      await realtimeSession.initialize(session);
      
      // Store the session reference
      realtimeSessionRef.current = realtimeSession;
      
      // Set the audio element
      setAudioElement(realtimeSession.getAudioElement());
      
      // Update state
      setIsConnecting(false);
      setIsConnected(true);
      
      // Clear previous messages and transcriptions
      setMessages([]);
      setTranscriptions([]);
      
    } catch (err) {
      console.error('Error connecting to realtime session:', err);
      setError(err instanceof Error ? err : new Error(String(err)));
      setIsConnecting(false);
      setIsConnected(false);
    }
  }, [session, sessionLoading, isConnected, isConnecting]);

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
    setMessages(prev => [...prev, { role: 'user', content: message }]);
    
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