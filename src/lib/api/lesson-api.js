import authHeader from "../auth-header";

const SERVER_DOMAIN = "https://learning-system-spring.herokuapp.com";

export async function createLesson(lessonData) {
    const response = await fetch(`${SERVER_DOMAIN}/api/courses/${lessonData.courseId}/lessons`, {
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
    const response = await fetch(`${SERVER_DOMAIN}/api/courses/${lessonData.courseId}/lessons/${lessonData.lessonId}`, {
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

  export async function getLessonDetails(lessonData) {
    const response = await fetch(`${SERVER_DOMAIN}/api/courses/${lessonData.courseId}/lessons/${lessonData.lessonId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : authHeader()
      },
    });
    const data = await response.json();
  
    if (!response.ok) {
      throw new Error(data.message || "Nie udało się pobrać danych.");
    }
  
    return data;
  }
  