'use client';

import { Box, Button, Typography } from '@mui/material';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { questionBank } from '../data/questionBank';
import { useState } from 'react';

export function CodeEditor() {
  // Initialize the random question once when component mounts
  const [question] = useState(() => {
    return questionBank[Math.floor(Math.random() * 10)];
  });

  const handleSubmit = () => {
    // Will be implemented later
    console.log('Submit clicked');
  };

  return (
    <Box 
      sx={{ 
        flex: 2, 
        padding: 2,
        display: 'flex',
        flexDirection: 'column',
        height: '100vh'
      }}
    >
      <Typography variant="h6" gutterBottom>
        Code
      </Typography>
      <CodeMirror
        value={question.description}
        height="calc(100vh - 140px)"
        extensions={[javascript()]}
        theme="dark"
      />
      <Box 
        sx={{ 
          display: 'flex',
          justifyContent: 'flex-end',
          mt: 2,
          height: '40px'
        }}
      >
        <Button 
          variant="contained" 
          color="primary"
          onClick={handleSubmit}
          sx={{ width: '120px' }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
} 