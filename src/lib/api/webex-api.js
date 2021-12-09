import authHeader from "../auth-header";

const SERVER_DOMAIN = "http://localhost:8080";

export async function createMeeting(meetingData) {
    const response = await fetch(`${SERVER_DOMAIN}/api/webex/${meetingData.courseId}/create-meeting`, {
      method: "POST",
      body: JSON.stringify(meetingData.request),
      headers: {
        "Content-Type": "application/json",
        "Authorization" : authHeader()
      },
    });
    const data = await response.json();
  
    if (!response.ok) {
      throw new Error(data.message || "Nie udało się stworzyć spotkania.");
    }
  
    return data;
  }

  export async function webexIntegration(meetingData) {
    const response = await fetch(`${SERVER_DOMAIN}/api/webex/integration`, {
      method: "POST",
      body: JSON.stringify(meetingData),
      headers: {
        "Content-Type": "application/json",
        "Authorization" : authHeader()
      },
    });
    const data = await response.json();
  
    if (!response.ok) {
      throw new Error(data.message || "Nie udało się połączyć z webexem.");
    }
  
    return data;
  }

  