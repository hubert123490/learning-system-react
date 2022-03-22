const SERVER_DOMAIN = "https://learning-system-spring.herokuapp.com";

export async function signUp(authData) {
  const response = await fetch(`${SERVER_DOMAIN}/api/auth/signup`, {
    method: "POST",
    body: JSON.stringify(authData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(authData.error);
  }

  return data;
}

export async function signIn(authData) {
  const response = await fetch(`${SERVER_DOMAIN}/api/auth/signin`, {
    method: "POST",
    body: JSON.stringify(authData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(authData.error);
  }

  return data;
}

