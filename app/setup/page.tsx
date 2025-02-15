"use client";

import React from 'react';
import { Box, Button, Typography, RadioGroup, FormControlLabel, Radio, FormControl, FormLabel, Paper } from "@mui/material";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import ProtectedRoute from "../components/ProtectedRoute";
import Header from "../components/Header";

const welcomeText = `
- The interview features an AI interviewer. Please interact with it in the same you would with a human interviewer

- We want to provide an experience as similar as possible to a real interview so we don't allow for choosing a question or topic. This will be available in our 'Training mode' in the future.
`;

export default function SetupPage() {
  const [mode, setMode] = React.useState('interview');
  const [level, setLevel] = React.useState('graduate');

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
            <Box sx={{ mb: 4 }}>
              <FormControl component="fieldset">
                <FormLabel sx={{ color: 'rgb(156, 163, 175)', mb: 1 }}>Mode</FormLabel>
                <RadioGroup
                  value={mode}
                  onChange={(e) => setMode(e.target.value)}
                  row
                >
                  <FormControlLabel
                    value="interview"
                    control={<Radio sx={{ color: 'rgb(156, 163, 175)' }} />}
                    label="Interview"
                    sx={{ color: 'rgb(243, 244, 246)' }}
                  />
                  <FormControlLabel
                    value="training"
                    disabled
                    control={<Radio sx={{ color: 'rgb(156, 163, 175)' }} />}
                    label="Training (Coming Soon)"
                    sx={{ color: 'rgb(156, 163, 175)' }}
                  />
                </RadioGroup>
              </FormControl>
            </Box>

            <Box>
              <FormControl component="fieldset">
                <FormLabel sx={{ color: 'rgb(156, 163, 175)', mb: 1 }}>Level</FormLabel>
                <RadioGroup
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  row
                >
                  <FormControlLabel
                    value="graduate"
                    control={<Radio sx={{ color: 'rgb(156, 163, 175)' }} />}
                    label="Graduate SWE"
                    sx={{ color: 'rgb(243, 244, 246)' }}
                  />
                </RadioGroup>
              </FormControl>
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