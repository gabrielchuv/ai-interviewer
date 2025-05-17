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

// Free trial duration in seconds (3 minutes)
const FREE_TRIAL_DURATION = 3 * 60;

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
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(to bottom, rgb(17, 24, 39), rgb(31, 41, 55))",
        color: "rgb(243, 244, 246)",
      }}
    >
      {/* Hidden audio container */}
      <div ref={audioContainerRef} className="hidden"></div>
      
      <Header isFreeTrial={true} />
      
      <Box sx={{ flex: 1, position: "relative", display: "flex", flexDirection: "column" }}>
        {/* Only show timer when connected */}
        {isConnected && (
          <Box 
            sx={{
              position: "absolute", 
              top: 0, 
              right: 16, 
              zIndex: 1000,
              // Hide this timer on small screens
              display: { xs: 'none', sm: 'block' }
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontFamily: "monospace",
                fontWeight: "bold",
                background: "linear-gradient(to right, #60A5FA, #A78BFA)", // blue-400 to purple-400
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                fontSize: "1.5rem",
                lineHeight: "2rem",
              }}
            >
              <FreeTrialTimer onTimeUp={handleTimeUp} />
            </Typography>
          </Box>
        )}
        
        {/* Page Title with mobile timer */}
        <Box sx={{ 
          textAlign: "center", 
          margin: "20px 0",
          position: "relative"
        }}>
          <Typography 
            variant="h4" 
            component="h1" 
            sx={{ 
              color: "rgb(219, 234, 254)",
              fontWeight: "600",
              '@media (max-width: 600px)': {
                fontSize: "1.5rem",
                margin: "16px 0",
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
                marginTop: '8px'
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontFamily: "monospace",
                  fontWeight: "bold",
                  background: "linear-gradient(to right, #60A5FA, #A78BFA)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  fontSize: "1.25rem",
                }}
              >
                Time remaining: <FreeTrialTimer onTimeUp={handleTimeUp} />
              </Typography>
            </Box>
          )}
        </Box>
        
        <Box sx={{ 
          flex: 1,
          display: "flex", 
          justifyContent: "center",
          padding: "0 16px"
        }}>
          {/* Centered chat window */}
          <Box sx={{ 
            width: "100%", 
            maxWidth: "800px",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
            marginBottom: "24px",
            display: "flex",
            flexDirection: "column",
            flex: 1,
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
          padding: "16px", 
          textAlign: "center"
        }}>
          <Box sx={{ 
            display: "inline-block",
            background: "rgba(37, 99, 235, 0.1)",
            border: "1px solid rgba(37, 99, 235, 0.3)",
            borderRadius: "8px",
            padding: "12px 16px",
          }}>
            <p className="text-sm text-blue-300">
              This is a <span className="font-bold">3-minute</span> free trial of AlgoMentor AI. <a href="/signup" className="font-medium underline hover:text-blue-200 transition-colors">Sign up</a> to get access to the full coding interview experience.
            </p>
          </Box>
        </Box>
      </Box>
    </Box>
  );
} 