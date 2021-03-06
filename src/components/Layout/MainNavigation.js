import classes from "./MainNavigation.module.css";
import { NavLink } from "react-router-dom";
import { useCallback, useContext, useEffect, useState } from "react";
import AuthContext from "../../store/auth-context";
import logo from "../../assets/logo.png";
import { CgMenu } from "react-icons/cg";
import MobileNavigation from "./MobileNavigation";
import i18next from "i18next";
import { useTranslation } from "react-i18next";

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const [showMobileNav, setShowMobileNav] = useState(false);
  const { t } = useTranslation();
  const languages = [
    {
      code: "EN",
      name: "English",
      country_code: "en",
    },
    {
      code: "PL",
      name: "Polski",
      country_code: "pl",
    },
  ];

  const handleLangChange = (lang) => {
    i18next.changeLanguage(lang)

  };

  const mobileNavHandler = () => {
    setShowMobileNav(true);
  };

  const closeMobileNav = () => {
    setShowMobileNav(false);
  };

  const logoutHandler = useCallback(() => {
    authCtx.logout();
  }, [authCtx]);

  useEffect(() => {}, [isLoggedIn, logoutHandler, authCtx.user]);

  return (
    <>
      <div className={classes["backdrop"]} />
      <header className={classes["header"]}>
        <div>
          <CgMenu
            className={classes["hamburger"]}
            size="40px"
            onClick={mobileNavHandler}
          />
          <NavLink to="/" className={classes.header__brand}>
            <img src={logo} alt={t("MainNavigation__LogoAlt")}></img>
          </NavLink>
        </div>
        {!showMobileNav && (
          <nav className={classes["main-nav"]}>
            <ul className={classes["main-nav__items"]}>
              {!isLoggedIn && (
                <li className={`${classes["main-nav__item"]}`}>
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
                    {t("MainNavigation__LogIn")}
                  </NavLink>
                </li>
              )}
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
                    {t("MainNavigation__MyCourses")}
                  </NavLink>
                </li>
              )}
              {isLoggedIn && authCtx.isTeacher && (
                <li className={classes["main-nav__item"]}>
                  <NavLink
                    to="/teacher/exams-preview/courses"
                    style={({ isActive }) =>
                      isActive
                        ? {
                            color: "#c291e2",
                          }
                        : { color: "white" }
                    }
                  >
                    {t("MainNavigation__Exams")}
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
                    {t("MainNavigation__CheckExams")}
                  </NavLink>
                </li>
              )}
              {isLoggedIn && authCtx.isTeacher && (
                <li className={classes["main-nav__item"]}>
                  <NavLink
                    to="/teacher/assignments-preview/courses"
                    style={({ isActive }) =>
                      isActive
                        ? {
                            color: "#c291e2",
                          }
                        : { color: "white" }
                    }
                  >
                    {t("MainNavigation__Homeworks")}
                  </NavLink>
                </li>
              )}
              {isLoggedIn && authCtx.isTeacher && (
                <li className={classes["main-nav__item"]}>
                  <NavLink
                    to="/teacher/check-assignments"
                    style={({ isActive }) =>
                      isActive
                        ? {
                            color: "#c291e2",
                          }
                        : { color: "white" }
                    }
                  >
                    {t("MainNavigation__CheckHomeworks")}
                  </NavLink>
                </li>
              )}
              {isLoggedIn && authCtx.isTeacher && (
                <li className={classes["main-nav__item"]}>
                  <a href="https://webexapis.com/v1/authorize?client_id=Cb469f9350d574789b2363b5e7b9553e56cd40283bb7d9234ec9f3c13b64b41dd&response_type=code&redirect_uri=https%3A%2F%2Flearning-system-react.herokuapp.com%2Fteacher%2Fwebex-integration&scope=meeting%3Arecordings_read%20meeting%3Aadmin_preferences_write%20meeting%3Aadmin_schedule_write%20meeting%3Aadmin_preferences_read%20meeting%3Aschedules_read%20meeting%3Aparticipants_read%20meeting%3Aadmin_participants_read%20meeting%3Apreferences_write%20meeting%3Arecordings_write%20meeting%3Apreferences_read%20meeting%3Aadmin_recordings_read%20meeting%3Atranscripts_read%20meeting%3Aschedules_write%20spark%3Akms%20meeting%3Acontrols_write%20meeting%3Aadmin_recordings_write%20meeting%3Acontrols_read%20meeting%3Aparticipants_write%20spark-admin%3Atelephony_config_read%20spark-admin%3Atelephony_config_write%20meeting%3Aadmin_schedule_read%20meeting%3Aadmin_transcripts_read&state=set_state_here">
                  {t("MainNavigation__Meetings")}
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
                     {t("MainNavigation__Grades")}
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
                    {t("MainNavigation__MyCourses")}
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
                    {t("MainNavigation__Grades")}
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
                    {t("MainNavigation__Exams")}
                  </NavLink>
                </li>
              )}
              {isLoggedIn && authCtx.isStudent && (
                <li className={classes["main-nav__item"]}>
                  <NavLink
                    to="/student/pending-assignments"
                    style={({ isActive }) =>
                      isActive
                        ? {
                            color: "#c291e2",
                          }
                        : { color: "white" }
                    }
                  >
                   {t("MainNavigation__Homeworks")}
                  </NavLink>
                </li>
              )}
              {isLoggedIn && (
                <li className={classes["main-nav__item"]}>
                  <NavLink
                    to="/profile"
                    style={({ isActive }) =>
                      isActive
                        ? {
                            color: "#c291e2",
                          }
                        : { color: "white" }
                    }
                  >
                    {t("MainNavigation__Profile")}
                  </NavLink>
                </li>
              )}
              {isLoggedIn && (
                <li className={classes["main-nav__item"]}>
                  <button onClick={logoutHandler}>{t("MainNavigation__LogOut")}</button>
                </li>
              )}
              <select
                name="language"
                value={i18next.language}
                onChange={(event) => handleLangChange(event.target.value)}
              >
                {languages.map((lang) => (
                  <option key={lang.country_code} id={lang.name}>
                    {lang.country_code}
                  </option>
                ))}
              </select>
            </ul>
          </nav>
        )}
        {showMobileNav && <MobileNavigation closeMobileNav={closeMobileNav} />}
      </header>
    </>
  );
};

export default MainNavigation;
