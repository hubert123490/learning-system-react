import { useState } from "react";
import classes from "./Profile.module.css";

const Profile = () => {
  const [user] = useState(JSON.parse(localStorage.getItem("user")));

  return (
    <div className={classes.profile}>
      <h1>Your Profile</h1>
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
        {user.title}
      </div>
      <div>
        <span className={classes.label}>Rola w systemie: </span>
        {user.roles.map((role) => role)}
      </div>
    </div>
  );
};

export default Profile;
