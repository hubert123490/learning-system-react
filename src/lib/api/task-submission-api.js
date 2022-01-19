import authHeader from "../auth-header";
const SERVER_DOMAIN = "http://localhost:8080";

export async function findAllSubmissions(submissionData) {
    const response = await fetch(`${SERVER_DOMAIN}/api/courses/${submissionData.courseId}/assignments/${submissionData.assignmentId}/submissions/find-all-submissions`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : authHeader()
      },
    });
    const data = await response.json();
  
    if (!response.ok) {
      throw new Error(data.message || "Coś poszło nie tak.");
    }
  
    return data;
  }

  export async function findUncheckedTaskSubmissions(submissionData) {
    const response = await fetch(`${SERVER_DOMAIN}/api/courses/${submissionData.courseId}/assignments/${submissionData.assignmentId}/submissions/unchecked-submissions`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : authHeader()
      },
    });
    const data = await response.json();
  
    if (!response.ok) {
      throw new Error(data.message || "Coś poszło nie tak.");
    }
  
    return data;
  }