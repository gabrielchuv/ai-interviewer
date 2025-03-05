import {
  Box,
  Dialog,
  DialogTitle,
  DialogActions,
  Tooltip,
  DialogContent,
} from "@mui/material";
import { useState } from "react";
import { Button } from "../uiLibrary";

interface FooterProps {
  onSubmit: () => void;
  disableComplete?: boolean;
}

export function Footer({
  onSubmit,
  disableComplete,
}: FooterProps) {
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
        pb: 1,
        pt: 1,
      }}
    >
      <Tooltip title="Complete the interview and view feedback">
        <Button
          variant="primary"
          onClick={handleOpenDialog}
          disabled={disableComplete}
        >
          Complete Interview
        </Button>
      </Tooltip>

      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>
          Are you sure you want to terminate the interview?
        </DialogTitle>
        <DialogContent>
          Terminating the interview before you have completed it will lead to
          incomplete feedback. If you feel you have completed the interview,
          please proceed.
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} variant="primary">
            No
          </Button>
          <Button onClick={handleConfirm} variant="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
