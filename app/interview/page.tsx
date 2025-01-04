'use client';

import { Box } from '@mui/material';
import { useState, useCallback } from 'react';
import { ChatWindow } from '../components/ChatWindow';
import { CodeEditor } from '../components/CodeEditor';
import { Timer } from '../components/Timer';
import { CompleteInterviewButton } from '../components/CompleteInterviewButton';
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
  const [isTimeUp, setIsTimeUp] = useState(false);

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

  const handleTimeUp = useCallback(() => {
    setIsTimeUp(true);
  }, []);

  const handleInterviewComplete = () => {
    // Implement interview completion logic here
    console.log('Interview completed');
  };

  return (
    <Box position="relative" sx={{ height: '100vh' }}>
      <Timer onTimeUp={handleTimeUp} />
      <Box display="flex" sx={{ height: '100%' }}>
        <ChatWindow
          conversation={conversation}
          input={input}
          setInput={setInput}
          handleSubmit={handleSubmit}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '70%' }}>
          <CodeEditor />
          <CompleteInterviewButton 
            isEnabled={isTimeUp} 
            onSubmit={handleInterviewComplete} 
          />
        </Box>
      </Box>
    </Box>
  );
} 