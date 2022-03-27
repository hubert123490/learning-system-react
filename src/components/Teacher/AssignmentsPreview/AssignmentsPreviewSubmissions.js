import { useNavigate, useParams } from "react-router-dom";
import useHttp from "../../../hooks/use-http";
import { useEffect } from "react";
import { findAllSubmissions } from "../../../lib/api/task-submission-api";
import classes from "./AssignmentsPreviewSubmissions.module.css";
import Card from "../../UI/Card";
import LoadingSpinner from "../../UI/LoadingSpinner";
import { useTranslation } from "react-i18next";

const AssignmentsPreviewSubmissions = () => {
  const { t } = useTranslation();
  const params = useParams();
  const navigate = useNavigate();
  const {
    sendRequest: findSubmissionsRequest,
    data: findSubmissionsData,
    error: findSubmissionsError,
  } = useHttp(findAllSubmissions, true);

  useEffect(() => {
    findSubmissionsRequest({
      courseId: params.courseId,
      assignmentId: params.assignmentId,
    });
  }, [findSubmissionsRequest, params]);

  const submissionDetailsHandler = (submissionId) => {
    navigate(`${submissionId}`);
  };

  return (
    <section className={classes["submissions"]}>
      <h1>{t("Teacher__AssignmentsPreview_CheckStudents")}</h1>
      {findSubmissionsData && findSubmissionsData.length === 0 && (
        <div className={classes["submission"]}>
          <h3>{t("Teacher__AssignmentsPreview_AllChecked")}</h3>
          <div>{t("Teacher__AssignmentsPreview_NoStudents")}</div>
        </div>
      )}
      {findSubmissionsData ? (
        findSubmissionsData.map((item) => (
          <div key={item.id}>
            <div
              onClick={() => submissionDetailsHandler(item.id)}
              className={classes["submission"]}
            >
              <h3>
                {item.studentFirstName} {item.studentLastName}
              </h3>
              <div>
                {item.submissionDate && t("Teacher__AssignmentsPreview_AddedFile")}{" "}
                {item.submissionDate &&
                  item.submissionDate.split("T")[0].split("-")[2] +
                    "-" +
                    item.submissionDate.split("T")[0].split("-")[1] +
                    "-" +
                    item.submissionDate.split("T")[0].split("-")[0]}{" "}
                {item.submissionDate && t("Teacher__AssignmentsPreview_At")}{" "}
                {item.submissionDate && item.submissionDate.split("T")[1]}
                {!item.submissionDate && t("Teacher__AssignmentsPreview_NoFile")}
              </div>
            </div>
          </div>
        ))
      ) : findSubmissionsError ? (
        <div className={classes["error"]}>
          <h1>{findSubmissionsError}</h1>
        </div>
      ) : (
        <Card>
          <div>
            <LoadingSpinner />
          </div>
        </Card>
      )}
    </section>
  );
};

export default AssignmentsPreviewSubmissions;
