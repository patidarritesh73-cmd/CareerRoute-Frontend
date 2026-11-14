import API_BASE_URL from "../config/api";
export async function getJobs() {
  const response = await fetch(
    `${API_BASE_URL}/jobs`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch jobs");
  }

  const result = await response.json();

  return result.data;
}


export async function getJobById(jobId) {
  const response = await fetch(
    `${API_BASE_URL}/jobs/${jobId}`
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Failed to fetch job"
    );
  }

  return result.data;
}

export async function createJob(jobData) {
  const response = await fetch(
    `${API_BASE_URL}/jobs`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jobData),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Failed to create job"
    );
  }

  return result.data;
}

export async function updateJob(jobId, updatedData) {
  const response = await fetch(
    `${API_BASE_URL}/jobs/${jobId}`,
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
      result.message || "Failed to update job"
    );
  }

  return result.data;
}

export async function deleteJob(jobId) {
  const response = await fetch(
    `${API_BASE_URL}/jobs/${jobId}`,
    {
      method: "DELETE",
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Failed to delete job"
    );
  }

  return result;
}
