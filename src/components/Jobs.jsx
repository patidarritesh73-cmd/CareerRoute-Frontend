import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import JobCard from "./JobCard";
import { deleteJob, getJobs } from "../services/jobService";
function Jobs() {
  const [jobs, setJobs] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");
const [deletingJobId, setDeletingJobId] = useState(null);
const [deleteError, setDeleteError] = useState("");

useEffect(() => {
  async function fetchJobs() {
    try {
      setLoading(true);
      setError("");

      const data = await getJobs();
      setJobs(data);
    } catch (err) {
      setError(err.message || "Failed to load jobs.");
    } finally {
      setLoading(false);
    }
  }

  fetchJobs();
}, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("ALL");

  async function handleDeleteJob(jobId) {
  const confirmed = window.confirm(
    "Are you sure you want to delete this job?"
  );

  if (!confirmed) {
    return;
  }

  try {
    setDeletingJobId(jobId);
    setDeleteError("");

    await deleteJob(jobId);

    const updatedJobs = await getJobs();
    setJobs(updatedJobs);
  } catch (error) {
    setDeleteError(error.message || "Failed to delete job.");
  } finally {
    setDeletingJobId(null);
  }
}

  const filteredJobs = jobs.filter((job) => {
    const title = (job.title || "").toLowerCase();
    const company = (job.company || "").toLowerCase();
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      title.includes(search) || company.includes(search);

    const matchesLocation =
      selectedLocation === "ALL" ||
      job.location === selectedLocation;

    return matchesSearch && matchesLocation;
  });

  return (
    <div>
      <h1>Available Jobs</h1>

      <Link to="/jobs/new">
  + Add Job
</Link>

       {loading && <p>Loading jobs...</p>}

{error && <p role="alert">{error}</p>}

      <input
        type="text"
        placeholder="Search by job title or company..."
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />

      <select
        value={selectedLocation}
        onChange={(event) => setSelectedLocation(event.target.value)}
      >
        <option value="ALL">All Locations</option>
        <option value="Bhopal">Bhopal</option>
        <option value="Indore">Indore</option>
        <option value="Remote">Remote</option>
      </select>

      <p>Jobs found: {filteredJobs.length}</p>
      {deleteError && <p role="alert">{deleteError}</p>}

      {filteredJobs.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        filteredJobs.map((job) => (
  <JobCard
  key={job.id}
  job={job}
  onDelete={handleDeleteJob}
  deleting={deletingJobId === job.id}
/>
))
      )}
    </div>
  );
}

export default Jobs;
