import authHeader from "../auth-header";

const SERVER_DOMAIN = "https://learning-system-spring.herokuapp.com";

export async function createExam(examData) {
  const response = await fetch(
    `${SERVER_DOMAIN}/api/courses/${examData.courseId}/exams`,
    {
      method: "POST",
      body: JSON.stringify(examData),
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader(),
      },
    }
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Sprawdź przedział czasowy.");
  }

  return data;
}

export async function deleteExam(examData) {
  const response = await fetch(
    `${SERVER_DOMAIN}/api/courses/${examData.courseId}/exams/${examData.examId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader(),
      },
    }
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Nie udało się usunąć egzaminu.");
  }

  return data;
}

export async function changeExamDates(examData) {
  const response = await fetch(
    `${SERVER_DOMAIN}/api/courses/${examData.courseId}/exams/${examData.examId}`,
    {
      method: "PATCH",
      body: JSON.stringify(examData.request),
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader(),
      },
    }
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Nie udało się zmienić czasu rozpoczęcia i zakończenia. Sprawdź poprawność danych.");
  }

  return data;
}

export async function getUncheckedExams() {
  const response = await fetch(
    `${SERVER_DOMAIN}/api/courses/unchecked-exams`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader(),
      },
    }
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Nie udało się pobrać egzaminów do sprawdzenia."
    );
  }

  return data;
}

export async function getPendingExams() {
  const response = await fetch(`${SERVER_DOMAIN}/api/courses/pending-exams`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: authHeader(),
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Nie można pobrać egzaminów.");
  }

  return data;
}

export async function getCourseExams(examData) {
  const response = await fetch(`${SERVER_DOMAIN}/api/courses/${examData.courseId}/exams`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: authHeader(),
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Nie można pobrać egzaminów.");
  }

  return data;
}
