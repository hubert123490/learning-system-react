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

  console.log(getGradesData)

  return (
    <section className={classes["grades"]}>
      <h1>Twoje oceny!</h1>
      {getGradesError && <div><h3>{getGradesError}</h3></div>}
      <div className={classes["card"]}>
        <table>
          <thead>
            <tr>
              <th>Nazwa kursu</th>
              <th>Uzyskana liczba punktów (egzaminy)</th>
              <th>Maksymalna liczba punktów (egzaminy)</th>
              <th>Ocena (egzaminy)</th>
              <th>Uzyskana liczba punktów (prace)</th>
              <th>Maksymalna liczba punktów (prace)</th>
              <th>Ocena (prace)</th>
              <th>Szczegóły (egzaminy)</th>
              <th>Szczegóły (prace)</th>
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
