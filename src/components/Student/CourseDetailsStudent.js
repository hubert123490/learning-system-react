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
    sendRequest: getCourseDetailsRequest,
    data: getCourseDetailsData,
    status: getCourseDetailsStatus,
    error: getCourseDetailsError,
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
      getCourseDetailsRequest(params.courseId);
    }
    return getCourseDetailsRequest;
  }, [getCourseDetailsRequest, params.courseId, enrollInCourseStatus]);

  const lessonDetailsHandler = (lessonId) => {
    if (location.pathname) navigate(`${location.pathname}/lessons/${lessonId}`);
  };

  const examDetailsHandler = (examId) => {
    if(location.pathname) navigate(`${location.pathname}/exams/${examId}`)
  }

  const onEnrollInCourseSubmit = (event) => {
    event.preventDefault();
    enrollInCourseRequest({
      password: renderEnrollFormInputs()[0].props.value,
      courseId: params.courseId,
    });
  };

  console.log(getCourseDetailsData)

  return (
    <div className={classes.courseDetails}>
      <h1 style={{ fontSize: "3rem" }}>Witaj!</h1>
      <section className={classes.courseDetails}>
        <hr />
        {getCourseDetailsData &&
          getCourseDetailsStatus === "completed" &&
          getCourseDetailsData.lessons.map((item) => (
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
          {getCourseDetailsData &&
          getCourseDetailsStatus === "completed" &&
          getCourseDetailsData.exams.map((item) => (
            <div key={item.id} className={classes.course}>
              <div className={classes.card} style={{backgroundColor : "lightyellow"}} >
                <div
                  onClick={() => {
                    examDetailsHandler(item.id);
                  }}
                >
                  <h2>{item.name}</h2>
                </div>
              </div>
            </div>
          ))}
        {getCourseDetailsStatus !== "completed" && !getCourseDetailsData && (
          <Card>
            <div>
              <LoadingSpinner />
            </div>
          </Card>
        )}
        {getCourseDetailsError && (
          <div className={classes.error}>{getCourseDetailsError}</div>
        )}
        {getCourseDetailsError ===
          "Wygląda na to że nie posiadasz kursu o podanym id" && (
          <form onSubmit={onEnrollInCourseSubmit}>
            {renderEnrollFormInputs()}
            <button type="submit">Zapisz się na kurs</button>
          </form>
        )}
        {!getCourseDetailsData && getCourseDetailsStatus === "completed" && <h2>Pusto</h2>}
      </section>
    </div>
  );
};

export default CourseDetails;
