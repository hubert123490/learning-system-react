export default function webexHeader() {
    const userStorage = localStorage.getItem("webexUser");
    let token;
    if (userStorage === null) {
      token = "";
    } else {
      const user = JSON.parse(userStorage);
      token = user.token_type + " " + user.access_token;
    }
  
    if (token) {
      return token;
    } else {
      return "";
    }
  }
  