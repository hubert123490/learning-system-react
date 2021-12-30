import { findAllSubmissions } from "../../../lib/api/submission-api";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useHttp from "../../../hooks/use-http";
import { useEffect } from "react";
import classes from "./ExamsPreviewSubmissions.module.css"
import Card from "../../UI/Card";
import LoadingSpinner from "../../UI/LoadingSpinner";

const ExamsPreviewSubmissions = () => {
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
        examId: params.examId,
      });
  
      return findSubmissionsRequest;
    }, [findSubmissionsRequest, params]);
  
    const submissionDetailsHandler = (submissionId) => {
      navigate(`${submissionId}`);
    };
  
    return (
      <section className={classes["submissions"]}>
        <h1>Sprawdź uczniów!</h1>
        {findSubmissionsData && findSubmissionsData.length === 0 && (
          <div className={classes["submission"]}>
            <h3>Brak uczniów do sprawdzenia</h3>
            <div>Sprawdzono wszystkich uczniów</div>
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
                  Rozpoczął{" "}
                  {item.startDate.split("T")[0].split("-")[2] +
                    "-" +
                    item.startDate.split("T")[0].split("-")[1] +
                    "-" +
                    item.startDate.split("T")[0].split("-")[0]}{" "}
                  o godzinie: {item.startDate.split("T")[1]}
                </div>
                <div>
                  Zakończył{" "}
                  {item.endDate.split("T")[0].split("-")[2] +
                    "-" +
                    item.endDate.split("T")[0].split("-")[1] +
                    "-" +
                    item.endDate.split("T")[0].split("-")[0]}{" "}
                  o godzinie: {item.endDate.split("T")[1]}
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
}

export default ExamsPreviewSubmissions;