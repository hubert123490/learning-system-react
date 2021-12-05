import { useNavigate } from "react-router";
import { getMyCourses } from "../../../lib/api/course-api";
import useHttp from "../../../hooks/use-http";
import { useEffect } from "react";
import classes from "./CheckCourses.module.css"
import Card from "../../UI/Card";
import LoadingSpinner from "../../UI/LoadingSpinner";

const CheckCourses = () => {
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
    navigate(`/teacher/check-courses/${courseId}/exams`);
  };


  return (
    <section className={classes.checkCourses}>
      <h1>Twoje kursy!</h1>
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

export default CheckCourses;
