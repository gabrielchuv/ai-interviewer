"use client";

import { Box, Typography, Paper, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import ProtectedRoute from "../components/ProtectedRoute";
import Header from "../components/Header";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import HistoryIcon from '@mui/icons-material/History';

export default function HomePage() {
  const router = useRouter();

  return (
    <ProtectedRoute>
      <Box sx={{ minHeight: "100vh" }}>
        <Header />
        <Box 
          sx={{ 
            p: 4, 
            pt: "64px",
            display: "flex",
            gap: 4,
            maxWidth: "1200px",
            margin: "0 auto"
          }}
        >
          <Paper
            sx={{
              flex: 1,
              p: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              minHeight: "400px",
              justifyContent: "center",
              gap: 3
            }}
          >
            <PlayArrowIcon sx={{ fontSize: 60, color: "primary.main" }} />
            <Typography variant="h4" sx={{ mb: 2 }}>
              Start Mock Interview
            </Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
              Practice your coding interview skills with our AI interviewer. Get real-time feedback and improve your performance.
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => router.push('/instructions')}
              sx={{
                minWidth: "200px",
                textTransform: "none",
                fontWeight: "bold"
              }}
            >
              Start Interview
            </Button>
          </Paper>

          <Paper
            sx={{
              flex: 1,
              p: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              minHeight: "400px",
              justifyContent: "center",
              gap: 3
            }}
          >
            <HistoryIcon sx={{ fontSize: 60, color: "primary.main" }} />
            <Typography variant="h4" sx={{ mb: 2 }}>
              View Feedback History
            </Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
              Review your past interview performances, track your progress, and identify areas for improvement.
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => router.push('/feedbackHistory')}
              sx={{
                minWidth: "200px",
                textTransform: "none",
                fontWeight: "bold"
              }}
            >
              View History
            </Button>
          </Paper>
        </Box>
      </Box>
    </ProtectedRoute>
  );
} 