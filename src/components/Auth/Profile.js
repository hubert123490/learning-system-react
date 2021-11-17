import { useState } from "react";
import classes from "./Profile.module.css";

const Profile = () => {
  const [user] = useState(JSON.parse(localStorage.getItem("user")));

  return (
    <div className={classes.profile}>
      <h1>Your Profile</h1>
      <div>
        <span className={classes.label}>First name: </span>
        {user.firstName}
      </div>
      <div>
        <span className={classes.label}>Last name: </span>
        {user.lastName}
      </div>
      <div>
        <span className={classes.label}>Email: </span>
        {user.email}
      </div>
      <div>
        <span className={classes.label}>Title: </span>
        {user.title}
      </div>
      <div>
        <span className={classes.label}>Roles: </span>
        {user.roles.map((role) => role + ",")}
      </div>
    </div>
  );
};

export default Profile;
