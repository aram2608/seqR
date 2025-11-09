import { Outlet, Link } from "react-router-dom";
import "./index.css";

export function App() {
  return (
    <div className="app">
      {/* Navigation between pages */}
      <nav>
        <Link to="/">Home</Link> | <Link to="/about">About</Link> | <Link to="/submit">Submit</Link>
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
