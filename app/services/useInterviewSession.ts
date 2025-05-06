import { useState, useEffect, useRef, useCallback } from "react";
import { RealtimeSession } from "./realtimeSession";
import { Message } from "../interview/page";
import { EphemeralSession } from "./ephemeralSession";

interface UseInterviewSessionResult {
  isConnecting: boolean;
  isConnected: boolean;
  error: Error | null;
  messages: Message[];
  transcriptions: Array<{
    text: string;
    timestamp: number;
    source: "user" | "ai";
  }>;
  connect: (
    questionTitle: string,
    questionDescription: string
  ) => Promise<void>;
  disconnect: () => void;
  sendMessage: (message: string, role?: "user" | "system") => void;
  clearTranscriptions: () => void;
  audioElement: HTMLAudioElement | null;
  isMuted: boolean;
  toggleMute: () => void;
  autoResponseEnabled: boolean;
  toggleAutoResponse: () => void;
}

// Updated to use a custom function to get the ephemeral session with question details
async function getEphemeralSessionWithQuestion(
  questionTitle: string,
  questionDescription: string
): Promise<EphemeralSession> {
  try {
    const response = await fetch("/api/session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ questionTitle, questionDescription }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Failed to get ephemeral session:", errorData);
      throw new Error("Failed to get ephemeral session");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error getting ephemeral session:", error);
    throw new Error("Failed to get ephemeral session");
  }
}

export function useInterviewSession(): UseInterviewSessionResult {
  // Remove unused states
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      text: "Welcome to the technical interview! Click the Connect button above to start. You'll be able to speak with the AI interviewer and discuss your approach to the coding problem.",
      timestamp: Date.now(),
    },
  ]);
  const [transcriptions, setTranscriptions] = useState<
    Array<{ text: string; timestamp: number; source: "user" | "ai" }>
  >([]);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(
    null
  );
  const [isMuted, setIsMuted] = useState(false);
  const [autoResponseEnabled, setAutoResponseEnabled] = useState(true);
  const realtimeSessionRef = useRef<RealtimeSession | null>(null);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (realtimeSessionRef.current) {
        realtimeSessionRef.current.disconnect();
        realtimeSessionRef.current = null;
      }
    };
  }, []);

  const connect = useCallback(
    async (questionTitle: string, questionDescription: string) => {
      if (isConnected || isConnecting) {
        return;
      }

      setIsConnecting(true);
      setError(null);

      try {
        // Get the ephemeral session with question details
        const ephemeralSession = await getEphemeralSessionWithQuestion(
          questionTitle,
          questionDescription
        );

        // Create a new realtime session
        const realtimeSession = new RealtimeSession({
          onMessage: (event) => {
            try {
              const data = JSON.parse(event.data);
              console.log("Received event:", data);

              // Handle legacy message format (if any)
              if (data.type === "message" && data.content) {
                setMessages((prev) => [
                  ...prev,
                  { role: "ai", text: data.content, timestamp: Date.now() },
                ]);
              } else if (data.type === "error") {
                console.error("Realtime session error:", data);
                setError(
                  new Error(
                    data.message || "Unknown error from realtime session"
                  )
                );
              }
            } catch (err) {
              console.error("Error parsing message:", err, event.data);
            }
          },

          // Handle text responses from the API
          onTextResponse: (text) => {
            console.log("Received text response:", text);
            setMessages((prev) => {
              // Add a new complete message
              return [...prev, { role: "ai", text, timestamp: Date.now() }];
            });
          },

          // Handle transcriptions from the API
          onTranscription: (transcript) => {
            const eventType = realtimeSessionRef.current?.getLastEventType();
            console.log(
              `[useInterviewSession] Transcription received (${eventType}):`,
              transcript
            );

            // Determine the source based on the event type
            let source: "user" | "ai";

            if (
              eventType ===
              "conversation.item.input_audio_transcription.completed"
            ) {
              source = "user";
              console.log("[useInterviewSession] User transcription detected");
            } else if (eventType === "response.audio_transcript.done") {
              source = "ai";
              console.log("[useInterviewSession] AI transcription detected");
            } else {
              // Default fallback logic
              source = eventType?.includes("input_audio_transcription")
                ? "user"
                : "ai";
              console.log(
                `[useInterviewSession] Using fallback logic for transcription source: ${source}`
              );
            }

            setTranscriptions((prev) => [
              ...prev,
              {
                text: transcript,
                timestamp: Date.now(),
                source,
              },
            ]);
          },

          onConnectionStateChange: (state) => {
            setIsConnected(state === "connected");
            if (
              state === "failed" ||
              state === "disconnected" ||
              state === "closed"
            ) {
              setIsConnecting(false);
            }
          },
          onError: (err) => {
            setError(err);
            setIsConnecting(false);
            setIsConnected(false);
          },
        });

        // Initialize the session
        await realtimeSession.initialize(ephemeralSession);

        // Store the session reference
        realtimeSessionRef.current = realtimeSession;

        // Set the audio element
        setAudioElement(realtimeSession.getAudioElement());

        // Update state
        setIsConnecting(false);
        setIsConnected(true);
        setIsMuted(false);

        // Replace the initial welcome message with the AI's welcome message
        setMessages([
          {
            role: "ai",
            text: `Welcome! I'm your technical interviewer today. I'll be asking you about the ${questionTitle} problem. Please feel free to ask any clarifying questions and outline your approach before you start coding. Good luck!`,
            timestamp: Date.now(),
          },
        ]);

        // Clear previous transcriptions
        setTranscriptions([]);
      } catch (err) {
        console.error("Error connecting to realtime session:", err);
        setError(err instanceof Error ? err : new Error(String(err)));
        setIsConnecting(false);
        setIsConnected(false);
      }
    },
    [isConnected, isConnecting]
  );

  const disconnect = useCallback(() => {
    if (realtimeSessionRef.current) {
      realtimeSessionRef.current.disconnect();
      realtimeSessionRef.current = null;
      setIsConnected(false);
      setAudioElement(null);
      setIsMuted(false);
    }
  }, []);

  const sendMessage = useCallback(
    (message: string, role?: "user" | "system") => {
      if (!realtimeSessionRef.current || !isConnected) {
        setError(new Error("Not connected to realtime session"));
        return;
      }

      // Add message to the list if it's a user message (don't show system messages in the UI)
      if (role !== "system") {
        setMessages((prev) => [
          ...prev,
          { role: "user", text: message, timestamp: Date.now() },
        ]);
      }

      // Send message to the AI with the specified role
      realtimeSessionRef.current.sendMessage(message, role || "user");
    },
    [isConnected]
  );

  const clearTranscriptions = useCallback(() => {
    setTranscriptions([]);
  }, []);

  const toggleMute = useCallback(() => {
    if (!realtimeSessionRef.current || !isConnected) {
      return;
    }

    try {
      // Get the current mute state before toggling
      const currentMuteState = realtimeSessionRef.current.getMuteState();

      // Toggle the mute state in the RealtimeSession
      const success = realtimeSessionRef.current.toggleMute();

      if (success) {
        // Update the UI state with the new (opposite) mute state
        setIsMuted(!currentMuteState);
        console.log(
          `[useInterviewSession] Microphone ${
            !currentMuteState ? "muted" : "unmuted"
          }`
        );
      }
    } catch (error) {
      console.error("Error toggling mute state:", error);
    }
  }, [isConnected]);

  const toggleAutoResponse = useCallback(() => {
    if (!realtimeSessionRef.current || !isConnected) {
      return;
    }

    try {
      // Toggle the auto response setting
      const newAutoResponseState = !autoResponseEnabled;
      const success =
        realtimeSessionRef.current.updateSessionSettings(newAutoResponseState);

      if (success) {
        // Update the UI state
        setAutoResponseEnabled(newAutoResponseState);
        console.log(
          `[useInterviewSession] Auto response ${
            newAutoResponseState ? "enabled" : "disabled"
          }`
        );
      }
    } catch (error) {
      console.error("Error toggling auto response setting:", error);
    }
  }, [isConnected, autoResponseEnabled]);

  return {
    isConnecting,
    isConnected,
    error,
    messages,
    transcriptions,
    connect,
    disconnect,
    sendMessage,
    clearTranscriptions,
    audioElement,
    isMuted,
    toggleMute,
    autoResponseEnabled,
    toggleAutoResponse,
  };
}
