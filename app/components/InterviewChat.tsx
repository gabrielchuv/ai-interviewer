import { Box } from "@mui/material";
import { FaCode } from "react-icons/fa";
import { MdMic, MdMicOff } from "react-icons/md";
import { VscSymbolEvent } from "react-icons/vsc";
import { ChatWindow } from "./ChatWindow";
import Tooltip from "@mui/material/Tooltip";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { useEffect, useState, useRef } from "react";

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
  isFreeTrial?: boolean;
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
  toggleAutoResponse,
  isFreeTrial = false
}: InterviewChatProps) {
  // Add state for notification
  const [showNotification, setShowNotification] = useState(false);
  // Add state to track notification message
  const [notificationMessage, setNotificationMessage] = useState<{ title: string; message: string }>({
    title: 'Coding Mode Activated',
    message: 'Auto-response has been turned off to allow you to focus on coding.'
  });
  // Add state to track when Review Code was clicked
  const [reviewCodeClicked, setReviewCodeClicked] = useState(false);
  // Track previous auto-response state to detect changes
  const prevAutoResponseEnabledRef = useRef(autoResponseEnabled);
  
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
- They can use the Share Thought Process button to think aloud without being interrupted

IMPORTANT FOR THE INTERVIEW FLOW:
When you believe the candidate has a good understanding of the problem and has outlined their approach, please explicitly say "You can start coding now." This will signal to them that it's time to begin implementing their solution.
`, 'system');
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [isConnected, sendMessage]);
  
  // Track changes to autoResponseEnabled to show notifications for manual toggling
  useEffect(() => {
    // Skip first render
    if (prevAutoResponseEnabledRef.current === autoResponseEnabled) {
      prevAutoResponseEnabledRef.current = autoResponseEnabled;
      return;
    }
    
    // Only show notifications for manual toggling (not review code)
    if (!reviewCodeClicked) {
      if (!autoResponseEnabled) {
        // Auto-response was disabled
        setNotificationMessage({
          title: 'Thought Process Mode',
          message: 'AI responses are paused. Share your thinking without interruption.'
        });
      } else {
        // Auto-response was enabled
        setNotificationMessage({
          title: 'Response Mode',
          message: 'AI will now respond to your input.'
        });
      }
      
      // Show notification
      setShowNotification(true);
      
      // Hide notification after 5 seconds
      setTimeout(() => {
        setShowNotification(false);
      }, 5000);
    }
    
    // Update the previous state
    prevAutoResponseEnabledRef.current = autoResponseEnabled;
  }, [autoResponseEnabled, reviewCodeClicked, sendMessage]);
  
  const handleReviewCode = () => {
    if (!isConnected) return;
    
    // Always ensure auto-response is enabled when reviewing code
    console.log("toggleAutoResponse", toggleAutoResponse);
    console.log("autoResponseEnabled", autoResponseEnabled);
    
    // Set reviewCodeClicked to true
    setReviewCodeClicked(true);
    
    if (toggleAutoResponse && !autoResponseEnabled) {
      toggleAutoResponse();
      // Add a small delay to ensure the session settings are updated before sending the message
      setTimeout(() => {
        const codeMessage = `I have completed coding my solution. Here it is:\n\n${currentCode}`;
        sendMessage(codeMessage, 'user');
        
        // Reset reviewCodeClicked flag after a longer delay
        setTimeout(() => {
          setReviewCodeClicked(false);
        }, 2000);
      }, 300);
    } else {
      // If auto-response is already enabled or toggleAutoResponse is not available, send the message immediately
      const codeMessage = `I have completed coding my solution. Here it is:\n\n${currentCode}`;
      sendMessage(codeMessage, 'user');
      
      // Reset reviewCodeClicked flag after a delay
      setTimeout(() => {
        setReviewCodeClicked(false);
      }, 2000);
    }
  };
  
  return (
    <Box
      sx={{
        width: isFreeTrial ? "100%" : "30%",
        borderRight: isFreeTrial ? "none" : "1px solid rgba(75, 85, 99, 0.3)",
        padding: 2,
        height: isFreeTrial ? "100%" : "calc(100vh - 80px)",
        minHeight: isFreeTrial ? "500px" : "auto",
        display: "flex",
        flexDirection: "column",
        bgcolor: "rgb(17, 24, 39)",
        borderRadius: isFreeTrial ? "8px" : "0",
        overflow: "hidden",
        // Media queries for responsive design
        '@media (max-width: 767px)': {
          width: "100%",
          height: isFreeTrial ? "100%" : "calc(100vh - 80px)",
          minHeight: "400px",
        },
        flex: isFreeTrial ? 1 : "none",
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
      
      {/* Auto-response notification using MUI Alert */}
      {showNotification && (
        <Alert 
          severity={
            notificationMessage.title === 'Thought Process Mode' 
              ? 'info'
              : notificationMessage.title === 'Response Mode'
                ? 'success'
                : 'info'
          }
          sx={{ 
            mb: 2,
            backgroundColor: notificationMessage.title === 'Thought Process Mode' 
              ? 'rgba(124, 58, 237, 0.1)' 
              : notificationMessage.title === 'Response Mode'
                ? 'rgba(16, 185, 129, 0.1)'
                : 'rgba(37, 99, 235, 0.1)',
            color: notificationMessage.title === 'Thought Process Mode'
              ? 'rgb(167, 139, 250)'
              : notificationMessage.title === 'Response Mode'
                ? 'rgb(52, 211, 153)'
                : 'rgb(96, 165, 250)',
            border: notificationMessage.title === 'Thought Process Mode'
              ? '1px solid rgba(124, 58, 237, 0.3)'
              : notificationMessage.title === 'Response Mode'
                ? '1px solid rgba(16, 185, 129, 0.3)'
                : '1px solid rgba(37, 99, 235, 0.3)',
            '& .MuiAlert-icon': {
              color: notificationMessage.title === 'Thought Process Mode'
                ? 'rgb(167, 139, 250)'
                : notificationMessage.title === 'Response Mode'
                  ? 'rgb(52, 211, 153)'
                  : 'rgb(96, 165, 250)',
            }
          }}
        >
          <AlertTitle>{notificationMessage.title}</AlertTitle>
          {notificationMessage.message}
        </Alert>
      )}
      
      <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
        {/* Mute Button - Only show when connected */}
        {isConnected && toggleMute && (
          <Tooltip
            title={isMuted ? "Turn on your microphone" : "Turn off your microphone"}
            arrow
            placement="top"
          >
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
          </Tooltip>
        )}
        
        {/* Share Thought Process Button - Only show when connected and not hidden */}
        {isConnected && toggleAutoResponse && !isFreeTrial && (
          <Tooltip 
            title={!autoResponseEnabled 
              ? "Resume AI responses to your input" 
              : "Use during coding to pause AI responses to allow you to explain your thought process without interruption"
            }
            arrow
            placement="top"
          >
            <button
              onClick={toggleAutoResponse}
              className={`
                flex-1 py-2 px-4 rounded flex items-center justify-center
                ${!autoResponseEnabled 
                  ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                  : 'bg-cyan-600 hover:bg-cyan-700 text-white'}
                transition-colors duration-200
              `}
            >
              <VscSymbolEvent className="mr-2" />
              {!autoResponseEnabled ? 'Resume Responses' : 'Share Thought Process'}
            </button>
          </Tooltip>
        )}
        
        {/* Review Code Button - Only show when not hidden */}
        {!isFreeTrial && (
          <Tooltip
            title="Use afer done coding to submit your code for review by the interviewer"
            arrow
            placement="top"
            disableHoverListener={!isConnected}
          >
            <span className="flex-1"> {/* Wrap disabled button in span for tooltip to work */}
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
            </span>
          </Tooltip>
        )}
      </Box>
    </Box>
  );
} 