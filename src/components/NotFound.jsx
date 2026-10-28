
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="not-found-page">
      <h1>404 - Page Not Found</h1>

      <p>Sorry, the page you are looking for does not exist.</p>

      <Link to="/">Go to Home</Link>
      {" | "}
      <Link to="/jobs">Explore Jobs</Link>
    </div>
  );
}

export default NotFound;

