"use client";

import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";

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
        <Typography
          style={{
            paddingTop: "25px",
            paddingBottom: "25px",
            textAlign: "center",
            paddingLeft: "15%",
            paddingRight: "15%",
          }}
        >
          When starting the interview, you will be presented with 2 panes: the
          AI interviewer (a chatbot) and a code editor. Regarding the AI
          interviewer, please interact with it in the same way you would with a
          human interviewer but via text only (for now). Feel free to ask
          clarifying questions, demonstrate your approach, explain your
          decisions etc. The more interactions you have with the AI interviewer,
          the more data points it will have to provide you with a better
          evaluation. Regarding the code editor, please select your language of
          choice and write code as you would in any other editor. Once done,
          you can submit it.
        </Typography>
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
