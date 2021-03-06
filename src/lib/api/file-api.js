import authHeader from "../auth-header";

const SERVER_DOMAIN = "https://learning-system-spring.herokuapp.com";

export async function addFile(fileData) {
    const response = await fetch(`${SERVER_DOMAIN}/api/file/upload-file`, {
      method: "POST",
      body: fileData,
      headers: {
        "Authorization" : authHeader()
      },
    });
    const data = await response.json();
  
    if (!response.ok) {
      throw new Error(data.message || "Nie udało się wysłać pliku.");
    }
  
    return data;
  }