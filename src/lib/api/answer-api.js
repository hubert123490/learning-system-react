import authHeader from "../auth-header";
const SERVER_DOMAIN = "https://nameless-caverns-34277.herokuapp.com";

export async function submitAnswers(answersData) {
    const response = await fetch(`${SERVER_DOMAIN}/api/courses/${answersData.courseId}/exams/${answersData.examId}/submissions/${answersData.submissionId}/submit-answers`, {
        method: "POST",
        body: JSON.stringify(answersData.request),
        headers: {
          "Content-Type": "application/json",
          "Authorization" : authHeader()
        },
      });
      const data = await response.json();
    
      if (!response.ok) {
        throw new Error(data.message || "Nie udało się dodać kontentu.");
      }
    
      return data;
  }

  export async function getUncheckedAnswers(answersData) {
    const response = await fetch(`${SERVER_DOMAIN}/api/courses/${answersData.courseId}/exams/${answersData.examId}/submissions/${answersData.submissionId}/unchecked-answers`, {
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

  export async function getSubmissionAnswers(answersData) {
    const response = await fetch(`${SERVER_DOMAIN}/api/courses/${answersData.courseId}/exams/${answersData.examId}/submissions/${answersData.submissionId}/answers`, {
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

  export async function rateAnswer(answersData) {
    const response = await fetch(`${SERVER_DOMAIN}/api/courses/${answersData.courseId}/exams/${answersData.examId}/submissions/${answersData.submissionId}/answers/${answersData.answerId}`, {
        method: "POST",
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
  