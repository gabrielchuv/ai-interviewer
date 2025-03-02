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
   - Processes OpenAI events like `response.text.done`, `response.audio_transcript.done`, and `conversation.item.input_audio_transcription.completed`
   - Tracks the last event type to determine the source of transcriptions
   - Provides methods to send messages and manage the connection

3. **React Hook** (`/services/useRealtimeSession.ts`):
   - Manages the realtime session state
   - Provides methods to connect, disconnect, and send messages
   - Handles messages, transcriptions, and errors
   - Processes and stores completed text responses
   - Distinguishes between user and AI transcriptions
   - Provides a function to clear transcriptions

4. **UI Component** (`/components/RealtimeChat.tsx`):
   - Provides a chat interface for the realtime session
   - Displays messages, transcriptions, and errors
   - Visually distinguishes between complete and incomplete responses
   - Shows user and AI transcriptions with different styling
   - Allows users to connect/disconnect and send messages
   - Includes a debug panel for monitoring events (in development)
   - Provides controls to show/hide and clear transcriptions

## OpenAI Realtime API Events

The implementation handles several types of events from the OpenAI Realtime API:

1. **`response.text.done`**:
   ```json
   {
     "event_id": "event_4344",
     "type": "response.text.done",
     "response_id": "resp_001",
     "item_id": "msg_007",
     "output_index": 0,
     "content_index": 0,
     "text": "Sure, I can help with that."
   }
   ```
   - Indicates that a text response is complete
   - The `text` field contains the complete response
   - We display this as a "Complete Response" in the UI

2. **`conversation.item.input_audio_transcription.completed`**:
   ```json
   {
     "event_id": "event_2122",
     "type": "conversation.item.input_audio_transcription.completed",
     "item_id": "msg_003",
     "content_index": 0,
     "transcript": "Hello, how are you?"
   }
   ```
   - Contains the transcription of the user's audio input
   - The `transcript` field contains the transcribed text
   - We display these in a collapsible "Transcriptions" section

3. **`response.audio_transcript.done`**:
   ```json
   {
     "event_id": "event_3456",
     "type": "response.audio_transcript.done",
     "response_id": "resp_002",
     "item_id": "msg_004",
     "transcript": "I'm processing what you said about the project timeline."
   }
   ```
   - Contains the transcription of the AI's audio response
   - The `transcript` field contains the transcribed text
   - We display these in the same collapsible "Transcriptions" section

## WebRTC Connection Flow

1. **Initialization**:
   - Fetch an ephemeral session from the server
   - Create a new RTCPeerConnection
   - Set up audio elements and event handlers

2. **Media Setup**:
   - Request access to the user's microphone
   - Add the audio track to the peer connection
   - Create a data channel for text messages and events

3. **Connection Establishment**:
   - Create an SDP offer
   - Send the offer to OpenAI's Realtime API
   - Receive an SDP answer
   - Set the remote description

4. **Communication**:
   - Send audio from the microphone to OpenAI
   - Receive audio responses from OpenAI
   - Send text messages through the data channel
   - Receive text responses and events through the data channel

## Event Handling

The implementation uses a type-safe approach to handle different event types:

```typescript
// Set up event handling for OpenAI events
this.dataChannel.onmessage = (event) => {
  try {
    // Parse the event data
    const serverEvent = JSON.parse(event.data) as OpenAIEvent;
    
    // Handle different event types
    switch (serverEvent.type) {
      case 'response.text.done':
        // Handle completed text response
        if (this.options.onTextResponse) {
          const textEvent = serverEvent as OpenAITextDoneEvent;
          this.options.onTextResponse(textEvent.text);
        }
        break;
        
      case 'conversation.item.input_audio_transcription.completed':
        // Handle completed transcription
        if (this.options.onTranscription) {
          const transcriptEvent = serverEvent as OpenAITranscriptionEvent;
          this.options.onTranscription(transcriptEvent.transcript);
        }
        break;
        
      case 'response.audio_transcript.done':
        // Handle AI audio transcript
        if (this.options.onTranscription) {
          const transcriptEvent = serverEvent as OpenAIAudioTranscriptDoneEvent;
          this.options.onTranscription(transcriptEvent.transcript);
        }
        break;
    }
  } catch (error) {
    console.error('Error processing server event:', error, event.data);
  }
};
```

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
    transcriptions,
    connect,
    disconnect,
    sendMessage,
    clearTranscriptions,
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