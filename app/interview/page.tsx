"use client";

import { Box } from "@mui/material";
import { useState, useCallback, useEffect, useRef } from "react";
import { CodeEditor } from "../components/CodeEditor";
import { Timer } from "../components/Timer";
import { Footer } from "../components/Footer";
import { useRouter } from "next/navigation";
import { questionBank, Question } from "../data/questionBank";
import CombinedProtection from "../components/CombinedProtection";
import Header from "../components/Header";
import { useInterviewSession } from "../services/useInterviewSession";
import { InterviewChat } from "../components/InterviewChat";
import { getNewQuestionForUser, addQuestionToUserHistory } from "../services/firebase";

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
  const [checkingAccess, setCheckingAccess] = useState(true);
  const [accessDenied, setAccessDenied] = useState(false);
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
        if (!checkingAccess) {
          const newQuestion = await getNewQuestionForUser();
          setQuestion(newQuestion);
          
          await addQuestionToUserHistory(newQuestion.id);
          
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching question:", error);
        // Fallback to random question selection if there's an error
        setQuestion(questionBank[Math.floor(Math.random() * questionBank.length)]);
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [checkingAccess]);

  // Check if user should have access to the interview page
  useEffect(() => {
    const checkAccess = async () => {
      try {
        // Check if user came from setup page (valid path)
        const fromSetup = localStorage.getItem('interview_access') === 'granted';
        
        if (!fromSetup) {          
            // Not from setup - redirect to pricing
            setAccessDenied(true);
            setTimeout(() => {
              router.push('/home');
            }, 5000);
            return;
          
        }
        
        // Clear the access token to prevent reuse
        localStorage.removeItem('interview_access');
        setCheckingAccess(false);
      } catch (error) {
        console.error("Error checking interview access:", error);
        setAccessDenied(true);
        setTimeout(() => {
          router.push('/setup');
        }, 1500);
      }
    };

    checkAccess();
  }, [router]);

  // Auto-connect countdown
  useEffect(() => {
    if (autoConnectCountdown === null || isConnected || isConnecting || checkingAccess) return;

    const timer = setTimeout(() => {
      if (autoConnectCountdown > 1) {
        setAutoConnectCountdown(autoConnectCountdown - 1);
      } else {
        setAutoConnectCountdown(null);
        handleConnect();
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [autoConnectCountdown, isConnected, isConnecting, checkingAccess]);

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
    if (!isConnected && !isConnecting && question) {
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
    router.push("/feedback");
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
  }, [disconnect]);

  if (checkingAccess) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            {!accessDenied ? (
              <>
                <div className="animate-spin h-12 w-12 border-b-2 border-blue-400 rounded-full"></div>
                <p className="text-gray-300">Verifying access...</p>
              </>
            ) : (
              <>
                <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-6 text-center">
                  <p className="text-red-400 font-medium text-lg mb-2">Access Denied</p>
                  <p className="text-gray-300">You need to purchase interview credits first or start the interview from the home page.</p>
                  <p className="text-gray-300 mt-2">Redirecting you...</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100">
        <Header />
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
    <CombinedProtection>
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
              {question && (
                <CodeEditor question={question} onCodeChange={setCurrentCode} />
              )}
              <Footer
                onSubmit={handleInterviewComplete}
                disableComplete={!isConnected}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </CombinedProtection>
  );
}
