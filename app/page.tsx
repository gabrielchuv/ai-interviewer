import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import ReactMarkdown from 'react-markdown';

const welcomeText = `
When starting the interview, you will be presented with **2 panes**:
- The AI interviewer (a chatbot)
- A code editor

Regarding the AI interviewer, please interact with it in the same way you would with a human interviewer but via text only (for now). Feel free to:
- Ask clarifying questions
- Demonstrate your approach
- Explain your decisions

The more interactions you have with the AI interviewer, the more data points it will have to provide you with a better evaluation.

Regarding the code editor, please select your language of choice and write code as you would in any other editor. Once done, you can submit it.
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
          When pressed, the interview will begin, starting a timer of 20
          minutes.
        </Typography>
      </Box>
    </Box>
  );
}
