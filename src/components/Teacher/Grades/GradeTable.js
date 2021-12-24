import { useParams } from "react-router";
import { getStudentsGrades } from "../../../lib/api/course-api";
import classes from "./GradeTable.module.css";
import useHttp from "../../../hooks/use-http";
import { useEffect } from "react";
import GradeDetails from "./GradeDetails";
import LoadingSpinner from "../../UI/LoadingSpinner";

const GradeTable = () => {
  const params = useParams();
  const {
    sendRequest: getGradesRequest,
    data: getGradesData,
    error: getGradesError,
    status: getGradesStatus,
  } = useHttp(getStudentsGrades, true);

  useEffect(() => {
    if (params)
      getGradesRequest(
        {
          courseId: params.courseId,
        }
      );
  }, [getGradesRequest, params]);

  console.log(getGradesError);

  return (
    <section className={classes["grades"]}>
      <h1>Oceny uczniów</h1>
      <div className={classes["card"]}>
        {getGradesStatus === "pending" && <LoadingSpinner />}
        {getGradesStatus === "completed" && getGradesError && (
          <h3 className={classes["error"]}>{getGradesError}</h3>
        )}
        {getGradesStatus === "completed" && getGradesData && (
          <table className={classes["grade-table"]}>
            <thead>
              <tr>
                <th>Nazwisko</th>
                <th>Imię</th>
                <th>Email</th>
                <th>Uzyskana liczba punktów</th>
                <th>Maksymalna liczba punktów</th>
                <th>Ocena</th>
                <th>Szczegóły</th>
              </tr>
            </thead>
            <tbody>
              {getGradesData &&
                getGradesData.studentsGrades
                  .sort(function (a, b) {
                    if (a.lastName < b.lastName) {
                      return -1;
                    }
                    if (a.lastName > b.lastName) {
                      return 1;
                    }
                    return 0;
                  })
                  .map((item) => (
                    <GradeDetails item={item} key={item.studentId} />
                  ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
};

export default GradeTable;
