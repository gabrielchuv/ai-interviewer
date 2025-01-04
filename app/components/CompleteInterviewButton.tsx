import { Button, Box } from '@mui/material';

interface CompleteInterviewButtonProps {
  isEnabled: boolean;
  onSubmit: () => void;
}

export function CompleteInterviewButton({ isEnabled, onSubmit }: CompleteInterviewButtonProps) {
  return (
    <Box 
      sx={{ 
        display: 'flex',
        justifyContent: 'flex-end',
        px: 2,
        pb: 2,
      }}
    >
      <Button 
        variant="contained" 
        color="primary"
        onClick={onSubmit}
        disabled={!isEnabled}
        sx={{ 
          width: '180px',
          textTransform: 'none',
          fontWeight: 'bold'
        }}
      >
        Complete Interview
      </Button>
    </Box>
  );
} 