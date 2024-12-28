'use client';

import { Box, Button, Typography } from '@mui/material';
import Link from 'next/link';

export default function Home() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{ height: '100vh', gap: 3 }}
    >
      <Link href="/interview" style={{ textDecoration: 'none' }}>
        <Button 
          variant="contained" 
          size="large"
          sx={{ 
            fontSize: '1.2rem',
            padding: '12px 40px',
          }}
        >
          Start Interview
        </Button>
      </Link>
      <Typography 
        variant="body1" 
        color="text.secondary"
        sx={{ mt: 2 }}
      >
        When pressed, the interview will begin, starting a timer of 20 minutes.
      </Typography>
    </Box>
  );
}
