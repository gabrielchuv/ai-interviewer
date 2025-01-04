'use client';

import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

interface TimerProps {
  onTimeUp: () => void;
}

export const Timer = ({ onTimeUp }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState(20 * 60); // 20 minutes in seconds

  useEffect(() => {
    console.log('timeLeft', timeLeft);
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
  }, [timeLeft]);

  return (
    <Box
      position="absolute"
      top={16}
      right={16}
      zIndex={1000}
    >
      <Typography
        variant="h4"
        sx={{
          fontFamily: 'monospace',
          fontWeight: 'bold',
          color: 'text.primary'
        }}
      >
        {formatTime(timeLeft)}
      </Typography>
    </Box>
  );
}; 