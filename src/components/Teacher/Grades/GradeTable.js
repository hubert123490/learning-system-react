import { useParams } from "react-router";
import { getStudentsGrades } from "../../../lib/api/course-api";
import Card from "../../UI/Card";
import classes from "./GradeTable.module.css";
import useHttp from "../../../hooks/use-http";
import { useEffect } from "react";
import GradeDetails from "./GradeDetails";

const GradeTable = () => {
  const params = useParams();
  const {
    sendRequest: getGradesRequest,
    data: getGradesData,
    error: getGradesError,
  } = useHttp(getStudentsGrades, true);

  useEffect(() => {
    getGradesRequest({
      courseId: params.courseId,
    });

    return getGradesRequest;
  }, [getGradesRequest]);

  console.log(getGradesData);

  return (
    <section className={classes.main}>
      <h1>Oceny uczniów</h1>
      <Card>
        <table>
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
                  <GradeDetails item={item} key={item.studentId}/>
                ))}
          </tbody>
        </table>
      </Card>
    </section>
  );
};

export default GradeTable;
