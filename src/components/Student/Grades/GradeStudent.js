import { getGrades } from "../../../lib/api/student-api";
import useHttp from "../../../hooks/use-http";
import { useEffect } from "react";
import classes from "./GradeStudent.module.css"
import GradeDetailsStudent from "./GradeDetailsStudent";
import { useTranslation } from "react-i18next";

const GradeTable = () => {
  const { t } = useTranslation();
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
      <h1>{t("Student__Grades_StudentsGrades")}</h1>
      {getGradesError && <div><h3>{getGradesError}</h3></div>}
      <div className={classes["card"]}>
        <table>
          <thead>
            <tr>
              <th>{t("Student__Grades_CourseName")}</th>
              <th>{t("Student__Grades_ObtainedPointsExams")}</th>
              <th>{t("Student__Grades_MaxPointsExams")}</th>
              <th>{t("Student__Grades_GradeExams")}</th>
              <th>{t("Student__Grades_ObtainedPointsAssignments")}</th>
              <th>{t("Student__Grades_MaxPointsAssignments")}</th>
              <th>{t("Student__Grades_GradeAssignments")}</th>
              <th>{t("Student__Grades_DetailsExams")}</th>
              <th>{t("Student__Grades_DetailsAssignments")}</th>
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
