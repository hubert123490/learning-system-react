import { getGrades } from "../../../lib/api/student-api";
import useHttp from "../../../hooks/use-http";
import { useEffect } from "react";
import classes from "./GradeStudent.module.css"
import GradeDetailsStudent from "./GradeDetailsStudent";

const GradeTable = () => {
  const {
    sendRequest: getGradesRequest,
    data: getGradesData,
    error: getGradesError,
  } = useHttp(getGrades, true);

  useEffect(() => {
    getGradesRequest();

    return getGradesRequest;
  }, [getGradesRequest]);

  return (
    <section className={classes["grades"]}>
      <h1>Twoje oceny!</h1>
      {getGradesError && <div><h3>{getGradesError}</h3></div>}
      <div className={classes["card"]}>
        <table>
          <thead>
            <tr>
              <th>Nazwa kursu</th>
              <th>Uzyskana liczba punktów</th>
              <th>Maksymalna liczba punktów</th>
              <th>Ocena</th>
              <th>Szczegóły</th>
            </tr>
          </thead>
          <tbody>
            {getGradesData &&
              getGradesData.grades
                .sort(function (a, b) {
                  if (a.courseName < b.courseName) {
                    return -1;
                  }
                  if (a.courseName > b.courseName) {
                    return 1;
                  }
                  return 0;
                })
                .map((item) => (
                  <GradeDetailsStudent item={item} key={item.courseId}/>
                ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default GradeTable;
