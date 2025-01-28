import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from "@mui/material";

interface ButtonProps extends Omit<MuiButtonProps, "variant"> {
  variant?: "primary" | "secondary";
}

const getButtonStyles = (
  variant: "primary" | "secondary" = "primary"
): MuiButtonProps["sx"] => {
  const baseStyle = {
    height: "2.5rem",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    whiteSpace: "nowrap",
    borderRadius: "0.375rem", // rounded-md
    fontWeight: 500,
    fontSize: "1.125rem",
    lineHeight: "1.75rem",
    padding: "0.5rem 1rem",
    textTransform: "none",
    transition: "all 200ms",
  };

  const variants = {
    primary: {
      backgroundColor: "rgb(37, 99, 235)", // bg-blue-600
      color: "rgb(255, 255, 255)", // text-white
      "&:hover": {
        backgroundColor: "rgb(29, 78, 216)", // bg-blue-700
      },
    },
    secondary: {
      backgroundColor: "rgb(126, 34, 206)", // purple-700
      color: "rgb(255, 255, 255)", // text-white
      "&:hover": {
        backgroundColor: "rgb(107, 33, 168)", // purple-800
      },
    },
  };

  return {
    ...baseStyle,
    ...variants[variant],
  };
};

export const Button: React.FunctionComponent<ButtonProps> = ({
  variant = "primary",
  children,
  ...props
}) => {
  return (
    <MuiButton sx={getButtonStyles(variant)} {...props}>
      {children}
    </MuiButton>
  );
};
