import { getGrades } from "../../../lib/api/student-api";
import useHttp from "../../../hooks/use-http";
import { useEffect } from "react";
import classes from "./GradeStudent.module.css"
import Card from "../../UI/Card";
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

  console.log(getGradesData);

  return (
    <section className={classes.main}>
      <h1>Twoje oceny!</h1>
      <Card>
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
                  <GradeDetailsStudent item={item} key={item.studentId}/>
                ))}
          </tbody>
        </table>
      </Card>
    </section>
  );
};

export default GradeTable;
