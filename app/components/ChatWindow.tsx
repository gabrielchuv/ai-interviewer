import { Box, Typography, Paper, Button } from '@mui/material';
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
      <Button
        variant="outlined"
        onClick={() => setInput("I have completed my solution")}
        sx={{
          mb: 2,
          textTransform: 'none',
          justifyContent: 'flex-start',
          color: 'text.secondary',
          borderRadius: '20px',
          borderColor: 'primary.light',
          '&:hover': {
            borderColor: 'primary.main',
            backgroundColor: 'rgba(25, 118, 210, 0.04)'
          }
        }}
      >
        I have completed my solution
      </Button>
      <ChatInput input={input} setInput={setInput} handleSubmit={handleSubmit} />
    </Box>
  );
} 