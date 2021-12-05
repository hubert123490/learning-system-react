import classes from "./MainNavigation.module.css";
import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import AuthContext from "../../store/auth-context";

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [showStudentContent, setShowStudentContent] = useState(false);
  const [showTeacherContent, setShowTeacherContent] = useState(false);

  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = () => {
    authCtx.logout();
  };

 

  useEffect(() => {
    if (user) {
      if (user.roles.includes("ROLE_STUDENT")) {
        setShowStudentContent(true);
      } else if (user.roles.includes("ROLE_TEACHER")) {
        setShowTeacherContent(true);
      }
    } 
  }, [user, showStudentContent, showTeacherContent, isLoggedIn, logoutHandler, authCtx.user]);

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
          {isLoggedIn && (authCtx.isStudent || authCtx.isTeacher) && (
            <li>
              <Link to="/profile">Profil</Link>
            </li>
          )}
          {isLoggedIn && authCtx.isTeacher && (
            <li>
              <Link to="/teacher">Panel nauczyciela</Link>
            </li>
          )}
          {isLoggedIn && authCtx.isTeacher && (
            <li>
              <Link to="/teacher/my-courses">Moje kursy</Link>
            </li>
          )}
          {isLoggedIn && authCtx.isTeacher && (
            <li>
              <Link to="/teacher/check-courses">Sprawdź egzaminy</Link>
            </li>
          )}
           {isLoggedIn && authCtx.isTeacher && (
            <li>
              <Link to="/teacher/grades">Oceny</Link>
            </li>
          )}
          {isLoggedIn && authCtx.isStudent && (
            <li>
              <Link to="/student/my-courses">Moje kursy</Link>
            </li>
          )}
          {isLoggedIn && authCtx.isStudent && (
            <li>
              <Link to="/student/pending-exams">Egzaminy</Link>
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
