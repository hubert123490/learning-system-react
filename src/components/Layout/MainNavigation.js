import classes from "./MainNavigation.module.css";
import { NavLink } from "react-router-dom";
import { useCallback, useContext, useEffect } from "react";
import AuthContext from "../../store/auth-context";
import logo from "../../assets/logo.png";

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = useCallback(() => {
    authCtx.logout();
  }, [authCtx]);

  useEffect(() => {
  }, [
    isLoggedIn,
    logoutHandler,
    authCtx.user,
  ]);

  return (
    <header className={classes["header"]}>
      <div>
        <NavLink to="/" className={classes.header__brand}>
          <img src={logo} alt="Bubex - platforma e-learningowa"></img>
        </NavLink>
      </div>
      <nav className={classes["main-nav"]}>
        <ul className={classes["main-nav__items"]}>
          {!isLoggedIn && (
            <li className={classes["main-nav__item"]}>
              <NavLink
                to="/auth"
                style={({ isActive }) =>
                  isActive
                    ? {
                        color: "#c291e2",
                      }
                    : { color: "white" }
                }
              >
                Logowanie
              </NavLink>
            </li>
          )}
          {/* {isLoggedIn && (authCtx.isStudent || authCtx.isTeacher) && (
            <li className={classes["main-nav__item"]}>
              <NavLink
                to="/profile"
                style={({ isActive }) =>
                  isActive
                    ? {
                        color: "#c291e2",
                      }
                    : { color: "" }
                }
              >
                Profil
              </NavLink>
            </li>
          )} */}
          {/* {isLoggedIn && authCtx.isTeacher && (
            <li className={classes["main-nav__item"]}>
              <NavLink
                to="/teacher/teacher-panel"
                style={({ isActive }) =>
                  isActive
                    ? {
                        color: "#c291e2",
                      }
                    : { color: "white" }
                }
              >
                Panel nauczyciela
              </NavLink>
            </li>
          )} */}
          {isLoggedIn && authCtx.isTeacher && (
            <li className={classes["main-nav__item"]}>
              <NavLink
                to="/teacher/courses"
                style={({ isActive }) =>
                  isActive
                    ? {
                        color: "#c291e2",
                      }
                    : { color: "white" }
                }
              >
                Moje kursy
              </NavLink>
            </li>
          )}
          {isLoggedIn && authCtx.isTeacher && (
            <li className={classes["main-nav__item"]}>
              <NavLink
                to="/teacher/check-exams"
                style={({ isActive }) =>
                  isActive
                    ? {
                        color: "#c291e2",
                      }
                    : { color: "white" }
                }
              >
                Sprawdź egzaminy
              </NavLink>
            </li>
          )}
          {isLoggedIn && authCtx.isTeacher && (
            <li className={classes["main-nav__item"]}>
              <a href="https://webexapis.com/v1/authorize?client_id=Cb469f9350d574789b2363b5e7b9553e56cd40283bb7d9234ec9f3c13b64b41dd&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fteacher%2Fwebex-integration&scope=spark%3Akms%20meeting%3Aparticipants_write%20meeting%3Aschedules_write&state=set_state_here">
                Spotkania
              </a>
            </li>
          )}
          {isLoggedIn && authCtx.isTeacher && (
            <li className={classes["main-nav__item"]}>
              <NavLink
                to="/teacher/grades"
                style={({ isActive }) =>
                  isActive
                    ? {
                        color: "#c291e2",
                      }
                    : { color: "white" }
                }
              >
                Oceny
              </NavLink>
            </li>
          )}
          {isLoggedIn && authCtx.isStudent && (
            <li className={classes["main-nav__item"]}>
              <NavLink
                to="/student/my-courses"
                style={({ isActive }) =>
                  isActive
                    ? {
                        color: "#c291e2",
                      }
                    : { color: "white" }
                }
              >
                Moje kursy
              </NavLink>
            </li>
          )}
          {isLoggedIn && authCtx.isStudent && (
            <li className={classes["main-nav__item"]}>
              <NavLink
                to="/student/grades"
                style={({ isActive }) =>
                  isActive
                    ? {
                        color: "#c291e2",
                      }
                    : { color: "white" }
                }
              >
                Moje oceny
              </NavLink>
            </li>
          )}
          {isLoggedIn && authCtx.isStudent && (
            <li className={classes["main-nav__item"]}>
              <NavLink
                to="/student/pending-exams"
                style={({ isActive }) =>
                  isActive
                    ? {
                        color: "#c291e2",
                      }
                    : { color: "white" }
                }
              >
                Egzaminy
              </NavLink>
            </li>
          )}
          {isLoggedIn && (
            <li className={classes["main-nav__item"]}>
              <button onClick={logoutHandler}>Wyloguj się</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
