'use client';

import { Box, Typography } from '@mui/material';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { questionBank } from '../data/questionBank';
import { useState } from 'react';

export function CodeEditor() {
  const [question] = useState(() => {
    return questionBank[Math.floor(Math.random() * 10)];
  });

  return (
    <Box 
      sx={{ 
        width: '70%',
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
    </Box>
  );
} 