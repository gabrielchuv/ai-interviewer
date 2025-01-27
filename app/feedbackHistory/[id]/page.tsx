"use client";

import { useEffect, useState } from "react";
import { Box, Typography, Grid, Paper, CircularProgress } from "@mui/material";
import ReactMarkdown from "react-markdown";
import ProtectedRoute from "../../components/ProtectedRoute";
import Header from "../../components/Header";
import { Footer } from "../../feedback/Footer";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";

interface FeedbackSection {
  rating: number;
  feedback: string;
}

interface FeedbackData {
  date: string;
  overallScore: number;
  clarification: FeedbackSection;
  approach: FeedbackSection;
  codeQuality: FeedbackSection;
  complexity: FeedbackSection;
}

export default function FeedbackDetailsPage() {
  const params = useParams();
  const [feedback, setFeedback] = useState<FeedbackData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeedbackDetails = async () => {
      try {
        const feedbackDoc = await getDoc(doc(db, 'feedback', params.id as string));
        if (!feedbackDoc.exists()) {
          setError('Feedback not found');
          return;
        }
        setFeedback(feedbackDoc.data() as FeedbackData);
      } catch (error) {
        console.error('Error fetching feedback details:', error);
        setError('Failed to load feedback details');
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbackDetails();
  }, [params.id]);

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

  if (error || !feedback) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h6" color="error">
          {error || 'Failed to load feedback'}
        </Typography>
      </Box>
    );
  }

  return (
    <ProtectedRoute>
      <Box sx={{ minHeight: "100vh" }}>
        <Header />
        <Box sx={{ p: 4, pt: "44px" }}>
          <Typography variant="h4" sx={{ mb: 4, textAlign: "center" }}>
            Interview Feedback - {feedback.date}
          </Typography>
          <Paper sx={{ p: 3, mb: 4, textAlign: "center" }}>
            <Typography variant="h6">Overall Score</Typography>
            <Typography variant="h3" sx={{ my: 2 }}>
              {feedback.overallScore}/5
            </Typography>
          </Paper>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper
                sx={{
                  p: 3,
                  height: "300px",
                  display: "flex",
                  flexDirection: "column",
                  overflow: "auto",
                }}
              >
                <Typography variant="h6">Problem Clarification</Typography>
                <Typography variant="h4" sx={{ my: 2 }}>
                  {feedback.clarification.rating}/5
                </Typography>
                <Box sx={{ flex: 1, overflow: "auto" }}>
                  <ReactMarkdown>
                    {feedback.clarification.feedback}
                  </ReactMarkdown>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper
                sx={{
                  p: 3,
                  height: "300px",
                  display: "flex",
                  flexDirection: "column",
                  overflow: "auto",
                }}
              >
                <Typography variant="h6">Approach & Planning</Typography>
                <Typography variant="h4" sx={{ my: 2 }}>
                  {feedback.approach.rating}/5
                </Typography>
                <Box sx={{ flex: 1, overflow: "auto" }}>
                  <ReactMarkdown>{feedback.approach.feedback}</ReactMarkdown>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper
                sx={{
                  p: 3,
                  height: "300px",
                  display: "flex",
                  flexDirection: "column",
                  overflow: "auto",
                }}
              >
                <Typography variant="h6">
                  Implementation & Code Quality
                </Typography>
                <Typography variant="h4" sx={{ my: 2 }}>
                  {feedback.codeQuality.rating}/5
                </Typography>
                <Box sx={{ flex: 1, overflow: "auto" }}>
                  <ReactMarkdown>
                    {feedback.codeQuality.feedback}
                  </ReactMarkdown>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper
                sx={{
                  p: 3,
                  height: "300px",
                  display: "flex",
                  flexDirection: "column",
                  overflow: "auto",
                }}
              >
                <Typography variant="h6">Complexity Analysis</Typography>
                <Typography variant="h4" sx={{ my: 2 }}>
                  {feedback.complexity.rating}/5
                </Typography>
                <Box sx={{ flex: 1, overflow: "auto" }}>
                  <ReactMarkdown>{feedback.complexity.feedback}</ReactMarkdown>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </ProtectedRoute>
  );
} 