import { useParams } from "react-router";
import { getStudentsGrades } from "../../../lib/api/course-api";
import classes from "./GradeTable.module.css";
import useHttp from "../../../hooks/use-http";
import { useEffect } from "react";
import GradeDetails from "./GradeDetails";
import LoadingSpinner from "../../UI/LoadingSpinner";
import { useTranslation } from "react-i18next";

const GradeTable = () => {
  const { t } = useTranslation();
  const params = useParams();
  const {
    sendRequest: getGradesRequest,
    data: getGradesData,
    error: getGradesError,
    status: getGradesStatus,
  } = useHttp(getStudentsGrades, true);

  useEffect(() => {
    if (params)
      getGradesRequest({
        courseId: params.courseId,
      });
  }, [getGradesRequest, params]);

  return (
    <>
      {getGradesData && getGradesData.studentsGrades.length > 0 ? (
        <section className={classes["grades"]}>
          <h1>{t("Teacher__Grades_StudentsGrades")}</h1>
          <div className={classes["card"]}>
            {getGradesStatus === "pending" && <LoadingSpinner />}
            {getGradesStatus === "completed" && getGradesError && (
              <h3 className={classes["error"]}>{getGradesError}</h3>
            )}
            {getGradesStatus === "completed" && getGradesData && (
              <table className={classes["grade-table"]}>
                <thead>
                  <tr>
                    <th>{t("Teacher__Grades_LastName")}</th>
                    <th>{t("Teacher__Grades_FirstName")}</th>
                    <th>{t("Teacher__Grades_Email")}</th>
                    <th>{t("Teacher__Grades_ObtainedPointsExams")}</th>
                    <th>{t("Teacher__Grades_MaxPointsExams")}</th>
                    <th>{t("Teacher__Grades_GradeExams")}</th>
                    <th>{t("Teacher__Grades_ObtainedPointsAssignments")}</th>
                    <th>{t("Teacher__Grades_MaxPointsAssignments")}</th>
                    <th>{t("Teacher__Grades_GradeAssignments")}</th>
                    <th>{t("Teacher__Grades_DetailsExams")}</th>
                    <th>{t("Teacher__Grades_DetailsAssignments")}</th>
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
      ) : (
        <div></div>
      )}
    </>
  );
};

export default GradeTable;
