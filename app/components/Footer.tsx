import { Button, Box } from "@mui/material";

interface FooterProps {
  isSubmitEnabled: boolean;
  onSubmit: () => void;
  onRestart: () => void;
}

export function Footer({ isSubmitEnabled, onSubmit, onRestart }: FooterProps) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        px: 2,
        pb: 2,
      }}
    >
      <Button
        variant="contained"
        color="inherit"
        sx={{
          width: "180px",
          textTransform: "none",
          fontWeight: "bold",
          marginRight: "8px",
        }}
        onClick={onRestart}
      >
        Restart
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={onSubmit}
        disabled={!isSubmitEnabled}
        sx={{
          width: "180px",
          textTransform: "none",
          fontWeight: "bold",
        }}
      >
        Complete Interview
      </Button>
    </Box>
  );
}
