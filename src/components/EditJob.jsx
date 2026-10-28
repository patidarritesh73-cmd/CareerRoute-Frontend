
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getJobById, updateJob } from "../services/jobService";

function EditJob() {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchJob() {
      try {
        setLoading(true);
        setError("");

        const job = await getJobById(jobId);
        setFormData({
          ...job,
          skills: Array.isArray(job.skills)
            ? job.skills.join(", ")
            : job.skills || "",
        });
      } catch (err) {
        setError(err.message || "Failed to load job.");
      } finally {
        setLoading(false);
      }
    }

    fetchJob();
  }, [jobId]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  }
    async function handleSubmit(event) {
  event.preventDefault();
  setError("");

  if (
    !formData.title.trim() ||
    !formData.company.trim() ||
    !formData.location.trim() ||
    !String(formData.experience).trim() ||
    !formData.description.trim()
  ) {
    setError("Please fill in all required fields.");
    return;
  }

 const experience = Number(formData.experience);

if (
  !Number.isFinite(experience) ||
  experience < 0 ||
  experience > 50
) {
  setError("Experience must be between 0 and 50 years.");
  return;
}

  const updatedData = {
    ...formData,
    title: formData.title.trim(),
    company: formData.company.trim(),
    location: formData.location.trim(),
    experience,
    salary: String(formData.salary || "").trim(),
    skills: String(formData.skills || "")
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean),
    description: formData.description.trim(),
  };

  try {
  setLoading(true);
  await updateJob(jobId, updatedData);
  navigate("/jobs");
} catch (err) {
  setError(err.message || "Failed to update job.");
} finally {
  setLoading(false);
}
}

  if (loading) {
    return <p>Loading job details...</p>;
  }

  if (error) {
    return (
      <div>
        <p role="alert">{error}</p>
        <Link to="/jobs">Back to Jobs</Link>
      </div>
    );
  }

  if (!formData) {
    return <p>Job not found.</p>;
  }



  return (
    <main>
      <h1>Edit Job</h1>
     {error && <p role="alert">{error}</p>}
     <form onSubmit={handleSubmit}>
        <label htmlFor="title">Job Title</label>
        <input
          id="title"
          name="title"
          value={formData.title || ""}
          onChange={handleChange}
          required
        />

        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="company"
          value={formData.company || ""}
          onChange={handleChange}
          required
        />

        <label htmlFor="location">Location</label>
        <input
          id="location"
          name="location"
          value={formData.location || ""}
          onChange={handleChange}
          required
        />

        <label htmlFor="employmentType">Employment Type</label>
        <select
          id="employmentType"
          name="employmentType"
          value={formData.employmentType || "Full-time"}
          onChange={handleChange}
        >
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Internship">Internship</option>
          <option value="Contract">Contract</option>
        </select>

        <label htmlFor="experience">Experience (years)</label>
        <input
          id="experience"
          name="experience"
          type="number"
          min="0"
          step="0.5"
          value={formData.experience ?? ""}
          onChange={handleChange}
          required
        />

        <label htmlFor="salary">Salary</label>
        <input
          id="salary"
          name="salary"
          value={formData.salary || ""}
          onChange={handleChange}
        />

        <label htmlFor="skills">Skills</label>
        <input
          id="skills"
          name="skills"
          value={formData.skills || ""}
          onChange={handleChange}
          placeholder="React, JavaScript, CSS"
        />

        <label htmlFor="description">Job Description</label>
        <textarea
          id="description"
          name="description"
          rows="5"
          value={formData.description || ""}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
  {loading ? "Saving Changes..." : "Save Changes"}
</button>
      </form>

      <p>
        <Link to="/jobs">Cancel and return to Jobs</Link>
      </p>
    </main>
  );
}

export default EditJob;
