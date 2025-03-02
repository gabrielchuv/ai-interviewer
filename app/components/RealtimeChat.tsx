'use client';

import { useState, useRef, useEffect } from 'react';
import { useRealtimeSession } from '../services/useRealtimeSession';
import { MdMic, MdMicOff, MdSend } from 'react-icons/md';

export default function RealtimeChat() {
  const {
    isConnecting,
    isConnected,
    error,
    messages,
    transcriptions,
    connect,
    disconnect,
    sendMessage,
    audioElement
  } = useRealtimeSession();

  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const audioContainerRef = useRef<HTMLDivElement>(null);
  const [showTranscriptions, setShowTranscriptions] = useState(false);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, transcriptions]);

  // Append audio element to the DOM
  useEffect(() => {
    if (audioElement && audioContainerRef.current) {
      // Clear previous audio elements
      audioContainerRef.current.innerHTML = '';
      // Append the new audio element
      audioContainerRef.current.appendChild(audioElement);
    }
  }, [audioElement]);

  const handleConnect = () => {
    if (isConnected) {
      disconnect();
    } else {
      connect();
    }
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() && isConnected) {
      sendMessage(inputMessage.trim());
      setInputMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleTranscriptions = () => {
    setShowTranscriptions(!showTranscriptions);
  };

  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      {/* Hidden audio container */}
      <div ref={audioContainerRef} className="hidden"></div>
      
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">OpenAI Realtime Chat</h2>
        <div className="flex space-x-2">
          <button
            onClick={toggleTranscriptions}
            className={`px-3 py-1 rounded-full text-sm ${
              showTranscriptions ? 'bg-blue-400 hover:bg-blue-500' : 'bg-blue-700 hover:bg-blue-800'
            }`}
          >
            {showTranscriptions ? 'Hide Transcriptions' : 'Show Transcriptions'}
          </button>
          <button
            onClick={handleConnect}
            className={`px-4 py-2 rounded-full flex items-center ${
              isConnected ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
            }`}
            disabled={isConnecting}
          >
            {isConnecting ? (
              <span>Connecting...</span>
            ) : isConnected ? (
              <>
                <MdMicOff className="mr-2" /> Disconnect
              </>
            ) : (
              <>
                <MdMic className="mr-2" /> Connect
              </>
            )}
          </button>
        </div>
      </div>
      
      {/* Error message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 m-4 rounded">
          <p className="font-bold">Error</p>
          <p>{error.message}</p>
        </div>
      )}
      
      {/* Transcriptions */}
      {showTranscriptions && transcriptions.length > 0 && (
        <div className="bg-gray-100 p-3 m-4 rounded">
          <h3 className="font-bold mb-2">Transcriptions</h3>
          <div className="max-h-32 overflow-y-auto">
            {transcriptions.map((transcript, index) => (
              <div 
                key={index} 
                className={`mb-1 text-sm ${
                  transcript.source === 'user' ? 'text-right' : 'text-left'
                }`}
              >
                <span 
                  className={`inline-block px-2 py-1 rounded ${
                    transcript.source === 'user' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  <span className="text-xs font-semibold mr-1">
                    {transcript.source === 'user' ? 'You' : 'AI'}:
                  </span>
                  <span className="text-gray-500 text-xs mr-1">
                    {new Date(transcript.timestamp).toLocaleTimeString()}
                  </span>
                  {transcript.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.length === 0 && !isConnecting && (
          <div className="text-center text-gray-500 my-8">
            {isConnected ? (
              <p>Start speaking or type a message below to chat with the AI.</p>
            ) : (
              <p>Click the Connect button to start a conversation.</p>
            )}
          </div>
        )}
        
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 ${
              message.role === 'user' ? 'text-right' : 'text-left'
            }`}
          >
            <div
              className={`inline-block px-4 py-2 rounded-lg ${
                message.role === 'user'
                  ? 'bg-blue-500 text-white'
                  : message.isComplete 
                    ? 'bg-green-100 text-gray-800 border border-green-300' 
                    : 'bg-gray-200 text-gray-800'
              }`}
            >
              {message.role === 'assistant' && message.isComplete && (
                <div className="text-xs text-green-600 mb-1">Complete Response</div>
              )}
              <p>{message.content}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input */}
      <div className="border-t p-4">
        <div className="flex">
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={isConnected ? "Type a message..." : "Connect to start chatting..."}
            className="flex-1 border rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={!isConnected}
            rows={1}
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 text-white px-4 rounded-r-lg hover:bg-blue-600 disabled:bg-gray-300"
            disabled={!isConnected || !inputMessage.trim()}
          >
            <MdSend size={20} />
          </button>
        </div>
        {isConnected && (
          <p className="text-sm text-gray-500 mt-2">
            Speak into your microphone or type a message and press Enter.
          </p>
        )}
      </div>
    </div>
  );
} 