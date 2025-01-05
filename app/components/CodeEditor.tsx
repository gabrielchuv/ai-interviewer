'use client';

import { Box, Typography } from '@mui/material';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { Question } from '../data/questionBank';

interface CodeEditorProps {
  question: Question;
}

export function CodeEditor({ question }: CodeEditorProps) {
  return (
    <Box 
      sx={{ 
        flex: 1,
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