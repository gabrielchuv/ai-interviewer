"use client"

import { useState, useCallback, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import { Timer } from "../components/Timer";
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

export default function FreeTrialPage() {
  const router = useRouter();
  const audioContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [autoConnectCountdown, setAutoConnectCountdown] = useState<number | null>(10);
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

  // Fetch a new question when the component mounts
  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        // For free trial, just use a random question from the bank
        setQuestion(questionBank[Math.floor(Math.random() * questionBank.length)]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching question:", error);
        setQuestion(questionBank[Math.floor(Math.random() * questionBank.length)]);
        setLoading(false);
      }
    };

    fetchQuestion();
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
      connect(question.title, question.description);
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
        {isConnected && <Timer onTimeUp={() => router.push('/')} />}
        
        {/* Page Title */}
        <Typography 
          variant="h4" 
          component="h1" 
          sx={{ 
            textAlign: "center", 
            margin: "20px 0",
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
              This is a free trial of AlgoMentor AI. <a href="/signup" className="font-medium underline hover:text-blue-200 transition-colors">Sign up</a> to get access to the full coding interview experience.
            </p>
          </Box>
        </Box>
      </Box>
    </Box>
  );
} 