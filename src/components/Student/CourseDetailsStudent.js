import { courseDetails, enrollInCourse } from "../../lib/api/course-api";
import useHttp from "../../hooks/use-http";
import { useEffect } from "react";
import classes from "./CourseDetailsStudent.module.css";
import Card from "../UI/Card";
import LoadingSpinner from "../UI/LoadingSpinner";
import { useNavigate, useLocation, useParams } from "react-router";
import useForm from "../../hooks/use-form";
import { enrollInCourseForm } from "../../lib/forms/course-form";

const CourseDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const {
    sendRequest: getLessonsRequest,
    data: getLessonsData,
    status: getLessonsStatus,
    error: getLessonsError,
  } = useHttp(courseDetails, true);
  const {
    sendRequest: enrollInCourseRequest,
    data: enrollInCourseData,
    status: enrollInCourseStatus,
    error: enrollInCourseError,
  } = useHttp(enrollInCourse);
  const {
    renderFormInputs: renderEnrollFormInputs,
    isFormValid: isEnrollFormValid,
  } = useForm(enrollInCourseForm);

  useEffect(() => {
    if (params.courseId) {
      getLessonsRequest(params.courseId);
    }
    return getLessonsRequest;
  }, [getLessonsRequest, params.courseId, enrollInCourseStatus]);

  const lessonDetailsHandler = (lessonId) => {
    if (location.pathname) navigate(`${location.pathname}/lessons/${lessonId}`);
  };

  const onEnrollInCourseSubmit = (event) => {
    event.preventDefault();
    enrollInCourseRequest({
      password: renderEnrollFormInputs()[0].props.value,
      courseId: params.courseId,
    });
  };

  return (
    <div className={classes.courseDetails}>
      <h1 style={{ fontSize: "3rem" }}>Twoje lekcje!</h1>
      <section className={classes.courseDetails}>
        <hr />
        {getLessonsData &&
          getLessonsStatus === "completed" &&
          getLessonsData.lessons.map((item) => (
            <div key={item.id} className={classes.course}>
              <div className={classes.card}>
                <div
                  onClick={() => {
                    lessonDetailsHandler(item.id);
                  }}
                >
                  <h2>{item.name}</h2>
                </div>
              </div>
            </div>
          ))}
        {getLessonsStatus !== "completed" && !getLessonsData && (
          <Card>
            <div>
              <LoadingSpinner />
            </div>
          </Card>
        )}
        {getLessonsError && (
          <div className={classes.error}>{getLessonsError}</div>
        )}
        {getLessonsError ===
          "Wygląda na to że nie posiadasz kursu o podanym id" && (
          <form onSubmit={onEnrollInCourseSubmit}>
            {renderEnrollFormInputs()}
            <button type="submit">Zapisz się na kurs</button>
          </form>
        )}
        {!getLessonsData && getLessonsStatus === "completed" && <h2>Pusto</h2>}
      </section>
    </div>
  );
};

export default CourseDetails;
