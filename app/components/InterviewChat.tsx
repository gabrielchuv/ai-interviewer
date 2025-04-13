import { Box } from "@mui/material";
import { FaCode } from "react-icons/fa";
import { MdMic, MdMicOff } from "react-icons/md";
import { IoRocket, IoRocketOutline } from "react-icons/io5";
import { ChatWindow } from "./ChatWindow";
import { useEffect, useState } from "react";

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
  autoResponseEnabled?: boolean;
  toggleAutoResponse?: () => void;
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
  autoConnectCountdown = null,
  autoResponseEnabled = true,
  toggleAutoResponse
}: InterviewChatProps) {
  // Add state for notification
  const [showNotification, setShowNotification] = useState(false);
  
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

IMPORTANT FOR THE INTERVIEW FLOW:
When you believe the candidate has a good understanding of the problem and has outlined their approach, please explicitly say "You can start coding now." This will signal to them that it's time to begin implementing their solution.
`, 'system');
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [isConnected, sendMessage]);
  
  // Parse AI transcripts for "you can start coding now" and disable auto-response
  useEffect(() => {
    // Only check when connected and auto-response is enabled and toggle function exists
    if (!isConnected || !autoResponseEnabled || !toggleAutoResponse) {
      return;
    }
    
    // Get the last 3 AI transcripts (in case the message spans multiple transcripts)
    const recentAiTranscripts = transcriptions
      .filter(t => t.source === 'ai')
      .slice(-3);
    
    // Join recent AI transcripts text and convert to lowercase for case-insensitive matching
    const recentAiText = recentAiTranscripts
      .map(t => t.text)
      .join(' ')
      .toLowerCase();
    
    // Check for the trigger phrase or similar variations
    const triggerPhrases = [
      'you can start coding now',
      'you may start coding',
      'you can begin coding',
      'feel free to start coding',
      'you can code now'
    ];
    
    const shouldDisableAutoResponse = triggerPhrases.some(phrase => 
      recentAiText.includes(phrase.toLowerCase())
    );
    
    // Toggle auto-response off if trigger phrase detected and auto-response is enabled
    if (shouldDisableAutoResponse && autoResponseEnabled) {
      console.log('[InterviewChat] "Start coding" phrase detected, disabling auto-response');
      toggleAutoResponse();
      
      // Show notification
      setShowNotification(true);
      
      // Hide notification after 5 seconds
      setTimeout(() => {
        setShowNotification(false);
      }, 5000);
    }
  }, [transcriptions, isConnected, autoResponseEnabled, toggleAutoResponse]);
  
  const handleReviewCode = () => {
    if (!isConnected) return;
    
    // Always ensure auto-response is enabled when reviewing code
    console.log("toggleAutoResponse", toggleAutoResponse);
    console.log("autoResponseEnabled", autoResponseEnabled);
    if (toggleAutoResponse && !autoResponseEnabled) {
      toggleAutoResponse();
      // Add a small delay to ensure the session settings are updated before sending the message
      setTimeout(() => {
        const codeMessage = `I have completed coding my solution. Here it is:\n\n${currentCode}`;
        sendMessage(codeMessage, 'user');
      }, 300);
    } else {
      // If auto-response is already enabled or toggleAutoResponse is not available, send the message immediately
      const codeMessage = `I have completed coding my solution. Here it is:\n\n${currentCode}`;
      sendMessage(codeMessage, 'user');
    }
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
      
      {/* Auto-response disabled notification */}
      {showNotification && (
        <Box
          sx={{
            bgcolor: 'rgba(37, 99, 235, 0.1)',
            border: '1px solid rgba(37, 99, 235, 0.3)',
            color: 'rgb(96, 165, 250)',
            p: 2,
            borderRadius: 1,
            mb: 2,
            fontSize: '0.875rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center'
          }}
        >
          <Box sx={{ fontWeight: 'bold', mb: 1 }}>Coding Mode Activated</Box>
          <Box>Auto-response has been turned off to allow you to focus on coding.</Box>
        </Box>
      )}
      
      <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
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
        
        {/* Auto Response Toggle Button - Only show when connected */}
        {isConnected && toggleAutoResponse && (
          <button
            onClick={toggleAutoResponse}
            className={`
              flex-1 py-2 px-4 rounded flex items-center justify-center
              ${autoResponseEnabled 
                ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                : 'bg-gray-600 hover:bg-gray-700 text-white'}
              transition-colors duration-200
            `}
          >
            {autoResponseEnabled ? (
              <>
                <IoRocket className="mr-2" />
                Auto Response On
              </>
            ) : (
              <>
                <IoRocketOutline className="mr-2" />
                Auto Response Off
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