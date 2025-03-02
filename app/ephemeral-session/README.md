# Ephemeral OpenAI API Key Implementation

This directory contains the implementation for creating and using ephemeral OpenAI API keys in the AI Interviewer application.

## What are Ephemeral API Keys?

Ephemeral API keys are temporary API keys that are created on-demand and expire after a short period (typically 1 hour). They allow you to make client-side API calls to OpenAI without exposing your main API key.

## Response Format

The OpenAI ephemeral session endpoint returns a response in this format:

```json
{
  "id": "sess_001",
  "object": "realtime.session",
  "model": "gpt-4o-realtime-preview-2024-12-17",
  "modalities": ["audio", "text"],
  "instructions": "You are a friendly assistant.",
  "voice": "alloy",
  "input_audio_format": "pcm16",
  "output_audio_format": "pcm16",
  "input_audio_transcription": {
      "model": "whisper-1"
  },
  "turn_detection": null,
  "tools": [],
  "tool_choice": "none",
  "temperature": 0.7,
  "max_response_output_tokens": 200,
  "client_secret": {
    "value": "ek_abc123", 
    "expires_at": 1234567890
  }
}
```

The `client_secret.value` is the ephemeral API key that can be used for client-side API calls, and `client_secret.expires_at` is the Unix timestamp when the key expires.

## Implementation Details

The implementation consists of:

1. **Server-side API Endpoint** (`/api/session/route.ts`):
   - Makes a request to OpenAI's `/v1/realtime/sessions` endpoint
   - Uses your server-side API key to authenticate
   - Returns the ephemeral session data to the client

2. **Client-side Service** (`/services/ephemeralSession.ts`):
   - Provides functions to fetch the ephemeral session
   - Includes utility to check if a session is expired

3. **React Hook** (`/services/useEphemeralSession.ts`):
   - Manages the ephemeral session state
   - Automatically fetches a session on mount
   - Refreshes the session before it expires
   - Provides loading and error states

4. **OpenAI Client Creator** (`/services/createOpenAIClient.ts`):
   - Creates an OpenAI client using the ephemeral API key from `client_secret.value`
   - Handles client-side usage with `dangerouslyAllowBrowser: true`

5. **Example Component** (`/components/EphemeralSessionExample.tsx`):
   - Demonstrates how to use the ephemeral session
   - Shows session details and allows testing the OpenAI client

## Usage

To use the ephemeral session in your components:

```tsx
import { useEphemeralSession } from '../services/useEphemeralSession';
import { createOpenAIClient } from '../services/createOpenAIClient';

function MyComponent() {
  const { session, loading, error, refreshSession } = useEphemeralSession();

  const callOpenAI = async () => {
    if (!session) return;
    
    const client = createOpenAIClient(session);
    
    // Use the client to make API calls
    const response = await client.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: 'Hello!' }],
    });
    
    console.log(response);
  };

  // Render your component...
}
```

## Benefits

- **Security**: Your main API key remains on the server
- **Performance**: Direct client-to-OpenAI communication without server proxy
- **User Experience**: Faster response times for API calls
- **Scalability**: Reduced server load by offloading API calls to clients

## Demo

Visit `/ephemeral-session` to see a live demo of the ephemeral session functionality. 