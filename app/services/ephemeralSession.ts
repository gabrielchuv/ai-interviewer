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

/**
 * Fetches an ephemeral OpenAI API session
 * This session contains a temporary API key that can be used for client-side OpenAI API calls
 * The key expires after a short period (typically 2 hours)
 */
export async function getEphemeralSession(): Promise<EphemeralSession> {
  try {
    const response = await fetch('/api/session', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
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

/**
 * Helper function to check if a session is expired
 * @param session The ephemeral session to check
 * @param bufferMinutes Optional buffer time in minutes before actual expiration (default: 5)
 */
export function isSessionExpired(session: EphemeralSession, bufferMinutes: number = 5): boolean {
  if (!session || !session.client_secret || !session.client_secret.expires_at) {
    return true;
  }
  
  const expirationTime = session.client_secret.expires_at * 1000; // Convert to milliseconds
  const currentTime = Date.now();
  const bufferMs = bufferMinutes * 60 * 1000;
  
  // Return true if the session is expired or will expire within the buffer time
  return currentTime + bufferMs >= expirationTime;
} 