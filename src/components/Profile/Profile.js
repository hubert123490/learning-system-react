import { useState } from "react";
import classes from "./Profile.module.css";

const Profile = () => {
  const [user] = useState(JSON.parse(localStorage.getItem("user")));

  return (
    <div className={classes.profile}>
      <h1>Twój profil</h1>
      <div className={classes["profile-details"]}>
        <div>
          <span className={classes.label}>Imię: </span>
          {user.firstName}
        </div>
        <div>
          <span className={classes.label}>Nazwisko: </span>
          {user.lastName}
        </div>
        <div>
          <span className={classes.label}>Email: </span>
          {user.email}
        </div>
        <div>
          <span className={classes.label}>Tytuł naukowy: </span>
          {user.title === "Student" ? <>Uczeń</> : ""}
          {user.title === "Professor" ? <>Profesor</> : ""}
          {user.title === "Bachelor" ? <>Inżynier</> : ""}
          {user.title === "Master" ? <>Magister</> : ""}
        </div>
        <div>
          <span className={classes.label}>Rola w systemie: </span>
          {user.roles.map((role) => role)}
        </div>
      </div>
    </div>
  );
};

export default Profile;
