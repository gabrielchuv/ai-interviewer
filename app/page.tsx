'use client';

import { Box } from '@mui/material';
import { useState } from 'react';
import { ChatWindow } from './components/ChatWindow';
import { CodeEditor } from './components/CodeEditor';

interface Message {
  role: 'user' | 'ai';
  text: string;
}

export default function Home() {
  const [conversation, setConversation] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');

  const handleSubmit = async () => {
    if (!input) return;

    setConversation(prev => [...prev, { role: 'user', text: input }]);
    setInput('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: input }),
      });

      if (!response.ok) {
        console.error("Response:", response);
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setConversation(prev => [...prev, { role: 'ai', text: data.text }]);
    } catch (error) {
      console.error('Error:', error);
      setConversation(prev => [...prev, { 
        role: 'ai', 
        text: 'Sorry, there was an error processing your request. Please try again later.' 
      }]);
    }
  };

  return (
    <Box display="flex" sx={{ height: '100vh' }}>
      <ChatWindow
        conversation={conversation}
        input={input}
        setInput={setInput}
        handleSubmit={handleSubmit}
      />
      <CodeEditor />
    </Box>
  );
}
