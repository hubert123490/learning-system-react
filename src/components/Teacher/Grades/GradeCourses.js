import { useNavigate } from "react-router";
import { getMyCourses } from "../../../lib/api/course-api";
import useHttp from "../../../hooks/use-http";
import { useEffect } from "react";
import classes from "./GradeCourses.module.css"
import Card from "../../UI/Card";
import LoadingSpinner from "../../UI/LoadingSpinner";

const GradeCourses = () => {
  const navigate = useNavigate();
  const { sendRequest: getAllCourses, data: coursesData, error : courseError } = useHttp(
    getMyCourses,
    true
  );

  useEffect(() => {
    getAllCourses();

    return getAllCourses;
  }, [getAllCourses]);

  const courseDetailsHandler = (courseId) => {
    navigate(`/teacher/grades/${courseId}`);
  };

  return (
    <section className={classes.myCourses}>
      <h1>Wybierz kurs!</h1>
      {coursesData ? (
        coursesData.courses.map((item) => (
          <div key={item.id} className={classes.course}>
            <Card>
              <div
                onClick={() => {
                  courseDetailsHandler(item.id);
                }}
              >
                <h2>{item.name}</h2>
                <div>{item.category}</div>
              </div>
            </Card>
          </div>
        ))
      ) : ( courseError ? <div className={classes.error}><h1>{courseError}</h1></div> :
        <Card>
          <div>
            <LoadingSpinner />
          </div>
        </Card>
      )}
    </section>
  );
};

export default GradeCourses;
