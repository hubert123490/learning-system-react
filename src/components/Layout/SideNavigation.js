import classes from "./SideNavigation.module.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const SideNavigation = () => {
  const [showMyCourses, setShowMyCourses] = useState(false);
  const [showMyGrades, setShowMyGrades] = useState(false);

  const showMyCoursesHandler = (event) => {
    setShowMyCourses((prevState) => {
      return !prevState;
    });
  };

  const showMyGradesHandler = (event) => {
    setShowMyGrades((prevState) => {
      return !prevState;
    });
  };

  return (
    <>
      <div className={classes["side-navigation"]}>
        <div>
          <NavLink to="/">Strona główna</NavLink>
        </div>
        <div>
          <a href="javascript:void(0);" onClick={showMyCoursesHandler}>Moje Kursy</a>
          {showMyCourses && (
            <ul>
              <li>
                <NavLink to="/">Kurs 1</NavLink>
              </li>
              <li>
                <NavLink to="/">Kurs 2</NavLink>
              </li>
            </ul>
          )}
        </div>
        <div>
        <a href="javascript:void(0);" onClick={showMyGradesHandler}>Oceny</a>
        {showMyGrades && <ul>
              <li>
                <NavLink to="/">Kurs 1</NavLink>
              </li>
              <li>
                <NavLink to="/">Kurs 2</NavLink>
              </li>
            </ul>}
        </div>
      </div>
    </>
  );
};

export default SideNavigation;
