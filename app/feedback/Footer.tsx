import { Box } from "@mui/material";
import * as React from "react";
import { RestartInterviewButton } from "../components/RestartInterviewButton";

export const Footer: React.FunctionComponent = () => {
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
    </Box>
  );
};
