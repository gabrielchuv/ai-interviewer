import { Tooltip } from "@mui/material";
import { useRouter } from "next/navigation";
import * as React from "react";
import { Button } from "../uiLibrary";

export const RestartInterviewButton: React.FunctionComponent<{
  disabled?: boolean;
}> = ({ disabled }) => {
  const router = useRouter();

  const handleReturnToInstruction = async () => {
    window.speechSynthesis.cancel();

    router.push("/instructions");
  };
  return (
    <Tooltip title="Restart interview, go back to instructions">
      <Button
        variant="secondary"
        style={{
          width: "180px",
          textTransform: "none",
          fontWeight: "bold",
          marginRight: "8px",
        }}
        onClick={handleReturnToInstruction}
        disabled={disabled}
      >
        Restart
      </Button>
    </Tooltip>
  );
};
