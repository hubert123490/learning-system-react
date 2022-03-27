import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { findUncheckedSubmissions } from "../../../lib/api/submission-api";
import useHttp from "../../../hooks/use-http";
import classes from "./CheckSubmissions.module.css";
import Card from "../../UI/Card";
import LoadingSpinner from "../../UI/LoadingSpinner";
import { useTranslation } from "react-i18next";

const CheckSubmissions = () => {
  const { t } = useTranslation();
  const params = useParams();
  const navigate = useNavigate();
  const {
    sendRequest: findSubmissionsRequest,
    data: findSubmissionsData,
    error: findSubmissionsError,
  } = useHttp(findUncheckedSubmissions, true);

  useEffect(() => {
    findSubmissionsRequest({
      courseId: params.courseId,
      examId: params.examId,
    });

    return findSubmissionsRequest;
  }, [findSubmissionsRequest, params]);

  const submissionDetailsHandler = (submissionId) => {
    navigate(`${submissionId}`);
  };

  return (
    <section className={classes["submissions"]}>
      <h1>{t("Teacher__Submissions_CheckStudents")}</h1>
      {findSubmissionsData && findSubmissionsData.length === 0 && (
        <div className={classes["submission"]}>
          <h3>{t("Teacher__Submissions_NoSubmissions")}</h3>
          <div>{t("Teacher__Submissions_SubmissionsChecked")}</div>
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
              {t("Teacher__Submissions_Started")}{" "}
                {item.startDate.split("T")[0].split("-")[2] +
                  "-" +
                  item.startDate.split("T")[0].split("-")[1] +
                  "-" +
                  item.startDate.split("T")[0].split("-")[0]}{" "}
                {t("Teacher__Submissions_At")} {item.startDate.split("T")[1]}
              </div>
              <div>
              {t("Teacher__Submissions_Ended")}{" "}
                {item.endDate.split("T")[0].split("-")[2] +
                  "-" +
                  item.endDate.split("T")[0].split("-")[1] +
                  "-" +
                  item.endDate.split("T")[0].split("-")[0]}{" "}
                {t("Teacher__Submissions_At")}  {item.endDate.split("T")[1]}
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

export default CheckSubmissions;
