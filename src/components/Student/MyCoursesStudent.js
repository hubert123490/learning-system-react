import classes from "./MyCoursesStudent.module.css";
import useHttp from "../../hooks/use-http";
import {
   getMyCoursesStudent,
} from "../../lib/api/course-api";
import { useEffect } from "react";
import LoadingSpinner from "../UI/LoadingSpinner";
import Card from "../UI/Card"
import { useNavigate } from "react-router";
import image from "../../assets/course_image.jpg"
import { useTranslation } from "react-i18next";

const MyCourses = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { sendRequest: getAllCourses, data: coursesData, error : courseError } = useHttp(
    getMyCoursesStudent,
    true
  );

  useEffect(() => {
    getAllCourses();
  }, [getAllCourses]);

  const courseDetailsHandler = (courseId) => {
    navigate(`/student/courses/${courseId}`);
  };

  return (
    <section className={classes["my-courses"]}>
        <h1>{t("Student__MyCourses_YourCourses")}</h1>
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
                      <span className={classes["category-title"]}>
                        
                      </span>
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

export default MyCourses;
