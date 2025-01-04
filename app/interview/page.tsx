'use client';

import { Box } from '@mui/material';
import { useState } from 'react';
import { ChatWindow } from '../components/ChatWindow';
import { CodeEditor } from '../components/CodeEditor';
import { Timer } from '../components/Timer';
import { sendMessage } from '../services/chat';

interface Message {
  role: 'user' | 'ai';
  text: string;
}

const initialMessage: Message = {
  role: 'ai',
  text: 'Welcome to this AI technical interview. Please consider the question in the code editor. Once you have completed coding your solution, let me know by typing "I have completed my solution" as shown below. Good luck!'
};

export default function Interview() {
  const [conversation, setConversation] = useState<Message[]>([initialMessage]);
  const [input, setInput] = useState<string>('');

  const handleSubmit = async () => {
    if (!input) return;

    setConversation(prev => [...prev, { role: 'user', text: input }]);
    setInput('');

    try {
      const response = await sendMessage(input);
      setConversation(prev => [...prev, { role: 'ai', text: response }]);
    } catch (error) {
      setConversation(prev => [...prev, { 
        role: 'ai', 
        text: 'Sorry, there was an error processing your request. Please try again later.' 
      }]);
    }
  };

  return (
    <Box position="relative" sx={{ height: '100vh' }}>
      <Timer />
      <Box display="flex" sx={{ height: '100%' }}>
        <ChatWindow
          conversation={conversation}
          input={input}
          setInput={setInput}
          handleSubmit={handleSubmit}
        />
        <CodeEditor />
      </Box>
    </Box>
  );
} 