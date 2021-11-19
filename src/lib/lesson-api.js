import authHeader from "./auth-header";

const SERVER_DOMAIN = "http://localhost:8080";

export async function createLesson(lessonData) {
    const response = await fetch(`${SERVER_DOMAIN}/api/courses/${lessonData.courseId}/create-lesson`, {
      method: "POST",
      body: JSON.stringify(lessonData),
      headers: {
        "Content-Type": "application/json",
        "Authorization" : authHeader()
      },
    });
    const data = await response.json();
  
    if (!response.ok) {
      throw new Error(data.message || "Nie udało się stworzyć lekcji.");
    }
  
    return data;
  }

  export async function deleteLesson(lessonData) {
    const response = await fetch(`${SERVER_DOMAIN}/api/courses/${lessonData.courseId}/delete-lesson/${lessonData.lessonId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : authHeader()
      },
    });
    const data = await response.json();
  
    if (!response.ok) {
      throw new Error(data.message || "Nie udało się usunąć lekcji.");
    }
  
    return data;
  }