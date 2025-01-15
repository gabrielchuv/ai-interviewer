import { Box, TextField, IconButton } from "@mui/material";
import { Dispatch, KeyboardEventHandler, SetStateAction } from "react";
import { MdSend } from "react-icons/md";

interface ChatInputProps {
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
  handleSubmit: () => void;
}

export function ChatInput({ input, setInput, handleSubmit }: ChatInputProps) {
  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (event.shiftKey) {
        setInput((prev) => prev + "\n");
      } else {
        handleSubmit();
      }
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-end",
        minHeight: "56px",
        maxHeight: "30vh",
        position: "relative",
      }}
    >
      <TextField
        variant="outlined"
        multiline
        fullWidth
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
        minRows={1}
        maxRows={12}
        sx={{
          '& .MuiInputBase-root': {
            maxHeight: '30vh',
            overflowY: 'auto',
          }
        }}
        onKeyDown={handleKeyDown}
      />
      <IconButton 
        onClick={handleSubmit} 
        sx={{ 
          marginLeft: 1,
          marginBottom: '8px' // Align with the text input bottom
        }}
      >
        <MdSend />
      </IconButton>
    </Box>
  );
}
