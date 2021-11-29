import authHeader from "../auth-header";
const SERVER_DOMAIN = "http://localhost:8080";

export async function getQuestions(questionData) {
    const response = await fetch(`${SERVER_DOMAIN}/api/courses/${questionData.courseId}/exams/${questionData.examId}/questions`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : authHeader()
      },
    });
    const data = await response.json();
  
    if (!response.ok) {
      throw new Error(data.message || "Nie udało się pobrać pytań.");
    }
  
    return data;
  }

  export async function addQuestion(questionData) {
    const response = await fetch(`${SERVER_DOMAIN}/api/courses/${questionData.courseId}/exams/${questionData.examId}/questions`, {
        method: "POST",
        body: JSON.stringify(questionData.request),
        headers: {
          "Content-Type": "application/json",
          "Authorization" : authHeader()
        },
      });
      const data = await response.json();
    
      if (!response.ok) {
        throw new Error(data.message || "Nie udało się dodać pytania.");
      }
    
      return data;
  }

  export async function deleteQuestion(questionData) {
    const response = await fetch(`${SERVER_DOMAIN}/api/courses/${questionData.courseId}/exams/${questionData.examId}/questions/${questionData.questionId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization" : authHeader()
        },
      });
      const data = await response.json();
    
      if (!response.ok) {
        throw new Error(data.message || "Nie udało się usunąć pytania.");
      }
    
      return data;
  }

  export async function addQuestionRadio(questionData) {
    const response = await fetch(`${SERVER_DOMAIN}/api/courses/${questionData.courseId}/exams/${questionData.examId}/questions/${questionData.questionId}/create-radio`, {
        method: "POST",
        body: JSON.stringify(questionData.request),
        headers: {
          "Content-Type": "application/json",
          "Authorization" : authHeader()
        },
      });
      const data = await response.json();
    
      if (!response.ok) {
        throw new Error(data.message || "Nie udało się dodać pytania zamkniętego.");
      }
    
      return data;
  }

  export async function addQuestionText(questionData) {
    const response = await fetch(`${SERVER_DOMAIN}/api/courses/${questionData.courseId}/exams/${questionData.examId}/questions/${questionData.questionId}/create-text`, {
        method: "POST",
        body: questionData.correctAnswer,
        headers: {
          "Content-Type": "application/json",
          "Authorization" : authHeader()
        },
      });
      const data = await response.json();
    
      if (!response.ok) {
        throw new Error(data.message || "Nie udało się dodać krótkiego pytania otwartego.");
      }
    
      return data;
  }

  export async function addQuestionTextArea(questionData) {
    const response = await fetch(`${SERVER_DOMAIN}/api/courses/${questionData.courseId}/exams/${questionData.examId}/questions/${questionData.questionId}/create-text-area`, {
        method: "POST",
        body: questionData.correctAnswer,
        headers: {
          "Content-Type": "application/json",
          "Authorization" : authHeader()
        },
      });
      const data = await response.json();
    
      if (!response.ok) {
        throw new Error(data.message || "Nie udało się dodać pytania otwartego.");
      }
    
      return data;
  }
