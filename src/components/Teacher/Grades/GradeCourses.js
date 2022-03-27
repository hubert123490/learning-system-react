import { useNavigate } from "react-router";
import { getMyCourses } from "../../../lib/api/course-api";
import useHttp from "../../../hooks/use-http";
import { useEffect } from "react";
import classes from "./GradeCourses.module.css";
import Card from "../../UI/Card";
import LoadingSpinner from "../../UI/LoadingSpinner";
import image from "../../../assets/course_image.jpg";
import { t } from "i18next";

const GradeCourses = () => {
  const navigate = useNavigate();
  const {
    sendRequest: getAllCourses,
    data: coursesData,
    error: courseError,
  } = useHttp(getMyCourses, true);

  useEffect(() => {
    getAllCourses();
  }, [getAllCourses]);

  const courseDetailsHandler = (courseId, courseName) => {
    navigate(`${courseId}`, { state: { courseName: courseName } });
  };

  return (
    <section className={classes["my-courses"]}>
      <h1>{t("Teacher__Grades_ChooseCourse")}</h1>
      <div className={classes["courses"]}>
        {coursesData ? (
          coursesData.courses.map((item) => (
            <div key={item.id} className={classes["course"]}>
              <div>
                <div
                  onClick={() => {
                    courseDetailsHandler(item.id, item.courseName);
                  }}
                >
                  <div className={classes["course__image-container"]}>
                    <img src={image} alt="course" />
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

export default GradeCourses;
