import { useParams } from "react-router";
import { useNavigate } from "react-router";
import useHttp from "../../../hooks/use-http";
import { useEffect } from "react";
import classes from "./CheckExams.module.css";
import { getUncheckedExams } from "../../../lib/api/exam-api";
import Card from "../../UI/Card";
import image from "../../../assets/exam.jpg";
import LoadingSpinner from "../../UI/LoadingSpinner";
import { useTranslation } from "react-i18next";

const CheckExams = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const params = useParams();

  const {
    sendRequest: getExamsRequest,
    data: getExamsData,
    error: getExamsError,
  } = useHttp(getUncheckedExams, true);

  useEffect(() => {
    getExamsRequest();
    return getExamsRequest;
  }, [getExamsRequest, params.courseId]);

  const checkDetailsHandler = (courseId, examId) => {
    navigate(`courses/${courseId}/exams/${examId}/submissions`);
  };

  return (
    <section className={classes["check-exams"]}>
      <h1>{t("Teacher__Exams_CheckExam")}</h1>
      <div className={classes["exams"]}>
        {getExamsData && getExamsData.length === 0 && (
          <div className={classes["notification"]}>
            {t("Teacher__Exams_NoExams")}
          </div>
        )}
        {getExamsData ? (
          getExamsData.map((item) => (
            <div key={item.id} className={classes["exam"]}>
              <div>
                <div
                  onClick={() => {
                    checkDetailsHandler(item.courseId, item.id);
                  }}
                >
                  <div className={classes["exam__image-container"]}>
                    <img src={image} alt="exam" />
                  </div>
                  <h2 className={classes["exam-description__title-course"]}>
                    {item.courseName}
                  </h2>
                  <h2 className={classes["exam-description__title-exam"]}>
                    {item.name}
                  </h2>
                  <div className={classes["exam-description"]}>
                    <span className={classes["category-description__value"]}>
                      {item.description}
                    </span>
                  </div>
                  <div className={classes["exam-description__date-container"]}>
                    {t("Teacher__Exams_From")}{" "}
                    {item.startDate.split("T")[0].split("-")[2] +
                      "-" +
                      item.startDate.split("T")[0].split("-")[1] +
                      "-" +
                      item.startDate.split("T")[0].split("-")[0]}{" "}
                    {item.startDate.split("T")[1]}
                  </div>
                  <div className={classes["exam-description__date-container"]}>
                  {t("Teacher__Exams_To")}{" "}
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
        ) : getExamsError ? (
          <div className={classes["error"]}>
            <h1>{getExamsError}</h1>
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

export default CheckExams;
