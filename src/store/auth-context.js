import React, { useState } from "react";

const AuthContext = React.createContext({
  user: {},
  webexUser : {},
  isLoggedIn: false,
  isTeacher: false,
  isStudent: false,
  login: (token) => {},
  logout: () => {},
  webexIntegrationHandler: (webexUser) => {}
});

export const AuthContextProvider = (props) => {
  const initialUser = JSON.parse(localStorage.getItem("user"));
  const initialWebexUser = JSON.parse(localStorage.getItem("webexUser"));
  const [webexUser, setWebexUser] = useState(initialWebexUser);
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
    setWebexUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("webexUser");
  };

  const webexIntegrationHandler = (webexUser) => {
    setWebexUser(webexUser);
    localStorage.setItem("webexUser", JSON.stringify(webexUser))
  }

  const contextValue = {
    user: user,
    webexUser : webexUser,
    isLoggedIn: userIsLoggedIn,
    isTeacher: (user && user !== undefined) ? user.roles.includes("ROLE_TEACHER") : false,
    isStudent: (user && user !== undefined) ? user.roles.includes("ROLE_STUDENT") : false,
    roles: (roles && roles !== undefined) ? roles : [],
    login: loginHandler,
    logout: logoutHandler,
    webexIntegrationHandler : webexIntegrationHandler
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
