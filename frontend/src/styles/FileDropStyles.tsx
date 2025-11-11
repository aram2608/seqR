/** @jsx jsx */
/** @jsxFrag */
import { css, jsx } from "@emotion/react";

export const fileDropZoneStyles = {
  container: css({
    backgroundColor: "white",
    padding: "1.5rem",
    borderRadius: "0.75rem",
    boxShadow:
      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.06)",
    border: "1px solid #e5e7eb",
  }),
  mainLabel: css({
    display: "block",
    fontSize: "1.125rem",
    fontWeight: "600",
    color: "#374151",
    marginBottom: "0.75rem",
  }),
  contentWrapper: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "1.25rem",
    paddingBottom: "1.5rem",
  }),
  textBase: css({
    marginBottom: "0.5rem",
    fontSize: "0.875rem",
    color: "#6b7280",
  }),
  subtext: css({
    fontSize: "0.75rem",
    color: "#6b7280",
  }),
  hiddenInput: css({
    display: "none",
  }),
};

// Dynamic drop zone styles
export const dropZoneDynamicStyles = (file: File | null, disabled: boolean) =>
  css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "8rem",
    borderWidth: "2px",
    borderRadius: "0.75rem",
    cursor: "pointer",
    transition: "all 300ms ease",

    // We evaulate if the the button is disabled and only
    // spread the values if true
    ...(disabled && {
      opacity: 0.6,
      cursor: "not-allowed",
    }),

    // We do the same here but if the file is not input
    ...(!file && {
      borderStyle: "dashed",
      borderColor: "#d1d5db",
      backgroundColor: "#f9fafb",
      "&:hover": {
        borderColor: "#4f46e5",
        backgroundColor: "#eef2ff",
      },
    }),

    // This is the second conditional catch for if the file is uploaded
    ...(file && {
      borderColor: "#4ade80",
      backgroundColor: "#f0fdf4",
    }),
  });

// We use some icons from lucide-react so we update given the file status
export const iconDynamicStyles = (file: File | null) =>
  css({
    width: "2rem",
    height: "2rem",
    marginBottom: "0.5rem",
    color: file ? "#16a34a" : "#9ca3af",
  });

// Style for the selected file text
export const fileSelectedTextStyles = css({
  fontWeight: "600",
  color: "#16a34a",
});
