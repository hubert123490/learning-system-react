import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useHttp from "../../../hooks/use-http";
import { getMyCourses } from "../../../lib/api/course-api";
import classes from "./AssignmentsPreviewCourses.module.css";
import image from "../../../assets/course_image.jpg";
import Card from "../../UI/Card";
import LoadingSpinner from "../../UI/LoadingSpinner";
import { useTranslation } from "react-i18next";

const AssignmentsPreviewCourses = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    sendRequest: getAllCourses,
    data: coursesData,
    error: courseError,
  } = useHttp(getMyCourses, true);

  useEffect(() => {
    getAllCourses();
  }, [getAllCourses]);

  const courseDetailsHandler = (course) => {
    navigate(`${course.id}/assignments`, {
      state: { courseName: course.name },
    });
  };

  return (
    <section className={classes["assignments-courses"]}>
      <h1>{t("Teacher__AssignmentsPreview_ChooseCourse")}</h1>
      <div className={classes["courses"]}>
        {coursesData ? (
          coursesData.courses.map((item) => (
            <div key={item.id} className={classes["course"]}>
              <div>
                <div
                  onClick={() => {
                    courseDetailsHandler(item);
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

export default AssignmentsPreviewCourses;
