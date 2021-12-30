import authHeader from "../auth-header";
const SERVER_DOMAIN = "http://localhost:8080";

export async function createAssignment(assignmentData) {
    const response = await fetch(`${SERVER_DOMAIN}/api/courses/${assignmentData.courseId}/assignments`, {
      method: "POST",
      body: JSON.stringify(assignmentData.request),
      headers: {
        "Content-Type": "application/json",
        "Authorization" : authHeader()
      },
    });
    const data = await response.json();
  
    if (!response.ok) {
      throw new Error(data.message || "Nie udało się stworzyć pracy.");
    }
  
    return data;
  }

  export async function deleteAssignment(assignmentData) {
    const response = await fetch(
      `${SERVER_DOMAIN}/api/courses/${assignmentData.courseId}/assignments/${assignmentData.assignmentId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader(),
        },
      }
    );
    const data = await response.json();
  
    if (!response.ok) {
      throw new Error(data.message || "Nie udało się usunąć pracy.");
    }
  
    return data;
  }