"use client";

import { Box } from "@mui/material";
import { useState, useCallback, useEffect, useRef } from "react";
import { ChatWindow } from "../components/ChatWindow";
import { CodeEditor } from "../components/CodeEditor";
import { Timer } from "../components/Timer";
import { Footer } from "../components/Footer";
import { sendMessage, deduceCustomerIntent } from "../services/chat";
import { useRouter } from "next/navigation";
import { questionBank } from "../data/questionBank";
import ProtectedRoute from "../components/ProtectedRoute";
import Header from "../components/Header";
import { useTextToSpeech } from "../services/useTextToSpeech";

export interface Message {
  role: "user" | "ai";
  text: string;
}

const initialMessage: Message = {
  role: "ai",
  text: `Welcome! I'm AlgoMentor and I'll be your interviewer today. Please consider the question in the code editor to the right, and interact with me in the same way you would in a real interview. Feel free to to ask any clarifying questions and outline your approach before you start coding.
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
  const [conversation, setConversation] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [currentCode, setCurrentCode] = useState("");
  const [streamingMessage, setStreamingMessage] = useState<string>("");
  const [isStreaming, setIsStreaming] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [question] = useState(() => {
    return questionBank[Math.floor(Math.random() * questionBank.length) + 1];
    // return questionBank[1];
  });

  const { readAndStreamText, stop } = useTextToSpeech();

  const handleSubmit = async () => {
    if (!input) return;

    setConversation((prev) => [...prev, { role: "user", text: input }]);
    setInput("");
    setStreamingMessage("");
    setIsStreaming(true);

    try {
      let userPrompt = input;

      const customerIntent = await deduceCustomerIntent(userPrompt);

      if (customerIntent === "Intent to finish coding") {
        userPrompt = `I have completed coding my solution. Here it is:\n\n${currentCode}`;
        const response = await sendMessage(
          userPrompt,
          {
            questionTitle: question.title,
            questionDescription: question.description,
            conversation: conversation,
          },
          (chunk) => {
            setStreamingMessage((prev) => prev + chunk);
          }
        );
        setConversation((prev) => [...prev, { role: "ai", text: response }]);
        setIsStreaming(false);
        return;
      }

      const response = await sendMessage(
        userPrompt,
        {
          questionTitle: question.title,
          questionDescription: question.description,
          conversation: conversation,
        },
        (chunk) => {
          setStreamingMessage((prev) => prev + chunk);
        }
      );
      setConversation((prev) => [...prev, { role: "ai", text: response }]);
      setIsStreaming(false);
    } catch {
      setConversation((prev) => [
        ...prev,
        {
          role: "ai",
          text: "Sorry, there was an error processing your request. Please try again later.",
        },
      ]);
      setIsStreaming(false);
    }
  };

  const read = useCallback(() => {
    return new Promise<void>(async (resolve) => {
      setIsStreaming(true);
      const streamedText = await readAndStreamText(
        initialMessage.text,
        (chunk) => {
          setStreamingMessage((prev) => prev + chunk);
        }
      );
      setIsStreaming(false);
      setConversation((prev) => [...prev, { role: "ai", text: streamedText }]);
      resolve();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Second timeout to trigger the button
    const buttonTimeoutId = setTimeout(() => {
      buttonRef.current?.click();
    }, 200);

    return () => {
      clearTimeout(buttonTimeoutId);
      stop();
      window.speechSynthesis.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        <button
          ref={buttonRef}
          onClick={read}
          style={{ display: "none" }}
          aria-hidden="true"
        />
        <Header />
        <Box sx={{ flex: 1, position: "relative" }}>
          <Timer onTimeUp={handleTimeUp} />
          <Box display="flex" sx={{ height: "calc(100% - 120px)" }}>
            <ChatWindow
              conversation={conversation}
              input={input}
              setInput={setInput}
              handleSubmit={handleSubmit}
              streamingMessage={streamingMessage}
              isStreaming={isStreaming}
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
                disableComplete={isStreaming}
                disableRestart={isStreaming}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </ProtectedRoute>
  );
}
