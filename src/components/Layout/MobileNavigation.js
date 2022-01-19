import { useCallback } from "react";
import classes from "./MobileNavigation.module.css"
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";

const MobileNavigation = (props) => {
    const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
    const logoutHandler = useCallback(() => {
        authCtx.logout();
      }, [authCtx]);
    
      useEffect(() => {}, [isLoggedIn, logoutHandler, authCtx.user]);

    return (
        <nav className={classes["mobile-nav"]}>
        <ul className={classes["mobile-nav__items"]}>
          {!isLoggedIn && (
            <li className={`${classes["mobile-nav__item"]}`}>
              <NavLink
                to="/auth"
                style={({ isActive }) =>
                  isActive
                    ? {
                        color: "#38015c",
                      }
                    : { color: "white" }
                }
                onClick={props.closeMobileNav}
              >
                Logowanie
              </NavLink>
            </li>
          )}
          {isLoggedIn && authCtx.isTeacher && (
            <li className={classes["mobile-nav__item"]}>
              <NavLink
                to="/teacher/courses"
                style={({ isActive }) =>
                  isActive
                    ? {
                        color: "#38015c",
                      }
                    : { color: "black" }
                }
                onClick={props.closeMobileNav}
              >
                Moje kursy
              </NavLink>
            </li>
          )}
          {isLoggedIn && authCtx.isTeacher && (
            <li className={classes["mobile-nav__item"]}>
              <NavLink
                to="/teacher/exams-preview/courses"
                style={({ isActive }) =>
                  isActive
                    ? {
                        color: "#38015c",
                      }
                    : { color: "white" }
                }
                onClick={props.closeMobileNav}
              >
                Egzaminy
              </NavLink>
            </li>
          )}
          {isLoggedIn && authCtx.isTeacher && (
            <li className={classes["mobile-nav__item"]}>
              <NavLink
                to="/teacher/check-exams"
                style={({ isActive }) =>
                  isActive
                    ? {
                        color: "#38015c",
                      }
                    : { color: "white" }
                }
                onClick={props.closeMobileNav}
              >
                Sprawdź egzaminy
              </NavLink>
            </li>
          )}
          {isLoggedIn && authCtx.isTeacher && (
            <li className={classes["mobile-nav__item"]}>
              <NavLink
                to="/teacher/assignments-preview/courses"
                style={({ isActive }) =>
                  isActive
                    ? {
                        color: "#38015c",
                      }
                    : { color: "white" }
                }
                onClick={props.closeMobileNav}
              >
                Prace
              </NavLink>
            </li>
          )}
          {isLoggedIn && authCtx.isTeacher && (
            <li className={classes["mobile-nav__item"]}>
              <NavLink
                to="/teacher/check-assignments"
                style={({ isActive }) =>
                  isActive
                    ? {
                        color: "#38015c",
                      }
                    : { color: "white" }
                }
                onClick={props.closeMobileNav}
              >
                Sprawdź prace
              </NavLink>
            </li>
          )}
          {isLoggedIn && authCtx.isTeacher && (
            <li className={classes["mobile-nav__item"]}>
              <a  onClick={props.closeMobileNav} href="https://webexapis.com/v1/authorize?client_id=Cb469f9350d574789b2363b5e7b9553e56cd40283bb7d9234ec9f3c13b64b41dd&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fteacher%2Fwebex-integration&scope=meeting%3Arecordings_read%20meeting%3Aadmin_preferences_write%20meeting%3Aadmin_schedule_write%20meeting%3Aadmin_preferences_read%20meeting%3Aschedules_read%20meeting%3Aparticipants_read%20meeting%3Aadmin_participants_read%20meeting%3Apreferences_write%20meeting%3Arecordings_write%20meeting%3Apreferences_read%20meeting%3Aadmin_recordings_read%20meeting%3Atranscripts_read%20meeting%3Aschedules_write%20spark%3Akms%20meeting%3Acontrols_write%20meeting%3Aadmin_recordings_write%20meeting%3Acontrols_read%20meeting%3Aparticipants_write%20spark-admin%3Atelephony_config_read%20spark-admin%3Atelephony_config_write%20meeting%3Aadmin_schedule_read%20meeting%3Aadmin_transcripts_read&state=set_state_here">
                Spotkania
              </a>
            </li>
          )}
          {isLoggedIn && authCtx.isTeacher && (
            <li className={classes["mobile-nav__item"]}>
              <NavLink
                to="/teacher/grades"
                style={({ isActive }) =>
                  isActive
                    ? {
                        color: "#38015c",
                      }
                    : { color: "white" }
                }
                onClick={props.closeMobileNav}
              >
                Oceny
              </NavLink>
            </li>
          )}
          {isLoggedIn && authCtx.isStudent && (
            <li className={classes["mobile-nav__item"]}>
              <NavLink
                to="/student/my-courses"
                style={({ isActive }) =>
                  isActive
                    ? {
                        color: "#38015c",
                      }
                    : { color: "white" }
                }
                onClick={props.closeMobileNav}
              >
                Moje kursy
              </NavLink>
            </li>
          )}
          {isLoggedIn && authCtx.isStudent && (
            <li className={classes["mobile-nav__item"]}>
              <NavLink
                to="/student/grades"
                style={({ isActive }) =>
                  isActive
                    ? {
                        color: "#38015c",
                      }
                    : { color: "white" }
                }
                onClick={props.closeMobileNav}
              >
                Moje oceny
              </NavLink>
            </li>
          )}
          {isLoggedIn && authCtx.isStudent && (
            <li className={classes["mobile-nav__item"]}>
              <NavLink
                to="/student/pending-exams"
                style={({ isActive }) =>
                  isActive
                    ? {
                        color: "#38015c",
                      }
                    : { color: "white" }
                }
                onClick={props.closeMobileNav}
              >
                Egzaminy
              </NavLink>
            </li>
          )}
          {isLoggedIn && authCtx.isStudent && (
            <li className={classes["mobile-nav__item"]}>
              <NavLink
                to="/student/pending-assignments"
                style={({ isActive }) =>
                  isActive
                    ? {
                        color: "#38015c",
                      }
                    : { color: "white" }
                }
                onClick={props.closeMobileNav}
              >
                Prace
              </NavLink>
            </li>
          )}
          {isLoggedIn  && (
            <li className={classes["mobile-nav__item"]}>
              <NavLink
                to="/profile"
                style={({ isActive }) =>
                  isActive
                    ? {
                        color: "#38015c",
                      }
                    : { color: "white" }
                }
                onClick={props.closeMobileNav}
              >
                Profil
              </NavLink>
            </li>
          )}
          {isLoggedIn && (
            <li className={classes["mobile-nav__item"]}>
              <button onClick={() => {logoutHandler(); props.closeMobileNav();}}>Wyloguj się</button>
            </li>
          )}
          <li className={classes["mobile-nav__item"]}>
              <button onClick={props.closeMobileNav}>Zamknij menu</button>
            </li>
        </ul>
      </nav>
    )
}

export default MobileNavigation