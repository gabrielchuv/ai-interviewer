"use client";

import { Box } from "@mui/material";
import { useState, useCallback } from "react";
import { ChatWindow } from "../components/ChatWindow";
import { CodeEditor } from "../components/CodeEditor";
import { Timer } from "../components/Timer";
import { Footer } from "../components/Footer";
import { sendMessage, deduceCustomerIntent } from "../services/chat";
import { useRouter } from "next/navigation";
import { questionBank } from "../data/questionBank";
import ProtectedRoute from "../components/ProtectedRoute";
import Header from "../components/Header";

export interface Message {
  role: "user" | "ai";
  text: string;
}

const initialMessage: Message = {
  role: "ai",
  text: `Welcome! I'll be your interviewer today. Please consider the question in the code editor to the right, and interact with me in the same way you would in a real interview. The only difference is
  that you are expected to interact via text (for now).
  Good luck!`,
};

export type MessageCategory =
  | "Clarification question"
  | "Outlining approach"
  | "Intent to start coding"
  | "Intent to finish coding"
  | "Other";

export default function InterviewPage() {
  const router = useRouter();
  const [conversation, setConversation] = useState<Message[]>([initialMessage]);
  const [input, setInput] = useState<string>("");
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [currentCode, setCurrentCode] = useState("");

  const [question] = useState(() => {
    return questionBank[Math.floor(Math.random() * questionBank.length) + 1];
  });

  const handleSubmit = async () => {
    if (!input) return;

    setConversation((prev) => [...prev, { role: "user", text: input }]);
    setInput("");

    try {
      let userPrompt = input;

      const customerIntent = await deduceCustomerIntent(userPrompt);

      if (customerIntent === "Intent to finish coding") {
        userPrompt = `I have completed coding my solution. Here it is:\n\n${currentCode}`;
        const response = await sendMessage(userPrompt, {
          questionTitle: question.title,
          questionDescription: question.description,
          conversation: conversation,
        });
        setConversation((prev) => [...prev, { role: "ai", text: response }]);
        return;
      }

      const response = await sendMessage(userPrompt, {
        questionTitle: question.title,
        questionDescription: question.description,
        conversation: conversation,
      });
      setConversation((prev) => [...prev, { role: "ai", text: response }]);
    } catch {
      setConversation((prev) => [
        ...prev,
        {
          role: "ai",
          text: "Sorry, there was an error processing your request. Please try again later.",
        },
      ]);
    }
  };

  const handleTimeUp = useCallback(() => {
    setIsTimeUp(true);
  }, []);

  const handleInterviewComplete = () => {
    localStorage.setItem(
      "interview_conversation",
      JSON.stringify(conversation)
    );
    localStorage.setItem("interview_code", currentCode);
    router.push("/feedback");
  };

  return (
    <ProtectedRoute>
      <Box
        sx={{
          height: "calc(100% - 120px)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Header />
        <Box sx={{ flex: 1, position: "relative" }}>
          <Timer onTimeUp={handleTimeUp} />
          <Box display="flex" sx={{ height: "calc(100% - 120px)" }}>
            <ChatWindow
              conversation={conversation}
              input={input}
              setInput={setInput}
              handleSubmit={handleSubmit}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
              }}
            >
              <CodeEditor question={question} onCodeChange={setCurrentCode} />
              <Footer onSubmit={handleInterviewComplete} />
            </Box>
          </Box>
        </Box>
      </Box>
    </ProtectedRoute>
  );
}
