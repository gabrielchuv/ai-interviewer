"use client";

import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Paper } from "@mui/material";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import ProtectedRoute from "../components/ProtectedRoute";
import Header from "../components/Header";
import { getUserInterviewsRemaining, decrementInterviewsRemaining } from "../services/firebase";

const expectationsText = `
## What to expect during your interview:

- **Assessment focus**: You'll be evaluated on your approach and thinking process, not perfect syntax.

- **Ask questions**: Feel free to ask clarifying questions to understand the requirements better.

- **Outline your approach**: Before coding, explain your approach to the problem.

- **Review your code**: When you've finished coding, click the "Review Code" button to proceed with the interview.

- **Coding in silence**: No need to talk through your solution while coding (yet) - you can mute yourself during this part if preferred.

- **Feedback**: After completing the interview, you'll receive feedback on your performance.
`;

const noCreditsText = `
## You need interview credits to continue

You currently have no interview credits remaining. Please purchase credits to continue using AlgoMentor.
`;

export default function SetupPage() {
  const router = useRouter();
  const [interviewsRemaining, setInterviewsRemaining] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [startingInterview, setStartingInterview] = useState(false);

  useEffect(() => {
    const fetchInterviewsRemaining = async () => {
      try {
        const count = await getUserInterviewsRemaining();
        setInterviewsRemaining(count);
      } catch (error) {
        console.error("Error fetching interviews remaining:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInterviewsRemaining();
  }, []);

  const handleStartInterview = async () => {
    if (interviewsRemaining && interviewsRemaining > 0) {
      setStartingInterview(true);
      try {
        // Decrement the interview count
        const success = await decrementInterviewsRemaining();
        if (success) {
          // Set access token for the interview page
          localStorage.setItem('interview_access', 'granted');
          
          // Navigate to the interview page
          router.push('/interview');
        } else {
          // Failed to decrement interview count
          setStartingInterview(false);
          alert("Error starting interview. Please try again.");
        }
      } catch (error) {
        console.error("Error starting interview:", error);
        setStartingInterview(false);
        alert("Error starting interview. Please try again.");
      }
    } else {
      // Redirect to pricing page if no interviews remaining
      router.push('/pricing');
    }
  };

  return (
    <ProtectedRoute>
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(to bottom, #1f2937, #111827)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Header />
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            px: 3,
            py: 6,
          }}
        >
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              marginBottom: 4,
              fontWeight: 700,
              textAlign: "center",
              background: "linear-gradient(45deg, #60A5FA, #A78BFA)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            Interview Preparation
          </Typography>

          {loading ? (
            <div className="animate-spin h-12 w-12 border-b-2 border-blue-400 rounded-full"></div>
          ) : interviewsRemaining && interviewsRemaining > 0 ? (
            <>
              <div className="mb-6 px-4 py-2 bg-blue-900/30 border border-blue-500/30 rounded-lg text-center">
                <span className="text-gray-300">
                  You have <span className="font-bold text-blue-400">{interviewsRemaining}</span> interview{interviewsRemaining !== 1 ? 's' : ''} remaining
                </span>
              </div>

              <Paper 
                elevation={0}
                sx={{ 
                  p: 3, 
                  mb: 4, 
                  width: '100%', 
                  maxWidth: '600px',
                  bgcolor: 'rgba(31, 41, 55, 0.5)',
                  border: '1px solid rgba(75, 85, 99, 0.5)'
                }}
              >
                <Box
                  sx={{
                    color: "rgb(243, 244, 246)",
                    "& p": {
                      marginBottom: "1em",
                      lineHeight: "1.6",
                    },
                    "& ul": {
                      marginBottom: "1em",
                      paddingLeft: "2em",
                    },
                    "& li": {
                      marginBottom: "0.5em",
                    },
                    "& h2": {
                      color: "rgb(156, 163, 175)",
                      marginBottom: "1em",
                      fontSize: "1.5rem",
                    },
                    "& strong": {
                      color: "#60A5FA",
                    }
                  }}
                >
                  <ReactMarkdown>{expectationsText}</ReactMarkdown>
                </Box>
              </Paper>

              <Button
                variant="contained"
                size="large"
                disabled={startingInterview}
                onClick={handleStartInterview}
                sx={{
                  fontSize: "1.2rem",
                  padding: "12px 40px",
                  background: "rgb(37, 99, 235)",
                  "&:hover": {
                    background: "rgb(29, 78, 216)",
                  },
                  "&:disabled": {
                    opacity: 0.7,
                    color: "white",
                  }
                }}
              >
                {startingInterview ? (
                  <>
                    <span className="mr-2 animate-spin inline-block h-5 w-5 border-b-2 border-white rounded-full"></span>
                    Starting...
                  </>
                ) : (
                  "Start Interview"
                )}
              </Button>
            </>
          ) : (
            <>
              <Paper 
                elevation={0}
                sx={{ 
                  p: 3, 
                  mb: 4, 
                  width: '100%', 
                  maxWidth: '600px',
                  bgcolor: 'rgba(31, 41, 55, 0.5)',
                  border: '1px solid rgba(75, 85, 99, 0.5)'
                }}
              >
                <Box
                  sx={{
                    color: "rgb(243, 244, 246)",
                    "& p": {
                      marginBottom: "1em",
                      lineHeight: "1.6",
                    },
                    "& ul": {
                      marginBottom: "1em",
                      paddingLeft: "2em",
                    },
                    "& li": {
                      marginBottom: "0.5em",
                    },
                    "& h2": {
                      color: "rgb(239, 68, 68)",
                      marginBottom: "1em",
                      fontSize: "1.5rem",
                    },
                    "& strong": {
                      color: "#60A5FA",
                    }
                  }}
                >
                  <ReactMarkdown>{noCreditsText}</ReactMarkdown>
                </Box>
              </Paper>

              <Button
                variant="contained"
                size="large"
                onClick={() => router.push('/pricing')}
                sx={{
                  fontSize: "1.2rem",
                  padding: "12px 40px",
                  background: "rgb(37, 99, 235)",
                  "&:hover": {
                    background: "rgb(29, 78, 216)",
                  },
                }}
              >
                Buy Interview Credits
              </Button>
            </>
          )}
        </Box>
      </Box>
    </ProtectedRoute>
  );
} 