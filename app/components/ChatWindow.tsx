import { Box, Typography, Paper } from '@mui/material';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';

interface Message {
  role: 'user' | 'ai';
  text: string;
}

interface ChatWindowProps {
  conversation: Message[];
  input: string;
  setInput: (input: string) => void;
  handleSubmit: () => void;
}

export function ChatWindow({ conversation, input, setInput, handleSubmit }: ChatWindowProps) {
  return (
    <Box sx={{ 
      width: '30%',
      borderRight: '1px solid #ddd', 
      padding: 2,
      height: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Typography variant="h6" gutterBottom>
        AI Interviewer
      </Typography>
      <Paper sx={{ 
        flex: 1,
        overflowY: 'auto',
        padding: 2,
        marginBottom: 2
      }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          {conversation.map((message, index) => (
            <ChatMessage key={index} role={message.role} text={message.text} />
          ))}
        </Box>
      </Paper>
      <ChatInput input={input} setInput={setInput} handleSubmit={handleSubmit} />
    </Box>
  );
} 