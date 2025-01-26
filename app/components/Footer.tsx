import { Button, Box, Dialog, DialogTitle, DialogActions, Tooltip, DialogContent } from "@mui/material";
import { RestartInterviewButton } from "./RestartInterviewButton";
import { useState } from "react";

interface FooterProps {
  onSubmit: () => void;
}

export function Footer({ onSubmit }: FooterProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleConfirm = () => {
    handleCloseDialog();
    onSubmit();
  };

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
      <Tooltip title="Complete the interview and view feedback">
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenDialog}
          sx={{
            width: "180px",
            textTransform: "none",
            fontWeight: "bold",
          }}
        >
          Complete Interview
        </Button>
      </Tooltip>

      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Are you sure you want to terminate the interview?</DialogTitle>
        <DialogContent>Terminating the interview before you have completed it will lead to incomplete feedback. If you feel you have completed the interview, please proceed.</DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            No
          </Button>
          <Button onClick={handleConfirm} color="primary" variant="contained">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
