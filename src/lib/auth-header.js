export default function authHeader() {
  const userStorage = localStorage.getItem("user");
  let token;
  if (userStorage === null) {
    token = "";
  } else {
    const user = JSON.parse(userStorage);
    token = user.type + " " + user.token;
  }

  if (token) {
    return token;
  } else {
    return "";
  }
}
