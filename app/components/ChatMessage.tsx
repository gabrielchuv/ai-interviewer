import { Box, Typography } from '@mui/material';

interface ChatMessageProps {
  role: 'user' | 'ai';
  text: string;
}

export function ChatMessage({ role, text }: ChatMessageProps) {
  return (
    <Box
      sx={{
        alignSelf: role === 'user' ? 'flex-end' : 'flex-start',
        marginBottom: 2,
        backgroundColor: role === 'user' ? '#d1e7dd' : '#f8d7da',
        padding: 1,
        borderRadius: 2,
        maxWidth: '75%',
      }}
    >
      <Typography variant="body2">{text}</Typography>
    </Box>
  );
} 