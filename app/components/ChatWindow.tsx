import { Box, Paper } from "@mui/material";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { Dispatch, SetStateAction } from "react";

interface Message {
  role: "user" | "ai";
  text: string;
}

interface ChatWindowProps {
  conversation: Message[];
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
  handleSubmit: () => void;
}

export function ChatWindow({
  conversation,
  input,
  setInput,
  handleSubmit,
}: ChatWindowProps) {
  return (
    <Box
      sx={{
        width: "30%",
        borderRight: "1px solid rgba(75, 85, 99, 0.3)",
        padding: 2,
        height: "calc(100vh - 80px)",
        display: "flex",
        flexDirection: "column",
        bgcolor: "rgb(17, 24, 39)",
      }}
    >
      <Paper
        sx={{
          flex: 1,
          overflowY: "auto",
          padding: 2,
          marginBottom: 2,
          bgcolor: "rgba(31, 41, 55, 0.5)",
          borderRadius: 2,
          border: "1px solid rgba(75, 85, 99, 0.5)",
          color: "rgb(243, 244, 246)",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {conversation.map((message, index) => (
            <ChatMessage key={index} role={message.role} text={message.text} />
          ))}
        </Box>
      </Paper>
      <ChatInput
        input={input}
        setInput={setInput}
        handleSubmit={handleSubmit}
      />
    </Box>
  );
}
