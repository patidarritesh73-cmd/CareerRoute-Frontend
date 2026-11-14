
import { Link } from "react-router-dom";

function JobCard({ job, onDelete, deleting }) {
  return (
    <div className="job-card">
      <h2>{job.title}</h2>
      <p>Company: {job.company}</p>
      <p>Location: {job.location}</p>
      <p>
  Experience: {job.experience?.min ?? "N/A"} -{" "}
  {job.experience?.max ?? "N/A"} years
</p>

<p>
  Salary: {job.salary?.min != null && job.salary?.max != null
    ? `${new Intl.NumberFormat("en-IN").format(job.salary.min)} - ${new Intl.NumberFormat("en-IN").format(job.salary.max)} ${job.salary.currency || "INR"}`
    : "Not specified"}
</p>

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
