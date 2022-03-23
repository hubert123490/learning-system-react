import { useState } from "react";
import classes from "./Profile.module.css";
import { useTranslation } from "react-i18next";

const Profile = () => {
  const [user] = useState(JSON.parse(localStorage.getItem("user")));
  const { t } = useTranslation();

  return (
    <div className={classes.profile}>
      <h1>{t("Profile__Title")}</h1>
      <div className={classes["profile-details"]}>
        <div>
          <span className={classes.label}>{t("Profile__FirstName")}</span>
          {user.firstName}
        </div>
        <div>
          <span className={classes.label}>{t("Profile__LastName")}</span>
          {user.lastName}
        </div>
        <div>
          <span className={classes.label}>{t("Profile__Email")}</span>
          {user.email}
        </div>
        <div>
          <span className={classes.label}>{t("Profile__AcademicTitle")}</span>
          {user.title === "Student" ? <>{t("Profile__Student")}</> : ""}
          {user.title === "Professor" ? <>{t("Profile__Professor")}</> : ""}
          {user.title === "Bachelor" ? <>{t("Profile__PHD")}</> : ""}
          {user.title === "Master" ? <>{t("Profile__Master")}</> : ""}
        </div>
        <div>
          <span className={classes.label}>{t("Profile__SystemRole")}</span>
          {user.roles.map((role) => role)}
        </div>
      </div>
    </div>
  );
};

export default Profile;
