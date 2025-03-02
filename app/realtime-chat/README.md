# OpenAI Realtime Chat Implementation

This directory contains the implementation for creating a realtime chat with OpenAI using WebRTC in the AI Interviewer application.

## What is OpenAI Realtime API?

The OpenAI Realtime API allows for direct, bidirectional communication with OpenAI models using WebRTC. This enables real-time voice conversations and text chat with AI models.

## Implementation Details

The implementation consists of:

1. **Ephemeral Session** (from `/ephemeral-session`):
   - Server-side API endpoint to create an ephemeral session
   - Client-side service to fetch and manage the ephemeral key

2. **Realtime Session Service** (`/services/realtimeSession.ts`):
   - Manages the WebRTC connection with OpenAI
   - Handles audio streaming and data channel communication
   - Provides methods to send messages and manage the connection

3. **React Hook** (`/services/useRealtimeSession.ts`):
   - Manages the realtime session state
   - Provides methods to connect, disconnect, and send messages
   - Handles messages and errors

4. **UI Component** (`/components/RealtimeChat.tsx`):
   - Provides a chat interface for the realtime session
   - Displays messages and errors
   - Allows users to connect/disconnect and send messages

## WebRTC Connection Flow

1. **Initialization**:
   - Fetch an ephemeral session from the server
   - Create a new RTCPeerConnection
   - Set up audio elements and event handlers

2. **Media Setup**:
   - Request access to the user's microphone
   - Add the audio track to the peer connection
   - Create a data channel for text messages

3. **Connection Establishment**:
   - Create an SDP offer
   - Send the offer to OpenAI's Realtime API
   - Receive an SDP answer
   - Set the remote description

4. **Communication**:
   - Send audio from the microphone to OpenAI
   - Receive audio responses from OpenAI
   - Send text messages through the data channel
   - Receive text responses through the data channel

## Usage

To use the realtime chat in your components:

```tsx
import RealtimeChat from '../components/RealtimeChat';

function MyPage() {
  return (
    <div>
      <h1>Chat with AI</h1>
      <RealtimeChat />
    </div>
  );
}
```

Or use the hook directly for custom implementations:

```tsx
import { useRealtimeSession } from '../services/useRealtimeSession';

function MyCustomChat() {
  const {
    isConnecting,
    isConnected,
    error,
    messages,
    connect,
    disconnect,
    sendMessage,
    audioElement
  } = useRealtimeSession();

  // Your custom UI implementation
}
```

## Browser Compatibility

This implementation requires browser support for:
- WebRTC (RTCPeerConnection, RTCDataChannel)
- getUserMedia API for microphone access
- Web Audio API for audio processing

Most modern browsers (Chrome, Firefox, Safari, Edge) support these features.

## Demo

Visit `/realtime-chat` to see a live demo of the realtime chat functionality. 