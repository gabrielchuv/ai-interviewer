import { Button, Box } from "@mui/material";
import { RestartInterviewButton } from "./RestartInterviewButton";

interface FooterProps {
  isSubmitEnabled: boolean;
  onSubmit: () => void;
}

export function Footer({ isSubmitEnabled, onSubmit }: FooterProps) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        px: 2,
        pb: 2,
      }}
    >
      <RestartInterviewButton />
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
