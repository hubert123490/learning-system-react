import authHeader from "../auth-header";
const SERVER_DOMAIN = "https://learning-system-spring.herokuapp.com";

export async function getGrades() {
    const response = await fetch(
      `${SERVER_DOMAIN}/api/grades`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader(),
        },
      }
    );
    const data = await response.json();
  
    if (!response.ok) {
      throw new Error(data.message || "Nie można pobrać ocen.");
    }
  
    return data;
  }