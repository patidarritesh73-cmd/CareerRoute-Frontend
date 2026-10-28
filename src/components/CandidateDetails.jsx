
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  getCandidateById,
  updateCandidate,
} from "../services/candidateService";

function CandidateDetails() {
  const { candidateId } = useParams();

  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    experience: "",
    location: "",
    status: "Applied",
  });

  useEffect(() => {
    let isActive = true;

    async function loadCandidate() {
      try {
        setLoading(true);
        setError("");

        const data = await getCandidateById(candidateId);

        if (isActive) {
          setCandidate(data);
        }
      } catch (err) {
        if (isActive) {
          setError(err.message || "Failed to load candidate.");
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    }

    loadCandidate();

    return () => {
      isActive = false;
    };
  }, [candidateId]);

  function handleEdit() {
    setFormData({
      name: candidate.name || "",
      email: candidate.email || "",
      phone: candidate.phone || "",
      position: candidate.position || "",
      experience: String(candidate.experience ?? ""),
      location: candidate.location || "",
      status: candidate.status || "Applied",
    });

    setError("");
    setIsEditing(true);
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  }

  async function handleSave(event) {
    event.preventDefault();
    setError("");

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.position.trim() ||
      formData.experience === "" ||
      !formData.location.trim() ||
      !formData.status
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (formData.name.trim().length < 2) {
      setError("Name must contain at least 2 characters.");
      return;
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
  formData.email.trim()
)
    ) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!/^\d{10}$/.test(formData.phone.trim())) {
      setError("Phone number must contain exactly 10 digits.");
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

    try {
      setSaving(true);

      const updatedCandidate = await updateCandidate(
        candidateId,
        {
          ...formData,
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          position: formData.position.trim(),
          experience,
          location: formData.location.trim(),
        }
      );

      setCandidate(updatedCandidate);
      setIsEditing(false);
    } catch (err) {
      setError(err.message || "Failed to update candidate.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <p>Loading candidate...</p>;
  }

  if (error && !isEditing) {
    return (
      <div>
        <p role="alert">{error}</p>
        <Link to="/candidates">Back to Candidates</Link>
      </div>
    );
  }

  if (!candidate) {
    return (
      <div>
        <p>Candidate not found.</p>
        <Link to="/candidates">Back to Candidates</Link>
      </div>
    );
  }

  return (
    <div>

      {isEditing ? (
        <form onSubmit={handleSave}>
          <h1>Edit Candidate</h1>

          {error && <p role="alert">{error}</p>}

          <div>
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="phone">Phone</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="position">Position</label>
            <input
              id="position"
              name="position"
              value={formData.position}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="experience">Experience (years)</label>
            <input
              id="experience"
              name="experience"
              type="number"
              min="0"
              max="50"
              value={formData.experience}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="location">Location</label>
            <input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Selected">Selected</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </button>

          <button
            type="button"
            disabled={saving}
            onClick={() => {
              setIsEditing(false);
              setError("");
            }}
          >
            Cancel
          </button>
        </form>
      ) : (
        <>
          <h1>{candidate.name}</h1>
          <p>Email: {candidate.email}</p>
          <p>Phone: {candidate.phone}</p>
          <p>Position: {candidate.position}</p>
          <p>Experience: {candidate.experience} years</p>
          <p>Location: {candidate.location}</p>
          <p>Status: {candidate.status}</p>
          <p>Skills: {candidate.skills?.join(", ")}</p>
          <p>Applied Date: {candidate.appliedDate}</p>

          <button type="button" onClick={handleEdit}>
            Edit Candidate
          </button>

          <br />
          <br />

          <Link to="/candidates">Back to Candidates</Link>
        </>
      )}
    </div>
  );
}

export default CandidateDetails;
