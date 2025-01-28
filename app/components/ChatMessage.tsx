import { Box, Typography } from "@mui/material";

interface ChatMessageProps {
  role: "user" | "ai";
  text: string;
}

export function ChatMessage({ role, text }: ChatMessageProps) {
  return (
    <Box
      sx={{
        alignSelf: role === "user" ? "flex-end" : "flex-start",
        marginBottom: 2,
        backgroundColor:
          role === "user" ? "rgb(37, 99, 235)" : "rgba(55, 65, 81, 0.5)", // blue-600 for user, gray-700/50 for AI
        padding: 1.5,
        borderRadius: "0.375rem", // rounded-md
        maxWidth: "75%",
        color: "white",
        transition: "all 200ms",
        boxShadow:
          "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
      }}
    >
      <Typography variant="body2" sx={{ color: "inherit" }}>
        {text}
      </Typography>
    </Box>
  );
}
