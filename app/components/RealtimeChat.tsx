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
    connect,
    disconnect,
    sendMessage,
    audioElement
  } = useRealtimeSession();

  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const audioContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

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

  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      {/* Hidden audio container */}
      <div ref={audioContainerRef} className="hidden"></div>
      
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">OpenAI Realtime Chat</h2>
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
      
      {/* Error message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 m-4 rounded">
          <p className="font-bold">Error</p>
          <p>{error.message}</p>
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
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
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