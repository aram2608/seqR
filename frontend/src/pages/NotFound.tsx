import { Link } from "react-router-dom";
import navStyles from "../styles/NavStyles";

export function NotFound() {
  return (
    <div style={{ textAlign: "center", padding: "4rem" }}>
      <h1>404 — Page not found</h1>
      <p>We couldn't find the page you were looking for.</p>
      <p>
        <Link css={navStyles.link} to="/">Go back home</Link>
      </p>
    </div>
  );
}
