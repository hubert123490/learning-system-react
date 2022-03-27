import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import { getPendingAssignments } from "../../lib/api/assignment-api";
import classes from "./MyAssignmentsStudent.module.css";
import Card from "../UI/Card";
import LoadingSpinner from "../UI/LoadingSpinner";
import image from "../../assets/assignment.jpg";
import { useTranslation } from "react-i18next";

const MyAssignmentsStudent = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    sendRequest: getPendingAssignmentsRequest,
    data: getPendingAssignmentsData,
    error: getPendingAssignmentsError,
  } = useHttp(getPendingAssignments, true);

  useEffect(() => {
    getPendingAssignmentsRequest();
  }, [getPendingAssignmentsRequest]);

  const assignmentDetailsHandler = (courseId, assignmentId) => {
    navigate(`/student/courses/${courseId}/assignments/${assignmentId}`);
  };

  return (
    <section className={classes["my-assignments"]}>
      <h1>{t("Student__Assignment_ChooseAssignment")}</h1>
      <div className={classes["assignments"]}>
        {getPendingAssignmentsData &&
          getPendingAssignmentsData.length === 0 && (
            <div className={classes["notification"]}>
              {t("Student__Assignment_NoAssignments")}
            </div>
          )}
        {getPendingAssignmentsData ? (
          getPendingAssignmentsData.map((item) => (
            <div key={item.id} className={classes["assignment"]}>
              <div>
                <div
                  onClick={() => {
                    assignmentDetailsHandler(item.courseId, item.id);
                  }}
                >
                  <div className={classes["assignment__image-container"]}>
                    <img src={image} alt="assignment" />
                  </div>
                  <h2
                    className={classes["assignment-description__title-course"]}
                  >
                    {item.courseName}
                  </h2>
                  <h2
                    className={
                      classes["assignment-description__title-assignment"]
                    }
                  >
                    {item.name}
                  </h2>
                  <div className={classes["assignment-description"]}>
                    <span className={classes["category-description__value"]}>
                      {item.description}
                    </span>
                  </div>
                  <div className={classes["assignment-description__date-container"]}>
                  {t("Student__Assignment_From")}{" "}
                    {item.startDate.split("T")[0].split("-")[2] +
                      "-" +
                      item.startDate.split("T")[0].split("-")[1] +
                      "-" +
                      item.startDate.split("T")[0].split("-")[0]}{" "}
                    {item.startDate.split("T")[1]}
                  </div>
                  <div className={classes["assignment-description__date-container"]}>
                  {t("Student__Assignment_To")}{" "}
                    {item.endDate.split("T")[0].split("-")[2] +
                      "-" +
                      item.endDate.split("T")[0].split("-")[1] +
                      "-" +
                      item.endDate.split("T")[0].split("-")[0]}{" "}
                    {item.endDate.split("T")[1]}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : getPendingAssignmentsError ? (
          <div className={classes["error"]}>
            <h1>{getPendingAssignmentsError}</h1>
          </div>
        ) : (
          <Card>
            <div>
              <LoadingSpinner />
            </div>
          </Card>
        )}
      </div>
    </section>
  );
};

export default MyAssignmentsStudent;
