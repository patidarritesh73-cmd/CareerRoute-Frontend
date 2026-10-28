import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getCandidates,
  deleteCandidate,
} from "../services/candidateService";

function Candidates() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadCandidates() {
      try {
        const data = await getCandidates();
        setCandidates(data);
      } catch (err) {
        setError("Failed to load candidates.");
      } finally {
        setLoading(false);
      }
    }

    loadCandidates();
  }, []);

  async function handleDelete(candidateId) {
  const confirmed = window.confirm(
    "Are you sure you want to delete this candidate?"
  );

  if (!confirmed) {
    return;
  }

  try {
    await deleteCandidate(candidateId);

    setCandidates((previousCandidates) =>
      previousCandidates.filter(
        (candidate) => candidate.id !== candidateId
      )
    );
  } catch (err) {
    setError(err.message || "Failed to delete candidate.");
  }
}

  if (loading) {
    return <p>Loading candidates...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (candidates.length === 0) {
    return <p>No candidates found.</p>;
  }

  return (
    <div>
      <h1>Candidates</h1>

      {candidates.map((candidate) => (
  <div key={candidate.id} className="candidate-card">
    <h2>{candidate.name}</h2>
    <p>Position: {candidate.position}</p>
    <p>Status: {candidate.status}</p>

    <Link to={`/candidates/${candidate.id}`}>
      View Details
    </Link>

    <button
  type="button"
  onClick={() => handleDelete(candidate.id)}
>
  Delete Candidate
</button>
  </div>
))}
    </div>
  );
}

export default Candidates;

