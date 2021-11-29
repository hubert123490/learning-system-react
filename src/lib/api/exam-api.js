import authHeader from "../auth-header";

const SERVER_DOMAIN = "http://localhost:8080";

export async function createExam(examData) {
    const response = await fetch(`${SERVER_DOMAIN}/api/courses/${examData.courseId}/exams`, {
      method: "POST",
      body: JSON.stringify(examData),
      headers: {
        "Content-Type": "application/json",
        "Authorization" : authHeader()
      },
    });
    const data = await response.json();
  
    if (!response.ok) {
      throw new Error(data.message || "Nie udało się stworzyć egzaminu.");
    }
  
    return data;
  }

  export async function deleteExam(examData) {
    const response = await fetch(`${SERVER_DOMAIN}/api/courses/${examData.courseId}/exams/${examData.examId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : authHeader()
      },
    });
    const data = await response.json();
  
    if (!response.ok) {
      throw new Error(data.message || "Nie udało się usunąć egzaminu.");
    }
  
    return data;
  }