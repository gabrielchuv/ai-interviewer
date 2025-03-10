import { Box } from "@mui/material";
import { FaCode } from "react-icons/fa";
import { MdMic, MdMicOff } from "react-icons/md";
import { ChatWindow } from "./ChatWindow";
import { useEffect } from "react";

interface InterviewChatProps {
  isConnecting: boolean;
  isConnected: boolean;
  error: Error | null;
  transcriptions: Array<{ text: string; timestamp: number; source: 'user' | 'ai' }>;
  handleConnect: () => void;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  currentCode: string;
  sendMessage: (message: string, role?: 'user' | 'system') => void;
  isMuted?: boolean;
  toggleMute?: () => void;
  autoConnectCountdown?: number | null;
}

export function InterviewChat({
  isConnecting,
  isConnected,
  error,
  transcriptions,
  handleConnect,
  messagesEndRef,
  currentCode,
  sendMessage,
  isMuted = false,
  toggleMute,
  autoConnectCountdown = null
}: InterviewChatProps) {
  
  // Send introduction message when connection is established
  useEffect(() => {
    if (isConnected) {
      // Use a small delay to ensure the connection is fully established
      const timer = setTimeout(() => {
        sendMessage(`Introduce yourself as an interviewer. Let the candidate know the following:
- They can ask questions to understand the requirements
- They should outline their approach before coding
- When done coding, click on Review Code to proceed with the interview
- They will be assessed based on their approach and thinking process, not perfect syntax
`, 'system');
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [isConnected, sendMessage]);
  
  const handleReviewCode = () => {
    if (!isConnected) return;
    
    const codeMessage = `I have completed coding my solution. Here it is:\n\n${currentCode}`;
    sendMessage(codeMessage, 'user');
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
        autoConnectCountdown={autoConnectCountdown}
      />
      
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        {/* Mute Button - Only show when connected */}
        {isConnected && toggleMute && (
          <button
            onClick={toggleMute}
            className={`
              flex-1 py-2 px-4 rounded flex items-center justify-center
              ${isMuted 
                ? 'bg-red-600 hover:bg-red-700 text-white' 
                : 'bg-green-600 hover:bg-green-700 text-white'}
              transition-colors duration-200
            `}
          >
            {isMuted ? (
              <>
                <MdMicOff className="mr-2" />
                Unmute Mic
              </>
            ) : (
              <>
                <MdMic className="mr-2" />
                Mute Mic
              </>
            )}
          </button>
        )}
        
        {/* Review Code Button */}
        <button
          onClick={handleReviewCode}
          disabled={!isConnected}
          className={`
            flex-1 py-2 px-4 rounded flex items-center justify-center
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
    </Box>
  );
} 