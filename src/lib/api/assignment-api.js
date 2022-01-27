import authHeader from "../auth-header";
const SERVER_DOMAIN = "https://nameless-caverns-34277.herokuapp.com";

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
      throw new Error(data.message || "Sprawdź przedział czasowy.");
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

  export async function getPendingAssignments() {
    const response = await fetch(`${SERVER_DOMAIN}/api/courses/assignments/pending-assignments`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader(),
      },
    });
    const data = await response.json();
  
    if (!response.ok) {
      throw new Error(data.message || "Nie można pobrać prac.");
    }
  
    return data;
  }

  export async function getCourseAssignments(assignmentData) {
    const response = await fetch(`${SERVER_DOMAIN}/api/courses/${assignmentData.courseId}/assignments`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader(),
      },
    });
    const data = await response.json();
  
    if (!response.ok) {
      throw new Error(data.message || "Nie można pobrać prac.");
    }
  
    return data;
  }
  
  export async function getUncheckedAssignments() {
    const response = await fetch(
      `${SERVER_DOMAIN}/api/courses/assignments/unchecked-assignments`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader(),
        },
      }
    );
    const data = await response.json();
  
    if (!response.ok) {
      throw new Error(
        data.message || "Nie udało się pobrać prac do sprawdzenia."
      );
    }
  
    return data;
  }

  export async function changeAssignmentDates(assignmentData) {
    const response = await fetch(
      `${SERVER_DOMAIN}/api/courses/${assignmentData.courseId}/assignments/${assignmentData.assignmentId}`,
      {
        method: "PATCH",
        body: JSON.stringify(assignmentData.request),
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader(),
        },
      }
    );
    const data = await response.json();
  
    if (!response.ok) {
      throw new Error(data.message || "Nie udało się zmienić czasu rozpoczęcia i zakończenia. Sprawdź poprawność danych.");
    }
  
    return data;
  }