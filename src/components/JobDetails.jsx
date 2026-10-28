
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getJobById } from "../services/jobService";

function JobDetails() {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isActive = true;

    async function loadJob() {
      setLoading(true);
      setError("");
      setJob(null);

      try {
        const data = await getJobById(jobId);

        if (isActive) {
          setJob(data);
        }
      } catch (err) {
        if (isActive) {
          setError(err.message || "Failed to load job.");
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    }

    loadJob();

    return () => {
      isActive = false;
    };
  }, [jobId]);

  function handleApply() {
  navigate(
    `/candidates/new?position=${encodeURIComponent(job.title)}`
  );
}

  if (loading) {
    return <p>Loading job details...</p>;
  }

  if (error) {
    return (
      <div>
        <p>{error}</p>
        <Link to="/jobs">Back to Jobs</Link>
      </div>
    );
  }

  if (!job) {
  return (
    <div>
      <p>Job not found.</p>
      <Link to="/jobs">Back to Jobs</Link>
    </div>
  );
}

  return (
    <div className="job-details">
      <h1>{job.title}</h1>

      <p>Company: {job.company}</p>
      <p>Location: {job.location}</p>
      <p>Employment Type: {job.employmentType}</p>
      <p>Experience: {job.experience}</p>
      <p>Salary: {job.salary}</p>
      <p>Skills: {job.skills?.join(", ")}</p>
      <p>Description: {job.description}</p>

      <button onClick={handleApply}>Apply for Job</button>

      <p>
        <Link to="/jobs">Back to Jobs</Link>
      </p>
    </div>
  );
}

export default JobDetails;
