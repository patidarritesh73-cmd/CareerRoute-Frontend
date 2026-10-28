
import candidates from "../data/candidates";

const STORAGE_KEY = "careerconnect_candidates";

function loadCandidates() {
  try {
    const savedCandidates = localStorage.getItem(STORAGE_KEY);

    if (savedCandidates !== null) {
      const parsedCandidates = JSON.parse(savedCandidates);

      if (Array.isArray(parsedCandidates)) {
        return parsedCandidates;
      }
    }
  } catch (error) {
    console.error("Failed to load candidates from localStorage:", error);
  }

  return [...candidates];
}

let candidateStore = loadCandidates();

function saveCandidates() {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(candidateStore)
    );
  } catch (error) {
    console.error("Failed to save candidates to localStorage:", error);
    throw new Error("Could not save candidate data in this browser.");
  }
}

function simulateRequest(data, errorMessage = "") {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (errorMessage) {
        reject(new Error(errorMessage));
        return;
      }

      resolve(data);
    }, 800);
  });
}

export function getCandidates() {
  return simulateRequest([...candidateStore]);
}

export function getCandidateById(candidateId) {
  const candidate = candidateStore.find(
    (item) => String(item.id) === String(candidateId)
  );

  if (!candidate) {
    return simulateRequest(
      null,
      `Candidate with ID ${candidateId} was not found.`
    );
  }

  return simulateRequest(candidate);
}

export function createCandidate(candidateData) {
  const newId =
    candidateStore.length > 0
      ? Math.max(...candidateStore.map((item) => Number(item.id))) + 1
      : 1;

  const newCandidate = {
    ...candidateData,
    id: newId,
    experience: Number(candidateData.experience),
    status: candidateData.status || "Applied",
    skills: Array.isArray(candidateData.skills)
      ? candidateData.skills
      : [],
    appliedDate:
      candidateData.appliedDate ||
      new Date().toISOString().slice(0, 10),
  };

  const previousStore = candidateStore;
  candidateStore = [...candidateStore, newCandidate];

  try {
    saveCandidates();
  } catch (error) {
    candidateStore = previousStore;
    return simulateRequest(null, error.message);
  }

  return simulateRequest(newCandidate);
}

export function updateCandidate(candidateId, updatedData) {
  const candidateExists = candidateStore.some(
    (item) => String(item.id) === String(candidateId)
  );

  if (!candidateExists) {
    return simulateRequest(
      null,
      `Candidate with ID ${candidateId} was not found.`
    );
  }

  const previousStore = candidateStore;

  candidateStore = candidateStore.map((item) =>
    String(item.id) === String(candidateId)
      ? {
          ...item,
          ...updatedData,
          id: item.id,
        }
      : item
  );

  try {
    saveCandidates();
  } catch (error) {
    candidateStore = previousStore;
    return simulateRequest(null, error.message);
  }

  const updatedCandidate = candidateStore.find(
    (item) => String(item.id) === String(candidateId)
  );

  return simulateRequest(updatedCandidate);
}

export function deleteCandidate(candidateId) {
  const candidateExists = candidateStore.some(
    (item) => String(item.id) === String(candidateId)
  );

  if (!candidateExists) {
    return simulateRequest(
      null,
      `Candidate with ID ${candidateId} was not found.`
    );
  }

  const previousStore = candidateStore;

  candidateStore = candidateStore.filter(
    (item) => String(item.id) !== String(candidateId)
  );

  try {
    saveCandidates();
  } catch (error) {
    candidateStore = previousStore;
    return simulateRequest(null, error.message);
  }

  return simulateRequest({
    message: "Candidate deleted successfully.",
    id: candidateId,
  });
}
