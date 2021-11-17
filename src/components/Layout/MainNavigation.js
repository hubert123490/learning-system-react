import classes from "./MainNavigation.module.css";
import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import AuthContext from "../../store/auth-context";

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);
  const [user] = useState(JSON.parse(localStorage.getItem("user")));
  const [showStudentContent, setShowStudentContent] = useState(false);
  const [showTeacherContent, setShowTeacherContent] = useState(false);

  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = () => {
    authCtx.logout();
  }

  useEffect(() => {
    if(user.roles.includes("ROLE_STUDENT")) {
      setShowStudentContent(true);
    }
  
    if(user.roles.includes("ROLE_TEACHER")) {
      setShowTeacherContent(true);
    }
  }, [user.roles])


  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>Bubex</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <Link to="/auth">Logowanie</Link>
            </li>
          )}
          {isLoggedIn && (showStudentContent || showTeacherContent ) && (
            <li>
              <Link to="/profile">Profil</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <button onClick={logoutHandler}>Wyloguj się</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
