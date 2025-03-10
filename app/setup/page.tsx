"use client";

import React from 'react';
import { Box, Button, Typography, Paper } from "@mui/material";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import ProtectedRoute from "../components/ProtectedRoute";
import Header from "../components/Header";

const welcomeText = `
Welcome to your technical interview! This experience is designed to simulate a real coding interview with an AI interviewer.
`;

const expectationsText = `
## What to expect during your interview:

- **Assessment focus**: You'll be evaluated on your approach and thinking process, not perfect syntax.

- **Ask questions**: Feel free to ask clarifying questions to understand the requirements better.

- **Outline your approach**: Before coding, explain your approach to the problem.

- **Review your code**: When you've finished coding, click the "Review Code" button to proceed with the interview.

- **Coding in silence**: No need to talk through your solution while coding (yet) - you can mute yourself during this part if preferred.

- **Feedback**: After completing the interview, you'll receive feedback on your performance.
`;

export default function SetupPage() {
  return (
    <ProtectedRoute>
      <Box sx={{ minHeight: "100vh", bgcolor: "rgb(17, 24, 39)" }}>
        <Header />
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          sx={{ minHeight: "100vh", pt: "64px" }}
        >
          <Typography
            variant="h1"
            sx={{
              background: "linear-gradient(to right, #60A5FA, #A78BFA)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              fontWeight: "bold",
              marginBottom: "1.5rem",
            }}
          >
            Setup
          </Typography>
          <Box
            sx={{
              padding: "25px 0",
              textAlign: "left",
              color: "rgb(243, 244, 246)",
              width: '100%',
              maxWidth: '600px',
              "& p": {
                marginBottom: "1em",
                lineHeight: "1.6",
              },
              "& ul": {
                marginBottom: "1em",
                paddingLeft: "2em",
              },
              "& h2": {
                color: "rgb(156, 163, 175)",
                marginBottom: "1em",
                fontSize: "1.5rem",
              },
            }}
          >
            <ReactMarkdown>{welcomeText}</ReactMarkdown>
          </Box>

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

          <Link href="/interview" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              size="large"
              sx={{
                fontSize: "1.2rem",
                padding: "12px 40px",
                background: "rgb(37, 99, 235)",
                "&:hover": {
                  background: "rgb(29, 78, 216)",
                },
              }}
            >
              Start Interview
            </Button>
          </Link>
        </Box>
      </Box>
    </ProtectedRoute>
  );
} 