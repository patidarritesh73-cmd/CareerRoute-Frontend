
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { createCandidate } from "../services/candidateService";

function NewCandidate() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: searchParams.get("position") || "",
    experience: "",
    location: "",
  });

  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

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
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.position.trim() ||
      formData.experience === "" ||
      !formData.location.trim()
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (formData.name.trim().length < 2) {
      setError("Name must contain at least 2 characters.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      setError("Phone number must contain exactly 10 digits.");
      return;
    }

    if (
      !Number.isFinite(Number(formData.experience)) ||
      Number(formData.experience) < 0 ||
      Number(formData.experience) > 50
    ) {
      setError("Experience must be between 0 and 50 years.");
      return;
    }

    try {
      setSaving(true);

      await createCandidate({
        ...formData,
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        position: formData.position.trim(),
        experience: Number(formData.experience),
        location: formData.location.trim(),
      });

      navigate("/candidates");
    } catch (err) {
      setError(err.message || "Failed to add candidate.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <h1>New Candidate</h1>

      {error && <p role="alert">{error}</p>}

      <form onSubmit={handleSubmit}>
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

        <button type="submit" disabled={saving}>
          {saving ? "Adding Candidate..." : "Add Candidate"}
        </button>

        <button
          type="button"
          disabled={saving}
          onClick={() => navigate("/candidates")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default NewCandidate;
