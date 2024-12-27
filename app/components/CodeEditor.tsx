import { Box, Typography } from '@mui/material';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';

export function CodeEditor() {
  return (
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
  );
} 