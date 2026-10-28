
import jobs from "../data/jobs";

const STORAGE_KEY = "careerconnect_jobs";

function loadJobs() {
  try {
    const savedJobs = localStorage.getItem(STORAGE_KEY);

    if (savedJobs !== null) {
      const parsedJobs = JSON.parse(savedJobs);

      if (Array.isArray(parsedJobs)) {
        return parsedJobs;
      }
    }
  } catch (error) {
    console.error("Failed to load jobs:", error);
  }

  return [...jobs];
}

let jobStore = loadJobs();

function saveJobs() {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(jobStore)
    );
  } catch (error) {
    console.error("Failed to save jobs:", error);
    throw new Error("Could not save jobs in this browser.");
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

export function getJobs() {
  return simulateRequest([...jobStore]);
}

export function getJobById(jobId) {
  const job = jobStore.find(
    (item) => String(item.id) === String(jobId)
  );

  if (!job) {
    return simulateRequest(
      null,
      `Job with ID ${jobId} was not found.`
    );
  }

  return simulateRequest(job);
}

export function createJob(jobData) {
  const newId =
    jobStore.length > 0
      ? Math.max(...jobStore.map((item) => Number(item.id))) + 1
      : 1;

  const newJob = {
    ...jobData,
    id: newId,
  };

  const previousStore = jobStore;
  jobStore = [...jobStore, newJob];

  try {
    saveJobs();
  } catch (error) {
    jobStore = previousStore;
    return simulateRequest(null, error.message);
  }

  return simulateRequest(newJob);
}

export function updateJob(jobId, updatedData) {
  const jobExists = jobStore.some(
    (item) => String(item.id) === String(jobId)
  );

  if (!jobExists) {
    return simulateRequest(
      null,
      `Job with ID ${jobId} was not found.`
    );
  }

  const previousStore = jobStore;

  jobStore = jobStore.map((item) =>
    String(item.id) === String(jobId)
      ? { ...item, ...updatedData, id: item.id }
      : item
  );

  try {
    saveJobs();
  } catch (error) {
    jobStore = previousStore;
    return simulateRequest(null, error.message);
  }

  const updatedJob = jobStore.find(
    (item) => String(item.id) === String(jobId)
  );

  return simulateRequest(updatedJob);
}

export function deleteJob(jobId) {
  const jobExists = jobStore.some(
    (item) => String(item.id) === String(jobId)
  );

  if (!jobExists) {
    return simulateRequest(
      null,
      `Job with ID ${jobId} was not found.`
    );
  }

  const previousStore = jobStore;

  jobStore = jobStore.filter(
    (item) => String(item.id) !== String(jobId)
  );

  try {
    saveJobs();
  } catch (error) {
    jobStore = previousStore;
    return simulateRequest(null, error.message);
  }

  return simulateRequest({
    message: "Job deleted successfully.",
    id: jobId,
  });
}
