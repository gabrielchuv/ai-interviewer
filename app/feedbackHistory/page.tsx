"use client";

import { useEffect, useState } from "react";
import { Box, Typography, Paper, CircularProgress, Button, Alert } from "@mui/material";
import { getUserFeedback } from "../services/firebase";
import ProtectedRoute from "../components/ProtectedRoute";
import Header from "../components/Header";
import { Footer } from "../feedback/Footer";

interface FeedbackHistoryEntry {
  id: string;
  date: string;
  overallScore: number;
  userId: string;
  userEmail: string;
  timestamp: Date;
}

export default function FeedbackHistoryPage() {
  const [feedbackHistory, setFeedbackHistory] = useState<FeedbackHistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeedbackHistory = async () => {
      try {
        setError(null);
        const history = await getUserFeedback();
        setFeedbackHistory(history as FeedbackHistoryEntry[]);
      } catch (error) {
        console.error("Error fetching feedback history:", error);
        setError("Failed to load feedback history. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbackHistory();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <ProtectedRoute>
      <Box sx={{ minHeight: "100vh" }}>
        <Header />
        <Box sx={{ p: 4, pt: "44px" }}>
          <Typography variant="h4" sx={{ mb: 4, textAlign: "center" }}>
            Feedback History
          </Typography>
          
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {!error && feedbackHistory.map((entry) => (
            <Paper
              key={entry.id}
              sx={{
                p: 3,
                mb: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
              }}
            >
              <Typography variant="h6" sx={{ flex: 1 }}>
                {entry.date}
              </Typography>
              <Typography variant="h6" sx={{ flex: 1, textAlign: "center" }}>
                Overall Score: {entry.overallScore}/5
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ flex: 0 }}
              >
                View Details
              </Button>
            </Paper>
          ))}
          
          {!error && feedbackHistory.length === 0 && (
            <Typography variant="h6" sx={{ textAlign: "center", mt: 4 }}>
              No feedback history available
            </Typography>
          )}
        </Box>
      </Box>
    </ProtectedRoute>
  );
} 