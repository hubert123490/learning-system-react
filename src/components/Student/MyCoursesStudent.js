import classes from "./MyCoursesStudent.module.css";
import useHttp from "../../hooks/use-http";
import {
   getMyCoursesStudent,
} from "../../lib/api/course-api";
import { useEffect } from "react";
import LoadingSpinner from "../UI/LoadingSpinner";
import Card from "../UI/Card"
import { useNavigate } from "react-router";

const MyCourses = () => {
  const navigate = useNavigate();
  const { sendRequest: getAllCourses, data: coursesData, error : courseError } = useHttp(
    getMyCoursesStudent,
    true
  );

  useEffect(() => {
    getAllCourses();

    return getAllCourses;
  }, [getAllCourses]);

  const courseDetailsHandler = (courseId) => {
    navigate(`/student/courses/${courseId}`);
  };

  return (
    <section className={classes.myCourses}>
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

export default MyCourses;
