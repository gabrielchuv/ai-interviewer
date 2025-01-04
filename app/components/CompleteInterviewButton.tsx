import { Button, Box } from '@mui/material';

interface SubmitButtonProps {
  isEnabled: boolean;
  onSubmit: () => void;
}

export function CompleteInterviewButton({ isEnabled, onSubmit }: SubmitButtonProps) {
  return (
    <Box 
      sx={{ 
        display: 'flex',
        justifyContent: 'flex-end',
        mt: 2,
        height: '40px'
      }}
    >
      <Button 
        variant="contained" 
        color="primary"
        onClick={onSubmit}
        disabled={!isEnabled}
        sx={{ width: '160px' }}
      >
        Complete Interview
      </Button>
    </Box>
  );
} 