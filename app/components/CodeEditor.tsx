"use client";

import { Box, Typography, Stack } from "@mui/material";
import CodeMirror from "@uiw/react-codemirror";
import { useState, useEffect } from "react";
import { Question } from "../data/questionBank";
import { LanguageSelector, ProgrammingLanguage, LANGUAGES } from "./LanguageSelector";

const INSTRUCTION = "Write your solution below:";

interface CodeEditorProps {
  question: Question;
  onCodeChange: (code: string) => void;
}

export function CodeEditor({ question, onCodeChange }: CodeEditorProps) {
  const [containerWidth, setContainerWidth] = useState(0);
  const [language, setLanguage] = useState<ProgrammingLanguage>(LANGUAGES[0]);

  const handleLanguageChange = (selectedLanguage: ProgrammingLanguage) => {
    setLanguage(selectedLanguage);
  };

  const getFormattedValue = () => {
    return `${language.commentStart}
${question.description}

${INSTRUCTION}
${language.commentEnd}`;
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
      <Stack 
        direction="row" 
        spacing={2} 
        alignItems="center" 
        sx={{ marginBottom: 1 }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "rgb(96, 165, 250)", // text-blue-400
            fontWeight: "bold",
            marginBottom: 0,
          }}
        >
          Code
        </Typography>
        <LanguageSelector
          selectedLanguage={language.value}
          onLanguageChange={handleLanguageChange}
        />
      </Stack>
      <CodeMirror
        style={{ padding: 0, marginTop: 0 }}
        value={getFormattedValue()}
        height="calc(100vh - 170px)"
        extensions={[language.extension()]}
        theme="dark"
        width={containerWidth ? `${containerWidth * 0.7}px` : "100%"}
        onChange={onCodeChange}
      />
    </Box>
  );
}
