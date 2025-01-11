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
      if (event.shiftKey) {
        event.preventDefault();
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
        alignItems: "center",
        height: "56px", // Standard height for TextField
        minHeight: "56px", // Ensure consistent height
      }}
    >
      <TextField
        variant="outlined"
        multiline={true}
        fullWidth
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
        rows={2}
        style={{ overflowY: "auto" }}
        onKeyDown={handleKeyDown}
      />
      <IconButton onClick={handleSubmit} sx={{ marginLeft: 1 }}>
        <MdSend />
      </IconButton>
    </Box>
  );
}
