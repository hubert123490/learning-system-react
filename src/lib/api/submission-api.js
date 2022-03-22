import authHeader from "../auth-header";
const SERVER_DOMAIN = "https://learning-system-spring.herokuapp.com";


export async function checkSubmission(submissionData) {
    const response = await fetch(`${SERVER_DOMAIN}/api/courses/${submissionData.courseId}/exams/${submissionData.examId}/submissions`, {
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

  export async function makeSubmission(submissionData) {
    const response = await fetch(`${SERVER_DOMAIN}/api/courses/${submissionData.courseId}/exams/${submissionData.examId}/submissions`, {
      method: "POST",
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

  export async function findUncheckedSubmissions(submissionData) {
    const response = await fetch(`${SERVER_DOMAIN}/api/courses/${submissionData.courseId}/exams/${submissionData.examId}/submissions/find-submissions`, {
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

  export async function findAllSubmissions(submissionData) {
    const response = await fetch(`${SERVER_DOMAIN}/api/courses/${submissionData.courseId}/exams/${submissionData.examId}/submissions/find-all-submissions`, {
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