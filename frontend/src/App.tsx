import { Outlet, Link } from "react-router-dom";
import navStyles from "./styles/NavStyles";
import "./index.css";

export function App() {
  return (
    <div>
      {/* Navigation between pages */}
      <nav css={navStyles.container}>
        <Link css={navStyles.link} to="/">
          Home
        </Link>
        |{" "}
        <Link css={navStyles.link} to="/data">
          Submit
        </Link>
        |{" "}
        <Link css={navStyles.link} to="/about">
          About
        </Link>
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
