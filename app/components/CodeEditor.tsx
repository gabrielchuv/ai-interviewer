"use client";

import { Box, Typography } from "@mui/material";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { useState, useEffect } from "react";
import { Question } from "../data/questionBank";

interface CodeEditorProps {
  question: Question;
  onCodeChange: (code: string) => void;
}

export function CodeEditor({ question, onCodeChange }: CodeEditorProps) {
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    // Set initial width
    setContainerWidth(window.innerWidth);

    const handleResize = () => {
      setContainerWidth(window.innerWidth);
    };

    // Attach resize event listener
    window.addEventListener("resize", handleResize);

    // Clean up on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Box
      sx={{
        flex: 1,
        padding: 2,
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Code
      </Typography>
      <CodeMirror
        value={question.description}
        height="calc(100vh - 140px)"
        extensions={[javascript()]}
        theme="dark"
        width={containerWidth ? `${containerWidth * 0.6}px` : "100%"}
        onChange={onCodeChange}
      />
    </Box>
  );
}
