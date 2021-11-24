import React, { useState } from "react";

const AuthContext = React.createContext({
  user: {},
  isLoggedIn: false,
  isTeacher: false,
  isStudent: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const initialUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(initialUser);
  const [roles, setRoles] = useState(initialUser);

  const userIsLoggedIn = !!user;

  const loginHandler = (user) => {
    setUser(user);
    setRoles(user.roles)
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logoutHandler = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const contextValue = {
    user: user,
    isLoggedIn: userIsLoggedIn,
    isTeacher: (user && user !== undefined) ? user.roles.includes("ROLE_TEACHER") : false,
    isStudent: (user && user !== undefined) ? user.roles.includes("ROLE_STUDENT") : false,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
