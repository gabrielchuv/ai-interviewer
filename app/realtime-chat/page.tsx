import RealtimeChat from '../components/RealtimeChat';

export default function RealtimeChatPage() {
  return (
    <div className="container mx-auto py-8 px-4 h-screen flex flex-col">
      <h1 className="text-2xl font-bold mb-6 text-center">OpenAI Realtime Chat Demo</h1>
      <p className="text-center mb-8 max-w-2xl mx-auto">
        This demo uses WebRTC to establish a direct connection with OpenAI's Realtime API.
        Click the Connect button to start a voice conversation with the AI.
      </p>
      
      <div className="flex-1 flex flex-col">
        <RealtimeChat />
      </div>
      
      <div className="mt-8 max-w-2xl mx-auto p-4 bg-gray-100 rounded">
        <h2 className="text-xl font-bold mb-2">How it works:</h2>
        <ol className="list-decimal pl-5 space-y-2">
          <li>The server creates an ephemeral session with OpenAI</li>
          <li>The client establishes a WebRTC connection using the ephemeral key</li>
          <li>Your microphone audio is streamed directly to OpenAI</li>
          <li>The AI's responses are streamed back as audio in real-time</li>
          <li>You can also type messages and receive text responses</li>
        </ol>
        
        <h2 className="text-xl font-bold mt-6 mb-2">Features:</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Real-time voice conversation with AI</li>
          <li>Text chat with the same AI session</li>
          <li>Direct connection to OpenAI's servers (no proxy)</li>
          <li>Secure - your main API key remains protected on the server</li>
        </ul>
      </div>
    </div>
  );
} 