import authHeader from "../auth-header";
const SERVER_DOMAIN = "http://localhost:8080";

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