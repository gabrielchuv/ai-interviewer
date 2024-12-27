'use client';

import { Box, Typography, TextField, IconButton, Paper } from '@mui/material';
import { MdSend } from 'react-icons/md'; // Right arrow icon
import { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';

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
      {/* Left Pane: AI Interviewer */}
      <Box sx={{ flex: 1, borderRight: '1px solid #ddd', padding: 2 }}>
        <Typography variant="h6" gutterBottom>
          AI Interviewer
        </Typography>
        <Paper sx={{ maxHeight: '80vh', overflowY: 'auto', padding: 2 }}>
          {/* Conversation Area */}
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {conversation.map((message, index) => (
              <Box
                key={index}
                sx={{
                  alignSelf: message.role === 'user' ? 'flex-end' : 'flex-start',
                  marginBottom: 2,
                  backgroundColor: message.role === 'user' ? '#d1e7dd' : '#f8d7da',
                  padding: 1,
                  borderRadius: 2,
                  maxWidth: '75%',
                }}
              >
                <Typography variant="body2">{message.text}</Typography>
              </Box>
            ))}
          </Box>
        </Paper>

        {/* Input Box and Submit Button */}
        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
          <TextField
            variant="outlined"
            fullWidth
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            placeholder="Type your message..."
          />
          <IconButton onClick={handleSubmit} sx={{ marginLeft: 1 }}>
            <MdSend />
          </IconButton>
        </Box>
      </Box>

      {/* Right Pane: Code Editor */}
      <Box sx={{ flex: 2, padding: 2 }}>
        <Typography variant="h6" gutterBottom>
          Code
        </Typography>
        <CodeMirror
          value="// Write your code here"
          height="500px"
          extensions={[javascript()]}
          theme="dark"
        />
      </Box>
    </Box>
  );
}
