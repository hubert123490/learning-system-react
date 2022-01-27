import authHeader from "../auth-header";

const SERVER_DOMAIN = "https://nameless-caverns-34277.herokuapp.com";

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

  export async function getMeetings(meetingData) {
    const response = await fetch(
      `${SERVER_DOMAIN}/api/webex/${meetingData.courseId}/get-meetings`,
      {
        method: "POST",
        body: JSON.stringify(meetingData.request),
        headers: {
          "Content-Type": "application/json",
          "Authorization" : authHeader()
        },
      }
    );
    const data = await response.json();
  
    if (!response.ok) {
      throw new Error(data.message || "Nie można pobrać spotkań.");
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

  export async function cancelMeeting(meetingData) {
    const response = await fetch(`${SERVER_DOMAIN}/api/webex/${meetingData.courseId}/cancel-meeting`, {
      method: "DELETE",
      body: JSON.stringify(meetingData.request),
      headers: {
        "Content-Type": "application/json",
        "Authorization" : authHeader()
      },
    });
    const data = await response.json();
  
    if (!response.ok) {
      throw new Error(data.message || "Nie udało się anulować spotkania.");
    }
  
    return data;
  }

  