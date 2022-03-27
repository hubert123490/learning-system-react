import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import useHttp from "../../../hooks/use-http";
import { getUncheckedAssignments } from "../../../lib/api/assignment-api";
import { useEffect } from "react";
import Card from "../../UI/Card";
import classes from "./CheckAssignments.module.css";
import image from "../../../assets/assignment.jpg";
import LoadingSpinner from "../../UI/LoadingSpinner";
import { useTranslation } from "react-i18next";

const CheckAssignments = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { t } = useTranslation();
  const {
    sendRequest: getAssignmentsRequest,
    data: getAssignmentsData,
    error: getAssignmentsError,
  } = useHttp(getUncheckedAssignments, true);

  useEffect(() => {
    getAssignmentsRequest();
  }, [getAssignmentsRequest, params]);

  const checkDetailsHandler = (courseId, assignmentId) => {
    navigate(`courses/${courseId}/assignments/${assignmentId}/submissions`);
  };

  return (
    <section className={classes["check-assignments"]}>
      <h1>{t("Teacher__AssignmentsPreview_ChooseAssignment")}</h1>
      <div className={classes["assignments"]}>
        {getAssignmentsData && getAssignmentsData.length === 0 && (
          <div className={classes["notification"]}>
            {t("Teacher__AssignmentsPreview_NoAssignments")}
          </div>
        )}
        {getAssignmentsData ? (
          getAssignmentsData.map((item) => (
            <div key={item.id} className={classes["assignment"]}>
              <div>
                <div
                  onClick={() => {
                    checkDetailsHandler(item.courseId, item.id);
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
                  <div
                    className={
                      classes["assignment-description__date-container"]
                    }
                  >
                    {t("Teacher__AssignmentsPreview_From")}{" "}
                    {item.startDate.split("T")[0].split("-")[2] +
                      "-" +
                      item.startDate.split("T")[0].split("-")[1] +
                      "-" +
                      item.startDate.split("T")[0].split("-")[0]}{" "}
                    {item.startDate.split("T")[1]}
                  </div>
                  <div
                    className={
                      classes["assignment-description__date-container"]
                    }
                  >
                    {t("Teacher__AssignmentsPreview_To")}{" "}
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
        ) : getAssignmentsError ? (
          <div className={classes["error"]}>
            <h1>{getAssignmentsError}</h1>
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

export default CheckAssignments;
