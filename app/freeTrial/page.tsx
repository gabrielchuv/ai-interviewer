"use client";

import { Box } from "@mui/material";
import { useState, useCallback, useEffect, useRef } from "react";
import { CodeEditor } from "../components/CodeEditor";
import { Timer } from "../components/Timer";
import { Footer } from "../components/Footer";
import { useRouter } from "next/navigation";
import { questionBank } from "../data/questionBank";
import Header from "../components/Header";
import { useInterviewSession } from "../services/useInterviewSession";
import { InterviewChat } from "../components/InterviewChat";

export interface Message {
  role: "user" | "ai";
  text: string;
  timestamp?: number;
}

export type MessageCategory =
  | "Clarification question"
  | "Outlining approach"
  | "Intent to start coding"
  | "Intent to finish coding"
  | "Other";

export default function InterviewPage() {
  const router = useRouter();
  const [currentCode, setCurrentCode] = useState("");
  const audioContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [autoConnectCountdown, setAutoConnectCountdown] = useState<number | null>(10);

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

  const [question] = useState(() => {
    return questionBank[0];
  });

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

  // Modified to only handle connection, not disconnection
  const handleConnect = () => {
    if (!isConnected && !isConnecting) {
      connect(question.title, question.description);
    }
  };

  const saveInterviewAndRedirectToFeedback = useCallback(() => {
    // Create a combined conversation that includes both messages and transcriptions
    const combinedConversation = [
      ...messages,
      ...transcriptions.map(transcript => ({
        role: transcript.source === 'user' ? 'user' : 'ai',
        text: transcript.text,
        timestamp: transcript.timestamp
      }))
    ].sort((a, b) => {
      // Sort by timestamp if available, otherwise keep original order
      const timeA = (a).timestamp || 0;
      const timeB = (b).timestamp || 0;
      return timeA - timeB;
    });

    localStorage.setItem(
      "interview_conversation",
      JSON.stringify(combinedConversation)
    );
    localStorage.setItem("interview_code", currentCode);
    
    // Redirect to the free trial feedback page instead of the regular feedback page
    router.push("/freeTrial/feedback");
  }, [messages, transcriptions, currentCode, router]);

  const handleTimeUp = useCallback(() => {
    saveInterviewAndRedirectToFeedback();
  }, [saveInterviewAndRedirectToFeedback]);

  const handleInterviewComplete = () => {
    // Send a final message with the code
    if (isConnected) {
      const codeMessage = `I have completed coding my solution. Here it is:\n\n${currentCode}`;
      sendMessage(codeMessage);
      
      // Wait a moment for the message to be processed before redirecting
      setTimeout(() => {
        saveInterviewAndRedirectToFeedback();
      }, 2000);
    } else {
    saveInterviewAndRedirectToFeedback();
    }
  };

  // Add cleanup effect
  useEffect(() => {
    return () => {
      if (isConnected) {
        disconnect();
      }
    };
  }, [disconnect, isConnected]);

  return (
      <Box
        sx={{
          height: "calc(100% - 120px)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Hidden audio container */}
        <div ref={audioContainerRef} className="hidden"></div>
        
        <Header />
        <Box sx={{ flex: 1, position: "relative" }}>
          {/* Only show timer when connected */}
          {isConnected && <Timer onTimeUp={handleTimeUp} />}
          <Box display="flex" sx={{ height: "calc(100% - 120px)" }}>
            <InterviewChat
              isConnecting={isConnecting}
              isConnected={isConnected}
              error={error}
              transcriptions={transcriptions}
              handleConnect={handleConnect}
              messagesEndRef={messagesEndRef as React.RefObject<HTMLDivElement>}
              currentCode={currentCode}
              sendMessage={sendMessage}
              isMuted={isMuted}
              toggleMute={toggleMute}
              autoConnectCountdown={autoConnectCountdown}
              autoResponseEnabled={autoResponseEnabled}
              toggleAutoResponse={toggleAutoResponse}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
              }}
            >
              <CodeEditor question={question} onCodeChange={setCurrentCode} />
              <Footer
                onSubmit={handleInterviewComplete}
                disableComplete={!isConnected}
              />
            </Box>
          </Box>
        </Box>
      </Box>
  );
}
