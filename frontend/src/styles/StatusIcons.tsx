import { css, keyframes } from "@emotion/react";
import { Loader2, CheckCircle, XCircle } from "lucide-react";

// We make a small union type to represent submission status
export type SubmissionStatus = "idle" | "loading" | "success" | "error";

// This function updates the UI given the status of our request
export const getStatusIcon = (status: SubmissionStatus) => {
  const spin = keyframes`
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    `;
  const iconStyles = {
    loading: css({
      height: "1.5 rem",
      width: "1.5rem",
      color: "#6366f1",
      animation: `${spin} 2s linear infinite`,
    }),
    success: css({
      height: "1.5 rem",
      width: "1.5rem",
      color: "#10b981",
    }),
    error: css({
      height: "1.5 rem",
      width: "1.5rem",
      color: "#ef4444",
    }),
  };

  switch (status) {
    case "loading":
      return <Loader2 css={iconStyles.loading} />;
    case "success":
      return <CheckCircle css={iconStyles.success} />;
    case "error":
      return <XCircle css={iconStyles.error} />;
    default:
      return null;
  }
};
