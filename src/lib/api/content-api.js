import authHeader from "../auth-header";
const SERVER_DOMAIN = "https://learning-system-spring.herokuapp.com";

export async function getContents(contentData) {
    const response = await fetch(`${SERVER_DOMAIN}/api/courses/${contentData.courseId}/lessons/${contentData.lessonId}/contents`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : authHeader()
      },
    });
    const data = await response.json();
  
    if (!response.ok) {
      throw new Error(data.message || "Nie udało się pobrać kontentu.");
    }
  
    return data;
  }

  export async function addContent(contentData) {
    const response = await fetch(`${SERVER_DOMAIN}/api/courses/${contentData.courseId}/lessons/${contentData.lessonId}/contents`, {
        method: "POST",
        body: contentData.title,
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

  export async function deleteContent(contentData) {
    const response = await fetch(`${SERVER_DOMAIN}/api/courses/${contentData.courseId}/lessons/${contentData.lessonId}/contents/${contentData.contentId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : authHeader()
      },
    });
    const data = await response.json();
  
    if (!response.ok) {
      throw new Error(data.message || "Nie udało się usunąć kontentu.");
    }
  
    return data;
  }

  export async function addText(contentData) {
    const response = await fetch(`${SERVER_DOMAIN}/api/courses/${contentData.courseId}/lessons/${contentData.lessonId}/contents/${contentData.contentId}`, {
        method: "PATCH",
        body: contentData.textArea,
        headers: {
          "Content-Type": "application/json",
          "Authorization" : authHeader()
        },
      });
      const data = await response.json();
    
      if (!response.ok) {
        throw new Error(data.message || "Nie udało się dodać textu do kontentu.");
      }
    
      return data;
  }

  export async function addFileToContent(contentData) {
    const response = await fetch(`${SERVER_DOMAIN}/api/courses/${contentData.courseId}/lessons/${contentData.lessonId}/contents/${contentData.contentId}/upload-file`, {
      method: "POST",
      body: contentData.file,
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

  export async function deleteFileFromContent(contentData) {
    const response = await fetch(`${SERVER_DOMAIN}/api/courses/${contentData.courseId}/lessons/${contentData.lessonId}/contents/${contentData.contentId}/${contentData.fileId}`, {
      method: "DELETE",
      headers: {
        "Authorization" : authHeader()
      },
    });
    const data = await response.json();
  
    if (!response.ok) {
      throw new Error(data.message || "Nie udało się usunąć pliku z kontentu.");
    }
  
    return data;
  }