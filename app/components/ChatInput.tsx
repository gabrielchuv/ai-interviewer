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
        gap: 1,
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
          "& .MuiInputBase-root": {
            maxHeight: "30vh",
            overflowY: "auto",
            backgroundColor: "rgba(55, 65, 81, 0.5)", // gray-700/50
            borderRadius: 1,
            color: "rgb(243, 244, 246)", // text-gray-100
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(75, 85, 99, 0.5)", // border-gray-700
          },
          "& .MuiInputBase-root:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(75, 85, 99, 0.8)", // border-gray-700 with higher opacity
          },
          "& .MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#60A5FA", // blue-400
          },
          "& .MuiInputBase-input::placeholder": {
            color: "rgb(156, 163, 175)", // text-gray-400
            opacity: 1,
          },
        }}
        onKeyDown={handleKeyDown}
      />
      <IconButton
        onClick={handleSubmit}
        sx={{
          marginBottom: "8px",
          color: "#60A5FA", // blue-400
          "&:hover": {
            backgroundColor: "rgba(96, 165, 250, 0.1)", // blue-400 with low opacity
          },
        }}
      >
        <MdSend />
      </IconButton>
    </Box>
  );
}
