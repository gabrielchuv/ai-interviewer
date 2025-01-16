import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import ReactMarkdown from 'react-markdown';

const welcomeText = `
When starting the interview, you will be presented with 2 panes: The AI interviewer and a code editor.

**The AI Interviewer**

This is a chatbot that will simulate a human interviewer. Please interact with it in the same way you would with a human interviewer but via text only (for now). Feel free to:
- Ask clarifying questions
- Demonstrate your approach
- Let the AI know when you are ready to start coding
- Let the AI know when you have completed your solution

When the AI interviewer is satisfied with your solution, you will be able to click on the "Complete Interview" button to finish the interview.

**The Code Editor**
- Please code as you would in any other editor. We only support JavaScript for now.
- It contains a timer of 30 minutes. When the timer reaches 0, the interview will be automatically completed.
`;

export default function Home() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{ height: "100vh", gap: 3 }}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{ height: "100vh", gap: 3 }}
      >
        <Typography variant="h1">AI Interviewer</Typography>
        <Box
          sx={{
            padding: "25px 15%",
            textAlign: "left",
            '& p': { 
              marginBottom: '1em',
              lineHeight: '1.6'
            },
            '& ul': { 
              marginBottom: '1em',
              paddingLeft: '2em'
            }
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
            }}
          >
            Start Interview
          </Button>
        </Link>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
          When pressed, the interview will begin, starting a timer of 30
          minutes.
        </Typography>
      </Box>
    </Box>
  );
} 