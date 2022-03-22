import authHeader from "../auth-header";
const SERVER_DOMAIN = "https://learning-system-spring.herokuapp.com";

export async function addFileToTaskAnswer(taskData) {
    const response = await fetch(`${SERVER_DOMAIN}/api/courses/${taskData.courseId}/assignments/${taskData.assignmentId}/tasks/${taskData.taskId}/task-answers/upload-file`, {
      method: "POST",
      body: taskData.file,
      headers: {
        "Authorization" : authHeader()
      },
    });
    const data = await response.json();
  
    if (!response.ok) {
      throw new Error(data.message || "Nie udało się dodać pliku do pracy.");
    }
  
    return data;
  }

  export async function deleteTaskAnswerFile(taskAnswerData) {
    const response = await fetch(`${SERVER_DOMAIN}/api/courses/${taskAnswerData.courseId}/assignments/${taskAnswerData.assignmentId}/tasks/${taskAnswerData.taskId}/task-answers/files/${taskAnswerData.fileId}`, {
      method: "DELETE",
      headers: {
        "Authorization" : authHeader()
      },
    });
    const data = await response.json();
  
    if (!response.ok) {
      throw new Error(data.message || "Nie udało się usunąć pliku z odpowiedzi. Sprawdź czas w którym można składać pracę.");
    }
  
    return data;
  }

  export async function getTaskSubmissionAnswers(answersData) {
    const response = await fetch(`${SERVER_DOMAIN}/api/courses/${answersData.courseId}/assignments/${answersData.assignmentId}/submissions/${answersData.taskSubmissionId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization" : authHeader()
        },
      });
      const data = await response.json();
    
      if (!response.ok) {
        throw new Error(data.message || "Nie udało się pobrać odpowiedzi.");
      }
    
      return data;
  }

  export async function rateTaskAnswer(answersData) {
    const response = await fetch(`${SERVER_DOMAIN}/api/courses/${answersData.courseId}/assignments/${answersData.assignmentId}/submissions/${answersData.taskSubmissionId}/task-answers/${answersData.taskAnswerId}`, {
        method: "PATCH",
        body: JSON.stringify(answersData.request),
        headers: {
          "Content-Type": "application/json",
          "Authorization" : authHeader()
        },
      });
      const data = await response.json();
    
      if (!response.ok) {
        throw new Error(data.message || "Nie udało się ocenić odpowiedzi.");
      }
    
      return data;
  }

  export async function getUncheckedTaskAnswers(answersData) {
    const response = await fetch(`${SERVER_DOMAIN}/api/courses/${answersData.courseId}/assignments/${answersData.assignmentId}/submissions/${answersData.taskSubmissionId}/task-answers/unchecked-answers`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization" : authHeader()
        },
      });
      const data = await response.json();
    
      if (!response.ok) {
        throw new Error(data.message || "Nie udało się pobrać odpowiedzi.");
      }
    
      return data;
  }