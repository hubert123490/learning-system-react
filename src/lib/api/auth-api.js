const SERVER_DOMAIN = "http://localhost:8080";

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
    throw new Error(data.message || "Rejestracja nie powiodła się.");
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
    throw new Error(data.message || "Niepoprawny login lub hasło.");
  }

  return data;
}

