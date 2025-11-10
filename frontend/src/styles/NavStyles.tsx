/** @jsx jsx */
import { css, jsx } from "@emotion/react";

const navStyles = {
  container: css({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1c1b29",
    padding: "1rem 0",
    borderBottom: "1px solid #2d2b45",
    marginBottom: "2rem",
  }),
  link: css({
    fontWeight: 500,
    color: "#e0e0ff",
    padding: "0.5rem 1rem",
    borderRadius: "0.375rem",
    transition: "all 0.2s ease",
    margin: "0 0.5rem",
    "&:hover": {
      color: "#ffffff",
      backgroundColor: "#3f3cbb",
    },
    "&[aria-current='page'], &:active": {
      color: "#c7d2fe",
      fontWeight: 700,
      backgroundColor: "#312e81",
      borderBottom: "2px solid #6366f1",
    },
  }),
};

export default navStyles;