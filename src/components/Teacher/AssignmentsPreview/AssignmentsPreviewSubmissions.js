import { useNavigate, useParams } from "react-router-dom";
import useHttp from "../../../hooks/use-http";
import { useEffect } from "react";
import { findAllSubmissions } from "../../../lib/api/task-submission-api";
import classes from "./AssignmentsPreviewSubmissions.module.css"
import Card from "../../UI/Card"
import LoadingSpinner from "../../UI/LoadingSpinner";

const AssignmentsPreviewSubmissions = () => {
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
                    {item.submissionDate && "Ostatnio dodał plik"}{" "}
                    {item.submissionDate && item.submissionDate.split("T")[0].split("-")[2] +
                      "-" +
                      item.submissionDate.split("T")[0].split("-")[1] +
                      "-" +
                      item.submissionDate.split("T")[0].split("-")[0]}{" "}
                    {item.submissionDate && "o godzinie:"} {item.submissionDate && item.submissionDate.split("T")[1]}
                    {!item.submissionDate && "Nie dodał żadnej pracy"}
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

export default AssignmentsPreviewSubmissions;