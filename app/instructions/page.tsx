"use client";

import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import ProtectedRoute from "../components/ProtectedRoute";
import Header from "../components/Header";

const welcomeText = `
When starting the interview, you will be presented with 2 panes: The AI interviewer and a code editor.

**The AlgoMentor**

This is a chatbot that will simulate a human interviewer. Please interact with it in the same way you would with a human interviewer. Feel free to:
- Ask clarifying questions
- Demonstrate your approach
- Let the AI know when you are ready to start coding
- Let the AI know when you have completed your solution

When the AI interviewer is satisfied with your solution, you will be able to click on the "Complete Interview" button to finish the interview.

**The Code Editor**
- Please code as you would in any other editor. We only support JavaScript for now.
- It contains a timer of 25 minutes. When the timer reaches 0, the interview will be automatically completed.
`;

export default function InstructionsPage() {
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
            AlgoMentor
          </Typography>
          <Box
            sx={{
              padding: "25px 15%",
              textAlign: "left",
              color: "rgb(243, 244, 246)",
              "& p": {
                marginBottom: "1em",
                lineHeight: "1.6",
              },
              "& ul": {
                marginBottom: "1em",
                paddingLeft: "2em",
              },
            }}
          >
            <ReactMarkdown>{welcomeText}</ReactMarkdown>
          </Box>
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
          <Typography
            variant="body1"
            sx={{
              mt: 2,
              color: "rgb(156, 163, 175)",
            }}
          >
            When pressed, the interview will begin, starting a timer of 30
            minutes.
          </Typography>
        </Box>
      </Box>
    </ProtectedRoute>
  );
}
