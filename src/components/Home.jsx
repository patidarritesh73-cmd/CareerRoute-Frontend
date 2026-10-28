
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-page">
      <section className="hero">
        <h1>Welcome to CareerConnect</h1>

        <p>
          Manage job opportunities and candidates in one place.
        </p>

        <div className="home-actions">
          <Link to="/jobs">Explore Jobs</Link>
          {" | "}
          <Link to="/candidates">View Candidates</Link>
          {" | "}
          <Link to="/dashboard">Dashboard</Link>
        </div>
      </section>

      <section className="home-features">
        <h2>What You Can Do</h2>

        <ul>
          <li>Browse and search job opportunities.</li>
          <li>Add, edit, and delete job listings.</li>
          <li>Manage candidate profiles.</li>
          <li>View job and candidate statistics.</li>
        </ul>
      </section>
    </div>
  );
}

export default Home;

