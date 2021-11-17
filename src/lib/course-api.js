const SERVER_DOMAIN = "http://localhost:8080";

export async function getAllCourses() {
    const response = await fetch(`${SERVER_DOMAIN}/api/courses`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
  
    if (!response.ok) {
      throw new Error(data.message || "Could not get courses.");
    }
  
    return data;
  }