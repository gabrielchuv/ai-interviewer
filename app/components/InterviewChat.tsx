import { Box } from "@mui/material";
import { useRef } from "react";
import { FaCode } from "react-icons/fa";
import { ChatWindow } from "./ChatWindow";

interface InterviewChatProps {
  isConnecting: boolean;
  isConnected: boolean;
  error: Error | null;
  transcriptions: Array<{ text: string; timestamp: number; source: 'user' | 'ai' }>;
  handleConnect: () => void;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  currentCode: string;
  sendMessage: (message: string) => void;
}

export function InterviewChat({
  isConnecting,
  isConnected,
  error,
  transcriptions,
  handleConnect,
  messagesEndRef,
  currentCode,
  sendMessage
}: InterviewChatProps) {
  
  const handleReviewCode = () => {
    if (!isConnected) return;
    
    const codeMessage = `I have completed coding my solution. Here it is:\n\n${currentCode}`;
    sendMessage(codeMessage);
  };
  
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
      <ChatWindow
        isConnecting={isConnecting}
        isConnected={isConnected}
        error={error}
        transcriptions={transcriptions}
        handleConnect={handleConnect}
        messagesEndRef={messagesEndRef}
      />
      
      {/* Review Code Button */}
      <button
        onClick={handleReviewCode}
        disabled={!isConnected}
        className={`
          w-full py-2 px-4 rounded flex items-center justify-center
          ${isConnected 
            ? 'bg-blue-600 hover:bg-blue-700 text-white' 
            : 'bg-gray-600 text-gray-300 cursor-not-allowed'}
          transition-colors duration-200
        `}
      >
        <FaCode className="mr-2" />
        Review Code
      </button>
    </Box>
  );
} 