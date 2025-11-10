/** @jsx jsx */
import { css, jsx } from "@emotion/react";

const formStyles = {
  form: css({
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  }),
  inputContainer: css({
    backgroundColor: "white",
    padding: "1rem",
    borderRadius: "0.5rem",
    boxShadow:
      "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
  }),
  inputLabel: css({
    display: "block",
    fontSize: "1.125rem",
    fontWeight: "600",
    color: "#374151",
    marginBottom: "0.5rem",
  }),
  textInput: css({
    marginTop: "0.25rem",
    display: "block",
    width: "95%",
    padding: "0.5rem 0.75rem",
    border: "1px solid #d1d5db",
    borderRadius: "0.5rem",
    fontSize: "1rem",
    transition: "all 0.2s ease",
    "&:focus": {
      borderColor: "#4f46e5",
      boxShadow: "0 0 0 3px rgba(79, 70, 229, 0.2)",
      outline: "none",
    },
    "&:disabled": {
      backgroundColor: "#f3f4f6",
      cursor: "not-allowed",
    },
  }),
  fileGrid: css({
    display: "grid",
    gap: "1.5rem",
    "@media (min-width: 768px)": {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
  }),
  submitContainer: css({
    paddingTop: "1rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  }),
  statusDisplay: css({
    minHeight: "2rem",
    display: "flex",
    alignItems: "center",
    padding: "0.5rem",
  }),
};

export default formStyles;
