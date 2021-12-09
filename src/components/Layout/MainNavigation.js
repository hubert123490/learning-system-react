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
              <a href="https://webexapis.com/v1/authorize?client_id=Cb469f9350d574789b2363b5e7b9553e56cd40283bb7d9234ec9f3c13b64b41dd&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fteacher%2Fwebex-integration&scope=spark%3Akms%20meeting%3Aparticipants_write%20meeting%3Aschedules_write&state=set_state_here">Spotkania</a>
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
              <Link to="/student/grades">Moje oceny</Link>
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
