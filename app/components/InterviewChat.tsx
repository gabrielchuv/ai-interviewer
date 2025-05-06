import { Box } from "@mui/material";
import { FaCode } from "react-icons/fa";
import { MdMic, MdMicOff } from "react-icons/md";
import { ChatWindow } from "./ChatWindow";
import { useEffect, useState, useRef } from "react";

interface InterviewChatProps {
  isConnecting: boolean;
  isConnected: boolean;
  error: Error | null;
  transcriptions: Array<{
    text: string;
    timestamp: number;
    source: "user" | "ai";
  }>;
  handleConnect: () => void;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  currentCode: string;
  sendMessage: (message: string, role?: "user" | "system") => void;
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
  toggleAutoResponse,
}: InterviewChatProps) {
  // Add state for notification
  const [showNotification, setShowNotification] = useState(false);
  // Add state to track when Review Code was clicked
  const [reviewCodeClicked, setReviewCodeClicked] = useState(false);
  // Keep track of the last transcription length to avoid re-processing
  const lastTranscriptLengthRef = useRef(0);

  // Send introduction message when connection is established
  useEffect(() => {
    if (isConnected) {
      // Use a small delay to ensure the connection is fully established
      const timer = setTimeout(() => {
        sendMessage(
          `Introduce yourself as an interviewer. Let the candidate know the following:
- They can ask questions to understand the requirements
- They should outline their approach before coding
- When done coding, click on Review Code to proceed with the interview
- They will be assessed based on their approach and thinking process, not perfect syntax

IMPORTANT FOR THE INTERVIEW FLOW:
When you believe the candidate has a good understanding of the problem and has outlined their approach, please explicitly say "You can start coding now." This will signal to them that it's time to begin implementing their solution.
`,
          "system"
        );
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isConnected, sendMessage]);

  // Parse AI transcripts for "you can start coding now" and disable auto-response
  useEffect(() => {
    // Skip checks if Review Code was recently clicked or there are no new transcriptions
    if (
      !isConnected ||
      !autoResponseEnabled ||
      !toggleAutoResponse ||
      reviewCodeClicked ||
      transcriptions.length <= lastTranscriptLengthRef.current
    ) {
      return;
    }

    // Update the last checked transcription length
    lastTranscriptLengthRef.current = transcriptions.length;

    // Get only the very last AI transcript
    const aiTranscripts = transcriptions.filter((t) => t.source === "ai");
    if (aiTranscripts.length === 0) return;

    const lastAiTranscript = aiTranscripts[aiTranscripts.length - 1];
    console.log("Last AI transcript:", lastAiTranscript);

    // Convert to lowercase for case-insensitive matching
    const lastAiText = lastAiTranscript.text.toLowerCase();
    console.log("Last AI text:", lastAiText);

    // Check for the trigger phrase or similar variations
    const triggerPhrases = [
      "you can start coding now",
      "you may start coding",
      "you can begin coding",
      "feel free to start coding",
      "you can code now",
    ];

    const shouldDisableAutoResponse = triggerPhrases.some((phrase) =>
      lastAiText.includes(phrase.toLowerCase())
    );

    // Toggle auto-response off if trigger phrase detected and auto-response is enabled
    if (shouldDisableAutoResponse && autoResponseEnabled) {
      console.log(
        '[InterviewChat] "Start coding" phrase detected, disabling auto-response'
      );
      toggleAutoResponse();

      // Show notification
      setShowNotification(true);

      // Hide notification after 5 seconds
      setTimeout(() => {
        setShowNotification(false);
      }, 5000);
    }
  }, [
    transcriptions,
    isConnected,
    autoResponseEnabled,
    toggleAutoResponse,
    reviewCodeClicked,
  ]);

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
        sendMessage(codeMessage, "user");

        // Reset reviewCodeClicked flag after a longer delay
        setTimeout(() => {
          setReviewCodeClicked(false);
        }, 2000);
      }, 300);
    } else {
      // If auto-response is already enabled or toggleAutoResponse is not available, send the message immediately
      const codeMessage = `I have completed coding my solution. Here it is:\n\n${currentCode}`;
      sendMessage(codeMessage, "user");

      // Reset reviewCodeClicked flag after a delay
      setTimeout(() => {
        setReviewCodeClicked(false);
      }, 2000);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transcriptions]);

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
            bgcolor: "rgba(37, 99, 235, 0.1)",
            border: "1px solid rgba(37, 99, 235, 0.3)",
            color: "rgb(96, 165, 250)",
            p: 2,
            borderRadius: 1,
            mb: 2,
            fontSize: "0.875rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Box sx={{ fontWeight: "bold", mb: 1 }}>Coding Mode Activated</Box>
          <Box>
            Auto-response has been turned off to allow you to focus on coding.
          </Box>
        </Box>
      )}

      <Box sx={{ display: "flex", gap: 2, mb: 2, flexWrap: "wrap" }}>
        {/* Mute Button - Only show when connected */}
        {isConnected && toggleMute && (
          <button
            onClick={toggleMute}
            className={`
              flex-1 py-2 px-4 rounded flex items-center justify-center
              ${
                isMuted
                  ? "bg-red-600 hover:bg-red-700 text-white"
                  : "bg-green-600 hover:bg-green-700 text-white"
              }
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
            ${
              isConnected
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-600 text-gray-300 cursor-not-allowed"
            }
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
