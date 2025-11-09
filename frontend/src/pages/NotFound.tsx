// src/pages/NotFound.tsx
import { Link } from "react-router-dom";

export function NotFound() {
    return (
        <div style={{ textAlign: "center", padding: "4rem" }}>
            <h1>404 — Page not found</h1>
            <p>We couldn't find the page you were looking for.</p>
                <p>
                    <Link to="/">Go back home</Link>
                </p>
        </div>
    );
}