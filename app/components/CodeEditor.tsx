"use client";

import { Box, Typography } from "@mui/material";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { useState, useEffect } from "react";
import { Question } from "../data/questionBank";

const INSTRUCTION = "Write your solution below:";

interface CodeEditorProps {
  question: Question;
  onCodeChange: (code: string) => void;
}

export function CodeEditor({ question, onCodeChange }: CodeEditorProps) {
  const [containerWidth, setContainerWidth] = useState(0);

  const getFormattedValue = () => {
    return `/*
${question.description}

${question.examples}

${INSTRUCTION}
*/`;
  };

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
        paddingBottom: 0.5,
        marginTop: 0,
        paddingLeft: 2,
        paddingRight: 2,
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          color: "rgb(96, 165, 250)", // text-blue-400
          fontWeight: "bold",
          marginBottom: 0,
        }}
      >
        Code
      </Typography>
      <CodeMirror
        style={{ padding: 0, marginTop: 0 }}
        value={getFormattedValue()}
        height="calc(100vh - 170px)"
        extensions={[javascript()]}
        theme="dark"
        width={containerWidth ? `${containerWidth * 0.7}px` : "100%"}
        onChange={onCodeChange}
      />
    </Box>
  );
}
