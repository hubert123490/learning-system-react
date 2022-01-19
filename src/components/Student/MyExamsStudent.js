import { useNavigate } from "react-router";
import { getPendingExams } from "../../lib/api/exam-api";
import useHttp from "../../hooks/use-http";
import { useEffect } from "react";
import classes from "./MyExamsStudent.module.css";
import Card from "../UI/Card";
import LoadingSpinner from "../UI/LoadingSpinner";
import image from "../../assets/exam.jpg";

const MyExamsStudent = () => {
  const navigate = useNavigate();
  const {
    sendRequest: getPendingExamsRequest,
    data: getPendingExamsData,
    error: getPendingExamsError,
  } = useHttp(getPendingExams, true);

  useEffect(() => {
    getPendingExamsRequest();

    return getPendingExamsRequest;
  }, [getPendingExamsRequest]);

  const examDetailsHandler = (courseId, examId) => {
    navigate(`/student/courses/${courseId}/exams/${examId}`);
  };

  return (
    <section className={classes["my-exams"]}>
      <h1>Wybierz egzamin!</h1>
      <div className={classes["exams"]}>
        {getPendingExamsData && getPendingExamsData.length === 0 && (
          <div className={classes["notification"]}>
            Brak egzaminów do wyświetlenia
          </div>
        )}
        {getPendingExamsData ? (
          getPendingExamsData.map((item) => (
            <div key={item.id} className={classes["exam"]}>
              <div>
                <div
                  onClick={() => {
                    examDetailsHandler(item.courseId, item.id);
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
                    Od:{" "}
                    {item.startDate.split("T")[0].split("-")[2] +
                      "-" +
                      item.startDate.split("T")[0].split("-")[1] +
                      "-" +
                      item.startDate.split("T")[0].split("-")[0]}{" "}
                    {item.startDate.split("T")[1]}
                  </div>
                  <div className={classes["exam-description__date-container"]}>
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
        ) : getPendingExamsError ? (
          <div className={classes["error"]}>
            <h1>{getPendingExamsError}</h1>
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

export default MyExamsStudent;
