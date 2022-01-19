import authHeader from "../auth-header";

const SERVER_DOMAIN = "http://localhost:8080";

export async function getAllCourses(courseData) {
  const response = await fetch(
    `${SERVER_DOMAIN}/api/courses?name=${courseData.name}&category=${courseData.category}&lastName=${courseData.lastName}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Brak kursów do wyświetlenia.");
  }

  return data;
}

export async function getMyCourses() {
  const response = await fetch(
    `${SERVER_DOMAIN}/api/courses/my-courses-teacher`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader(),
      },
    }
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Brak kursów do wyświetlenia.");
  }

  return data;
}

export async function getMyCoursesStudent() {
  const response = await fetch(
    `${SERVER_DOMAIN}/api/courses/my-courses-student`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader(),
      },
    }
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Brak kursów do wyświetlenia.");
  }

  return data;
}

export async function createCourse(courseData) {
  const response = await fetch(`${SERVER_DOMAIN}/api/courses`, {
    method: "POST",
    body: JSON.stringify(courseData),
    headers: {
      "Content-Type": "application/json",
      Authorization: authHeader(),
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Nie udało się stworzyć kursu.");
  }

  return data;
}

export async function courseDetails(courseId) {
  const response = await fetch(`${SERVER_DOMAIN}/api/courses/${courseId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: authHeader(),
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Nie można pobrać kursów.");
  }

  return data;
}

export async function deleteCourse(courseId) {
  const response = await fetch(`${SERVER_DOMAIN}/api/courses/${courseId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: authHeader(),
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Nie można usunąć kursu.");
  }

  return data;
}

export async function enrollInCourse(courseData) {
  const response = await fetch(
    `${SERVER_DOMAIN}/api/courses/${courseData.courseId}`,
    {
      method: "POST",
      body: courseData.password,
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader(),
      },
    }
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Nieprawidłowe hasło.");
  }

  return data;
}

export async function getStudentsGrades(courseData) {
  const response = await fetch(
    `${SERVER_DOMAIN}/api/courses/${courseData.courseId}/students-grades`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader(),
      },
    }
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Nie można pobrać ocen uczniów.");
  }

  return data;
}
