import { useState, useEffect, useCallback } from 'react';
import { getEphemeralSession, isSessionExpired } from './ephemeralSession';

interface EphemeralSession {
  id: string;
  object: string;
  model: string;
  modalities: string[];
  instructions: string;
  voice: string;
  input_audio_format: string;
  output_audio_format: string;
  input_audio_transcription: {
    model: string;
  };
  turn_detection: null;
  tools: any[];
  tool_choice: string;
  temperature: number;
  max_response_output_tokens: number;
  client_secret: {
    value: string;
    expires_at: number;
  };
}

interface UseEphemeralSessionResult {
  session: EphemeralSession | null;
  loading: boolean;
  error: Error | null;
  refreshSession: () => Promise<void>;
}

/**
 * React hook to manage an ephemeral OpenAI API session
 * Automatically fetches a session on mount and provides a way to refresh it
 */
export function useEphemeralSession(): UseEphemeralSessionResult {
  const [session, setSession] = useState<EphemeralSession | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchSession = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const newSession = await getEphemeralSession();
      setSession(newSession);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch session'));
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch session on mount
  useEffect(() => {
    fetchSession();
  }, [fetchSession]);

  // Set up automatic refresh before expiration
  useEffect(() => {
    if (!session) return;

    // Check if session has client_secret and expires_at
    if (!session.client_secret || !session.client_secret.expires_at) {
      console.error('Invalid session format: missing client_secret or expires_at');
      return;
    }

    // Calculate time until refresh (5 minutes before expiration)
    const expiresAt = session.client_secret.expires_at * 1000; // Convert to milliseconds
    const currentTime = Date.now();
    const refreshTime = expiresAt - currentTime - 5 * 60 * 1000; // 5 minutes before expiration
    
    // If already within 5 minutes of expiration, refresh immediately
    if (refreshTime <= 0) {
      fetchSession();
      return;
    }

    // Set up timer to refresh before expiration
    const timerId = setTimeout(fetchSession, refreshTime);
    
    return () => clearTimeout(timerId);
  }, [session, fetchSession]);

  return {
    session,
    loading,
    error,
    refreshSession: fetchSession
  };
} 