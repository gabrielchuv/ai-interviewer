"use client";

import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;
};

interface TimerProps {
  onTimeUp: () => void;
}

export const Timer = ({ onTimeUp }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 20 minutes in seconds

  useEffect(() => {
    if (timeLeft === 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onTimeUp, timeLeft]);

  return (
    <Box position="absolute" top={0} right={16} zIndex={1000}>
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
        {formatTime(timeLeft)}
      </Typography>
    </Box>
  );
};
