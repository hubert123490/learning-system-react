import authHeader from "../auth-header";
const SERVER_DOMAIN = "https://learning-system-spring.herokuapp.com";

export async function getTasks(taskData) {
    const response = await fetch(`${SERVER_DOMAIN}/api/courses/${taskData.courseId}/assignments/${taskData.assignmentId}/tasks`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : authHeader()
      },
    });
    const data = await response.json();
  
    if (!response.ok) {
      throw new Error(data.message || "Nie udało się pobrać zadań.");
    }
  
    return data;
  }

  export async function addTask(taskData) {
    const response = await fetch(`${SERVER_DOMAIN}/api/courses/${taskData.courseId}/assignments/${taskData.assignmentId}/tasks`, {
        method: "POST",
        body: JSON.stringify(taskData.request),
        headers: {
          "Content-Type": "application/json",
          "Authorization" : authHeader()
        },
      });
      const data = await response.json();
    
      if (!response.ok) {
        throw new Error(data.message || "Nie udało się dodać zadania.");
      }
    
      return data;
  }

  export async function deleteTask(taskData) {
    const response = await fetch(`${SERVER_DOMAIN}/api/courses/${taskData.courseId}/assignments/${taskData.assignmentId}/tasks/${taskData.taskId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : authHeader()
      },
    });
    const data = await response.json();
  
    if (!response.ok) {
      throw new Error(data.message || "Nie udało się usunąć zadania.");
    }
  
    return data;
  }

  export async function updateTaskDescription(taskData) {
    const response = await fetch(`${SERVER_DOMAIN}/api/courses/${taskData.courseId}/assignments/${taskData.assignmentId}/tasks/${taskData.taskId}`, {
        method: "PATCH",
        body: taskData.description,
        headers: {
          "Content-Type": "application/json",
          "Authorization" : authHeader()
        },
      });
      const data = await response.json();
    
      if (!response.ok) {
        throw new Error(data.message || "Nie udało się dodać opisu do zadania.");
      }
    
      return data;
  }

  export async function addFileToTask(taskData) {
    const response = await fetch(`${SERVER_DOMAIN}/api/courses/${taskData.courseId}/assignments/${taskData.assignmentId}/tasks/${taskData.taskId}/upload-file`, {
      method: "POST",
      body: taskData.file,
      headers: {
        "Authorization" : authHeader()
      },
    });
    const data = await response.json();
  
    if (!response.ok) {
      throw new Error(data.message || "Nie udało się dodać pliku do kontentu.");
    }
  
    return data;
  }

  export async function deleteFileFromTask(taskData) {
    const response = await fetch(`${SERVER_DOMAIN}/api/courses/${taskData.courseId}/assignments/${taskData.assignmentId}/tasks/${taskData.taskId}/${taskData.fileId}`, {
      method: "DELETE",
      headers: {
        "Authorization" : authHeader()
      },
    });
    const data = await response.json();
  
    if (!response.ok) {
      throw new Error(data.message || "Nie udało się usunąć pliku z zadania.");
    }
  
    return data;
  }