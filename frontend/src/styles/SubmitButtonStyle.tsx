/** @jsx jsx */
import { css, jsx } from "@emotion/react";

const submitButtonStyle = (isSubmitting: boolean, isDisabled: boolean) =>
  css({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0.75rem 1.5rem",
    fontWeight: 600,
    borderRadius: "0.5rem",
    transition: "all 0.2s ease",
    boxShadow:
      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.06)",
    // We test if either the button is disabled or if we are submitting and
    // copy the result into the function
    ...(isDisabled || isSubmitting
      ? {
          backgroundColor: "#9ca3af",
          color: "#f9fafb",
          cursor: "not-allowed",
        }
      : {
          backgroundColor: "#4f46e5",
          color: "white",
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "#4338ca",
            transform: "scale(1.01)",
          },
          "&:focus": {
            outline: "none",
            boxShadow: "0 0 0 4px rgba(79, 70, 229, 0.5)",
          },
        }),
  });

export default submitButtonStyle;
