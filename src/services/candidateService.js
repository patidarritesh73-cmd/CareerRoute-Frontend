import API_BASE_URL from "../config/api";
export async function getCandidates() {
  const response = await fetch(
    `${API_BASE_URL}/candidates`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch candidates");
  }

  const result = await response.json();

  return result.data;
}

export async function getCandidateById(candidateId) {
  const response = await fetch(
   `${API_BASE_URL}/candidates/${candidateId}`
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Failed to fetch candidate."
    );
  }

  return result.data;
}

export async function createCandidate(candidateData) {
  const response = await fetch(
   `${API_BASE_URL}/candidates`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(candidateData),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Failed to create candidate."
    );
  }

  return result.data;
}

export async function updateCandidate(candidateId, updatedData) {
  const response = await fetch(
   `${API_BASE_URL}/candidates/${candidateId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Failed to update candidate."
    );
  }

  return result.data;
}
export async function deleteCandidate(candidateId) {
  const response = await fetch(
    `${API_BASE_URL}/candidates/${candidateId}`,
    {
      method: "DELETE",
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Failed to delete candidate."
    );
  }

  return result;
}
