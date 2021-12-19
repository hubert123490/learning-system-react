import { useNavigate } from "react-router";
import { getMyCourses } from "../../lib/api/course-api";
import useHttp from "../../hooks/use-http";
import { useEffect } from "react";
import classes from "./CheckCourses.module.css";
import Card from "../UI/Card";
import LoadingSpinner from "../UI/LoadingSpinner";
import image from "../../../assets/course_image.jpg"

const CheckCourses = () => {
  const navigate = useNavigate();
  const {
    sendRequest: getAllCourses,
    data: coursesData,
    error: courseError,
  } = useHttp(getMyCourses, true);

  useEffect(() => {
    getAllCourses();

    return getAllCourses;
  }, [getAllCourses]);

  const courseDetailsHandler = (courseId) => {
    navigate(`/teacher/check-courses/${courseId}/exams`);
  };

  return (
    <section className={classes["check-courses"]}>
      <h1>Wybierz kurs!</h1>
      <div className={classes["courses"]}>
        {coursesData ? (
          coursesData.courses.map((item) => (
            <div key={item.id} className={classes["course"]}>
              <div>
                <div
                  onClick={() => {
                    courseDetailsHandler(item.id);
                  }}
                >
                  <div className={classes["course__image-container"]}>
                    <img src={image} alt="image" />
                  </div>
                  <h2 className={classes["course-description__title"]}>
                    {item.name}
                  </h2>
                  <div
                    className={
                      classes["course-description__category-container"]
                    }
                  >
                    <span className={classes["category-title"]}></span>
                    <span className={classes["category-value"]}>
                      {item.category}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : courseError ? (
          <div className={classes["error"]}>
            <h1>{courseError}</h1>
          </div>
        ) : (
          <Card>
            <div>
              <LoadingSpinner />
            </div>
          </Card>
        )}
      </div>
    </section>
  );
};

export default CheckCourses;
