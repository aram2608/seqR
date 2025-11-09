/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { Outlet, Link } from "react-router-dom";
import "./index.css";

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


export function App() {
  return (
    <div>
      {/* Navigation between pages */}
      <nav css={navStyles.container}>
        <Link css={navStyles.link} to="/">Home</Link> 
        | <Link css={navStyles.link} to="/data">Submit</Link>
        | <Link css={navStyles.link} to="/about">About</Link> 
      </nav>
      {/* Swapping pages */}
      <div className="page-content">
        <Outlet />
      </div>
      {/* Footer or other persistent elements */}
    </div>
  );
}

export default App;
