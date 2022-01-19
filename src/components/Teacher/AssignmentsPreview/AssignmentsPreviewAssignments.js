import { useNavigate, useParams } from "react-router-dom";
import { getCourseAssignments } from "../../../lib/api/assignment-api";
import useHttp from "../../../hooks/use-http";
import { useEffect } from "react";
import classes from "./AssignmentsPreviewAssignments.module.css";
import Card from "../../UI/Card";
import LoadingSpinner from "../../UI/LoadingSpinner";
import image from "../../../assets/assignment.jpg";

const AssignmentsPreviewAssignments = () => {
  const params = useParams();
  const navigate = useNavigate();
  const {
    sendRequest: getCourseAssignmentsRequest,
    data: getCourseAssignmentsData,
    error: getCourseAssignmentsError,
  } = useHttp(getCourseAssignments, true);

  useEffect(() => {
    getCourseAssignmentsRequest({
      courseId: params.courseId,
    });
  }, [getCourseAssignmentsRequest, params]);

  const assignmentDetailsHandler = (assignmentId) => {
    navigate(`${assignmentId}/submissions`);
  };

  return (
    <section className={classes["my-assignments"]}>
      <h1>Wybierz prace!</h1>
      <div className={classes["assignments"]}>
        {getCourseAssignmentsData && getCourseAssignmentsData.length === 0 && (
          <div className={classes["notification"]}>
            Brak prac do wyświetlenia
          </div>
        )}
        {getCourseAssignmentsData ? (
          getCourseAssignmentsData.map((item) => (
            <div key={item.id} className={classes["assignment"]}>
              <div>
                <div
                  onClick={() => {
                    assignmentDetailsHandler(item.id);
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
                    Od:{" "}
                    {item.startDate.split("T")[0].split("-")[2] +
                      "-" +
                      item.startDate.split("T")[0].split("-")[1] +
                      "-" +
                      item.startDate.split("T")[0].split("-")[0]}{" "}
                    {item.startDate.split("T")[1]}
                  </div>
                  <div className={classes["assignment-description__date-container"]}>
                    Do:{" "}
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
        ) : getCourseAssignmentsError ? (
          <div className={classes["error"]}>
            <h1>{getCourseAssignmentsError}</h1>
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

export default AssignmentsPreviewAssignments;
