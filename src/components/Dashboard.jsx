import { useEffect, useState } from "react";
import { getJobs } from "../services/jobService";
import { getCandidates } from "../services/candidateService";
import { Link } from "react-router-dom";
function Dashboard() {
  const [jobs, setJobs] = useState([]);
const [candidates, setCandidates] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  async function loadDashboard() {
    try {
      const jobsData = await getJobs();
      const candidatesData = await getCandidates();

      setJobs(jobsData);
      setCandidates(candidatesData);
    } catch (error) {
      console.error("Failed to load dashboard:", error);
    } finally {
      setLoading(false);
    }
  }

  loadDashboard();
}, []);

  return (
  <div>
    <h1>Dashboard</h1>

    {loading ? (
      <p>Loading dashboard...</p>
    ) : (
      <>
        <div className="dashboard-stats">
          <div className="stat-card">
            <h2>Total Jobs</h2>
            <p>{jobs.length}</p>
          </div>

          <div className="stat-card">
            <h2>Total Candidates</h2>
            <p>{candidates.length}</p>
          </div>
        </div>
        
        <div className="dashboard-links">
  <h2>Quick Actions</h2>

  <Link to="/jobs">View Jobs</Link>
  {" | "}
  <Link to="/candidates">View Candidates</Link>
</div>
      </>
    )}
  </div>
);
}

export default Dashboard;
