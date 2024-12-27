import { Box, TextField, IconButton } from '@mui/material';
import { MdSend } from 'react-icons/md';

interface ChatInputProps {
  input: string;
  setInput: (input: string) => void;
  handleSubmit: () => void;
}

export function ChatInput({ input, setInput, handleSubmit }: ChatInputProps) {
  return (
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
  );
} 