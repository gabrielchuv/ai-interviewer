"use client"

import { useState, useCallback, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";
import { questionBank, Question } from "../data/questionBank";
import Header from "../components/Header";
import { useInterviewSession } from "../services/useInterviewSession";
import { InterviewChat } from "../components/InterviewChat";
import Typography from "@mui/material/Typography";

export interface Message {
  role: "user" | "ai";
  text: string;
  timestamp?: number;
}

// Define the custom question for free trial
// This will be used instead of randomly selecting from the question bank
const FIXED_FREE_TRIAL_QUESTION: Question = {
  id: 999,
  title: "Check if all characters have equal number of occurrences",
  description: `Given a string s, return true if s is a good string, or false otherwise. A string s is good if all the characters that appear in s have the same number of occurrences (i.e., the same frequency).`,
  examples: `
  Input: s = "abacbc"
  Output: true

  Input: s = "aaabb"
  Output: false
  `
};

// Free trial duration in seconds (5 minutes)
const FREE_TRIAL_DURATION = 5 * 60;

// Simple timer component for free trial
function FreeTrialTimer({ onTimeUp }: { onTimeUp: () => void }) {
  const [timeLeft, setTimeLeft] = useState(FREE_TRIAL_DURATION);
  
  useEffect(() => {
    if (timeLeft === 0) {
      onTimeUp();
      return;
    }
    
    const timer = setInterval(() => {
      setTimeLeft(prev => Math.max(0, prev - 1));
    }, 1000);
    
    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);
  
  // Format time as MM:SS
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  
  return formattedTime;
}

export default function FreeTrialPage() {
  const router = useRouter();
  const audioContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [autoConnectCountdown, setAutoConnectCountdown] = useState<number | null>(5);
  const [question, setQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState(true);

  const {
    isConnecting,
    isConnected,
    error,
    messages,
    transcriptions,
    connect,
    disconnect,
    sendMessage,
    audioElement,
    isMuted,
    toggleMute,
    autoResponseEnabled,
    toggleAutoResponse
  } = useInterviewSession();

  // Create a custom handler for when time is up
  const handleTimeUp = useCallback(() => {
    // Add a final message indicating the trial is over
    if (isConnected) {
        disconnect();
        router.push('/signup');
    } else {
      router.push('/signup');
    }
  }, [router, disconnect, isConnected]);

  // Set the fixed question when the component mounts
  useEffect(() => {
    // Use the fixed question instead of random selection
    setQuestion(FIXED_FREE_TRIAL_QUESTION);
    setLoading(false);
  }, []);

  // Auto-connect countdown
  useEffect(() => {
    if (autoConnectCountdown === null || isConnected || isConnecting) return;

    const timer = setTimeout(() => {
      if (autoConnectCountdown > 1) {
        setAutoConnectCountdown(autoConnectCountdown - 1);
      } else {
        setAutoConnectCountdown(null);
        handleConnect();
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [autoConnectCountdown, isConnected, isConnecting]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, transcriptions]);

  // Append audio element to the DOM
  useEffect(() => {
    if (audioElement && audioContainerRef.current) {
      // Clear previous audio elements
      audioContainerRef.current.innerHTML = '';
      // Append the new audio element
      audioContainerRef.current.appendChild(audioElement);
    }
  }, [audioElement]);

  // Handle connection
  const handleConnect = () => {
    if (!isConnected && !isConnecting && question) {
      connect(question.title, question.description, true);
    }
  };

  // Add cleanup effect
  useEffect(() => {
    return () => {
      if (isConnected) {
        disconnect();
      }
    };
  }, [disconnect]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100">
        <Header isFreeTrial={true} />
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin h-12 w-12 border-b-2 border-blue-400 rounded-full"></div>
            <p className="text-gray-300">Loading your interview question...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        height: "100vh", // Set to full viewport height
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(to bottom, rgb(17, 24, 39), rgb(31, 41, 55))",
        color: "rgb(243, 244, 246)",
      }}
    >
      {/* Hidden audio container */}
      <div ref={audioContainerRef} className="hidden"></div>
      
      <Header isFreeTrial={true} />
      
      <Box sx={{ 
        flex: 1, 
        position: "relative", 
        display: "flex", 
        flexDirection: "column",
        height: "calc(100% - 64px)", // Subtract header height
        overflow: "hidden" // Ensure no overflow
      }}>
        {/* Only show timer when connected */}
        {isConnected && (
          <Box 
            sx={{
              position: "absolute", 
              top: 10, 
              right: 16, 
              zIndex: 1000,
              // Hide this timer on small screens
              display: { xs: 'none', sm: 'flex' },
              alignItems: 'center',
              gap: 1,
              backgroundColor: "rgba(30, 41, 59, 0.5)",
              borderRadius: "8px",
              padding: "6px 12px",
              border: "1px solid rgba(96, 165, 250, 0.3)",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)"
            }}
          >
            <Box component="span" sx={{ 
              fontSize: "0.875rem", 
              opacity: 0.9,
              color: "#a5b4fc",
              fontWeight: "500" 
            }}>
              Time:
            </Box>
            <Typography
              variant="h5"
              sx={{
                fontFamily: "monospace",
                fontWeight: "700",
                color: "#60A5FA",
                fontSize: "1rem",
                lineHeight: "1.5rem",
              }}
            >
              <FreeTrialTimer onTimeUp={handleTimeUp} />
            </Typography>
          </Box>
        )}
        
        {/* Page Title with mobile timer */}
        <Box sx={{ 
          textAlign: "center", 
          margin: { xs: "15px 0 20px", sm: "30px 0 40px" }, // Reduced margins on mobile
          position: "relative",
          flexShrink: 0 // Prevent title from shrinking
        }}>
          <Typography 
            variant="h4" 
            component="h1" 
            sx={{ 
              fontWeight: "700", // Bolder font
              background: "linear-gradient(45deg, #60A5FA, #A78BFA)", // Angled gradient from blue to purple
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              fontSize: { xs: "1.5rem", sm: "2.25rem" }, // Smaller font on mobile
              letterSpacing: "0.5px", // Slight letter spacing for elegance
              textShadow: "0 2px 10px rgba(96, 165, 250, 0.3)", // Subtle glow effect
              padding: { xs: "4px 0", sm: "8px 0" }, // Less padding on mobile
              '@media (max-width: 600px)': {
                margin: "8px 0", // Reduced margin on mobile
              }
            }}
          >
            AlgoMentor - Free Trial
          </Typography>
          
          {/* Mobile timer - only shown on small screens */}
          {isConnected && (
            <Box 
              sx={{
                display: { xs: 'flex', sm: 'none' },
                justifyContent: 'center',
                marginTop: '8px', // Reduced margin
                alignItems: 'center'
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  backgroundColor: "rgba(30, 41, 59, 0.5)",
                  borderRadius: "8px",
                  padding: "4px 10px",
                  border: "1px solid rgba(96, 165, 250, 0.3)",
                }}
              >
                <Box component="span" sx={{ 
                  fontSize: "0.75rem", 
                  opacity: 0.9,
                  color: "#a5b4fc",
                  fontWeight: "500" 
                }}>
                  Time:
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: "monospace",
                    fontWeight: "700",
                    color: "#60A5FA",
                    fontSize: "1rem",
                    lineHeight: "1.2",
                  }}
                >
                  <FreeTrialTimer onTimeUp={handleTimeUp} />
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
        
        <Box sx={{ 
          flex: 1,
          display: "flex", 
          justifyContent: "center",
          padding: { xs: "0 8px", sm: "0 16px" }, // Less padding on mobile
          overflow: "hidden", // Ensure no overflow
          '@media (max-width: 767px)': {
            marginTop: "5px", // Add small margin on top for mobile
          },
        }}>
          {/* Centered chat window */}
          <Box sx={{ 
            width: "100%", 
            maxWidth: "800px",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
            display: "flex",
            flexDirection: "column",
            flex: 1,
            height: "100%",
            overflow: "hidden"
          }}>
            <InterviewChat
              isConnecting={isConnecting}
              isConnected={isConnected}
              error={error}
              transcriptions={transcriptions}
              handleConnect={handleConnect}
              messagesEndRef={messagesEndRef as React.RefObject<HTMLDivElement>}
              currentCode=""
              sendMessage={sendMessage}
              isMuted={isMuted}
              toggleMute={toggleMute}
              autoConnectCountdown={autoConnectCountdown}
              autoResponseEnabled={autoResponseEnabled}
              toggleAutoResponse={toggleAutoResponse}
              isFreeTrial={true}
            />
          </Box>
        </Box>
        
        <Box sx={{ 
          padding: { xs: "10px", sm: "16px" }, 
          textAlign: "center",
          flexShrink: 0, // Prevent footer from shrinking
          marginTop: "auto" // Push to bottom if there's extra space
        }}>
          <Box sx={{ 
            display: "inline-block",
            background: "rgba(30, 41, 59, 0.5)",
            border: "1px solid rgba(96, 165, 250, 0.3)",
            borderRadius: "10px",
            padding: { xs: "10px 16px", sm: "14px 20px" }, // Less padding on mobile
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            maxWidth: "600px",
            width: "100%"
          }}>
            <p className="text-xs sm:text-sm text-blue-300 flex flex-row items-center justify-center gap-2">
              <span>This is a <span className="font-bold text-indigo-300">5-minute</span> free trial.</span>
              <a href="/signup" className="font-medium px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors inline-flex items-center gap-1">
                <span>Sign up</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </p>
          </Box>
        </Box>
      </Box>
    </Box>
  );
} 