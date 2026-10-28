
import { Link } from "react-router-dom";

function JobCard({ job, onDelete, deleting }) {
  return (
    <div className="job-card">
      <h2>{job.title}</h2>
      <p>Company: {job.company}</p>
      <p>Location: {job.location}</p>
      <p>Experience: {job.experience}</p>

      <Link to={`/jobs/${job.id}`}>
        View Details
      </Link>

      {" | "}

      <Link to={`/jobs/${job.id}/edit`}>
        Edit Job
      </Link>

      {" | "}

     <button
  type="button"
  disabled={deleting}
  onClick={() => onDelete(job.id)}
>
  {deleting ? "Deleting..." : "Delete Job"}
</button>
    </div>
  );
}

export default JobCard;
