'use client';

import { useState } from 'react';
import { useEphemeralSession } from '../services/useEphemeralSession';
import { createOpenAIClient } from '../services/createOpenAIClient';

export default function EphemeralSessionExample() {
  const { session, loading, error, refreshSession } = useEphemeralSession();
  const [clientResponse, setClientResponse] = useState<string>('');
  const [isTestingClient, setIsTestingClient] = useState<boolean>(false);

  const testOpenAIClient = async () => {
    if (!session) {
      setClientResponse('No session available');
      return;
    }

    setIsTestingClient(true);
    setClientResponse('Testing OpenAI client...');

    try {
      const client = createOpenAIClient(session);
      
      // Make a simple API call to test the client
      const response = await client.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: 'Say hello!' }],
        max_tokens: 50,
      });

      setClientResponse(`Response: ${response.choices[0]?.message.content || 'No response'}`);
    } catch (err) {
      setClientResponse(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setIsTestingClient(false);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Ephemeral OpenAI Session</h2>
      
      {loading ? (
        <p className="text-gray-500">Loading session...</p>
      ) : error ? (
        <div className="mb-4">
          <p className="text-red-500">Error: {error.message}</p>
          <button 
            onClick={refreshSession}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      ) : session ? (
        <div className="mb-4">
          <p className="text-green-500 mb-2">Session active!</p>
          <div className="bg-gray-100 p-3 rounded mb-3">
            <p><span className="font-semibold">Session ID:</span> {session.id}</p>
            <p><span className="font-semibold">Object:</span> {session.object}</p>
            <p><span className="font-semibold">Model:</span> {session.model}</p>
            <p><span className="font-semibold">Voice:</span> {session.voice}</p>
            <p><span className="font-semibold">Modalities:</span> {session.modalities.join(', ')}</p>
            <p><span className="font-semibold">API Key:</span> {session.client_secret?.value ? 
              `${session.client_secret.value.substring(0, 10)}...${session.client_secret.value.substring(session.client_secret.value.length - 5)}` : 
              'Not available'}</p>
            <p><span className="font-semibold">Expires:</span> {session.client_secret?.expires_at ? 
              new Date(session.client_secret.expires_at * 1000).toLocaleString() : 
              'Not available'}</p>
          </div>
          
          <div className="flex space-x-2">
            <button 
              onClick={refreshSession}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Refresh Session
            </button>
            
            <button 
              onClick={testOpenAIClient}
              disabled={isTestingClient}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400"
            >
              Test OpenAI Client
            </button>
          </div>
          
          {clientResponse && (
            <div className="mt-4 p-3 bg-gray-100 rounded">
              <p className="font-semibold">Client Test Result:</p>
              <p>{clientResponse}</p>
            </div>
          )}
        </div>
      ) : (
        <p className="text-gray-500">No session available</p>
      )}
    </div>
  );
} 