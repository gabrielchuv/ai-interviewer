'use client';

import { useEffect, useState } from 'react';
import { Box, Typography, Grid, Paper, CircularProgress } from '@mui/material';
import { getFeedback } from '../services/feedback';

interface FeedbackSection {
  rating: number;
  feedback: string[];
}

interface FeedbackData {
  clarification: FeedbackSection;
  approach: FeedbackSection;
  codeQuality: FeedbackSection;
  complexity: FeedbackSection;
}

export default function Feedback() {
  const [feedback, setFeedback] = useState<FeedbackData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const conversation = JSON.parse(localStorage.getItem('interview_conversation') || '[]');
        const code = localStorage.getItem('interview_code') || '';
        
        const feedbackData = await getFeedback(conversation, code);
        setFeedback(feedbackData);

        localStorage.removeItem('interview_conversation');
        localStorage.removeItem('interview_code');
      } catch (error) {
        console.error('Error fetching feedback:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4, height: '100vh', overflow: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Interview Feedback
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ 
            p: 3, 
            height: '300px',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'auto'
          }}>
            <Typography variant="h6">Problem Clarification</Typography>
            <Typography variant="h4" sx={{ my: 2 }}>
              {feedback?.clarification.rating}/5
            </Typography>
            <Typography sx={{ flex: 1, overflow: 'auto' }}>
              {feedback?.clarification.feedback}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ 
            p: 3, 
            height: '300px',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'auto'
          }}>
            <Typography variant="h6">Approach & Planning</Typography>
            <Typography variant="h4" sx={{ my: 2 }}>
              {feedback?.approach.rating}/5
            </Typography>
            <Typography sx={{ flex: 1, overflow: 'auto' }}>
              {feedback?.approach.feedback}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ 
            p: 3, 
            height: '300px',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'auto'
          }}>
            <Typography variant="h6">Implementation & Code Quality</Typography>
            <Typography variant="h4" sx={{ my: 2 }}>
              {feedback?.codeQuality.rating}/5
            </Typography>
            <Typography sx={{ flex: 1, overflow: 'auto' }}>
              {feedback?.codeQuality.feedback}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ 
            p: 3, 
            height: '300px',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'auto'
          }}>
            <Typography variant="h6">Complexity Analysis</Typography>
            <Typography variant="h4" sx={{ my: 2 }}>
              {feedback?.complexity.rating}/5
            </Typography>
            <Typography sx={{ flex: 1, overflow: 'auto' }}>
              {feedback?.complexity.feedback}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
} 