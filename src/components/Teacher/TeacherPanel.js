import classes from "./TeacherPanel.module.css";
import { NavLink } from "react-router-dom";

const TeacherPanel = () => {
  return (
    <div className={classes.teacherPanel}>
      <h1>Twój Panel</h1>
      <h4>Wybierz akcję: </h4><br/>
      <div className={classes.gridContainer}>
          <NavLink to="/teacher/create-course" className={classes.gridItem}><button>Stwórz kurs</button></NavLink>
      </div>
    </div>
  );
};

export default TeacherPanel;
