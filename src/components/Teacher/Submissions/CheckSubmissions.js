import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { findUncheckedSubmissions } from "../../../lib/api/submission-api";
import useHttp from "../../../hooks/use-http";
import classes from "./CheckSubmissions.module.css";
import Card from "../../UI/Card";
import LoadingSpinner from "../../UI/LoadingSpinner";

const CheckSubmissions = () => {
  const params = useParams();
  const navigate = useNavigate();
  const {
    sendRequest: findSubmissionsRequest,
    data: findSubmissionsData,
    error: findSubmissionsError,
  } = useHttp(findUncheckedSubmissions, true);

  console.log(findSubmissionsData);

  useEffect(() => {
    findSubmissionsRequest({
      courseId: params.courseId,
      examId: params.examId,
    });

    return findSubmissionsRequest;
  }, [findSubmissionsRequest, params]);

  const submissionDetailsHandler = (submissionId) => {
    navigate(
      `/teacher/check-courses/${params.courseId}/exams/${params.examId}/submissions/${submissionId}`
    );
  };

  return (
    <section className={classes.submissions}>
      <h1>Sprawdź uczniów!</h1>
      {findSubmissionsData && findSubmissionsData.length === 0 && (
        <Card>
          <div>
            <h3>Brak uczniów do sprawdzenia</h3>
            <div>Sprawdzono wszystkich uczniów</div>
          </div>
        </Card>
      )}
      {findSubmissionsData ? (
        findSubmissionsData.map((item) => (
          <div key={item.id} className={classes.submission}>
            <Card>
              <div onClick={() => submissionDetailsHandler(item.id)}>
                <h3>
                  {item.studentFirstName} {item.studentLastName}
                </h3>
                <div>
                  Rozpoczął {item.startDate.split("T")[0]} o godzinie:{" "}
                  {item.startDate.split("T")[1]}
                </div>
                <div>
                  Zakończył {item.endDate.split("T")[0]} o godzinie:{" "}
                  {item.endDate.split("T")[1]}
                </div>
              </div>
            </Card>
          </div>
        ))
      ) : findSubmissionsError ? (
        <div className={classes.error}>
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
