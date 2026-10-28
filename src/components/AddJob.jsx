
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createJob } from "../services/jobService";

function AddJob() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    employmentType: "Full-time",
    experience: "",
    salary: "",
    skills: "",
    description: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
      !formData.experience.trim() ||
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


    const jobData = {
      ...formData,
      title: formData.title.trim(),
      company: formData.company.trim(),
      location: formData.location.trim(),
      experience,
      salary: formData.salary.trim(),
      skills: formData.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean),
      description: formData.description.trim(),
    };

    setLoading(true);

    try {
      await createJob(jobData);
      navigate("/jobs");
    } catch (err) {
      setError(err.message || "Failed to create job.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <h1>Add New Job</h1>
      <p>Enter the details of the job opening.</p>

      {error && <p role="alert">{error}</p>}

      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Job Title *</label>
        <input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <label htmlFor="company">Company *</label>
        <input
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          required
        />

        <label htmlFor="location">Location *</label>
        <input
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />

        <label htmlFor="employmentType">Employment Type</label>
        <select
          id="employmentType"
          name="employmentType"
          value={formData.employmentType}
          onChange={handleChange}
        >
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Internship">Internship</option>
          <option value="Contract">Contract</option>
        </select>

        <label htmlFor="experience">Experience (years) *</label>
        <input
          id="experience"
          name="experience"
          type="number"
          min="0"
          step="0.5"
          value={formData.experience}
          onChange={handleChange}
          required
        />

        <label htmlFor="salary">Salary</label>
        <input
          id="salary"
          name="salary"
          value={formData.salary}
          onChange={handleChange}
          placeholder="e.g. ₹4–6 LPA"
        />

        <label htmlFor="skills">Skills</label>
        <input
          id="skills"
          name="skills"
          value={formData.skills}
          onChange={handleChange}
          placeholder="React, JavaScript, CSS"
        />

        <label htmlFor="description">Job Description *</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="5"
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Saving Job..." : "Add Job"}
        </button>
      </form>

      <p>
        <Link to="/jobs">Cancel and return to Jobs</Link>
      </p>
    </main>
  );
}

export default AddJob;
