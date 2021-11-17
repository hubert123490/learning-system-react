const SERVER_DOMAIN = "http://localhost:8080";


export async function studentTest(authHeader) {
    const response = await fetch(`${SERVER_DOMAIN}/api/test/student`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : authHeader
      },
    });
    const data = await response.json();
  
    if (!response.ok) {
      throw new Error(data.message || "Nie można pobrać danych ucznia.");
    }
  
    return data;
  }