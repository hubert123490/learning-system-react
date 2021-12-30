import { courseDetails, enrollInCourse } from "../../lib/api/course-api";
import useHttp from "../../hooks/use-http";
import { useEffect, useState } from "react";
import classes from "./CourseDetailsStudent.module.css";
import Card from "../UI/Card";
import LoadingSpinner from "../UI/LoadingSpinner";
import { useNavigate, useLocation, useParams } from "react-router";
import useForm from "../../hooks/use-form";
import { enrollInCourseForm } from "../../lib/forms/course-form";
import lessonImage from "../../assets/lesson.jpg";
import examImage from "../../assets/exam.jpg";
import assignmentImage from "../../assets/assignment.jpg"

const CourseDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const [showLessons, setShowLessons] = useState(true);
  const [showExams, setShowExams] = useState(true);
  const [showAssignments, setShowAssignments] = useState(true);
  const {
    sendRequest: getCourseDetailsRequest,
    data: getCourseDetailsData,
    status: getCourseDetailsStatus,
    error: getCourseDetailsError,
  } = useHttp(courseDetails, true);
  const {
    sendRequest: enrollInCourseRequest,
    status: enrollInCourseStatus,
    error: enrollInCourseError,
  } = useHttp(enrollInCourse);
  const {
    renderFormInputs: renderEnrollFormInputs,
  } = useForm(enrollInCourseForm);

  useEffect(() => {
    if (params.courseId) {
      getCourseDetailsRequest(params.courseId);
    }
  }, [getCourseDetailsRequest, enrollInCourseStatus, params]);

  const lessonDetailsHandler = (lessonId) => {
    if (location.pathname) navigate(`${location.pathname}/lessons/${lessonId}`);
  };

  const examDetailsHandler = (examId) => {
    if (location.pathname) navigate(`${location.pathname}/exams/${examId}`);
  };

  const assignmentDetailsHandler = assignmentId => {
    navigate(`assignments/${assignmentId}`)
  }

  const onEnrollInCourseSubmit = (event) => {
    event.preventDefault();
    if (params.courseId){
      enrollInCourseRequest({
        password: renderEnrollFormInputs()[0].props.value
          ? renderEnrollFormInputs()[0].props.value
          : " ",
        courseId: params.courseId,
      });
    }
  };

  const showExamsHandler = () => {
    setShowExams((prevState) => {
      return !prevState;
    });
  };

  const showLessonsHandler = () => {
    setShowLessons((prevState) => {
      return !prevState;
    });
  };

  const showAssignmentsHandler = () => {
    setShowAssignments(prevState => !prevState)
  }

  return (
    <section className={classes["course-details"]}>
      <h1>{getCourseDetailsError ? "Zapisz się na kurs" : "Witaj"}</h1>
      {!getCourseDetailsError && (
        <div className={classes["filter-container"]}>
          <button
            onClick={showLessonsHandler}
            className={!showLessons ? classes["button-active"] : ""}
          >
            {showLessons ? "Ukryj lekcje" : "Pokaż lekcje"}
          </button>
          <button
            onClick={showExamsHandler}
            className={!showExams ? classes["button-active"] : ""}
          >
            {showExams ? "Ukryj egzaminy" : "Pokaż egzaminy"}
          </button>
          <button
            onClick={showAssignmentsHandler}
            className={!showAssignments ? classes["button-active"] : ""}
          >
            {showExams ? "Ukryj prace" : "Pokaż prace"}
          </button>
        </div>
      )}
      {!getCourseDetailsError && (
        <div className={classes["content-container"]}>
          {getCourseDetailsData &&
            showLessons &&
            getCourseDetailsStatus === "completed" &&
            getCourseDetailsData.lessons.map((item) => (
              <div key={item.id} className={classes["content-container__item"]}>
                <div
                  onClick={() => {
                    lessonDetailsHandler(item.id);
                  }}
                >
                  <h2 className={classes["content-container__title"]}>
                    {item.name}
                  </h2>
                  <div
                    className={classes["content-container__image-container"]}
                  >
                    <img src={lessonImage} alt="lesson" />
                  </div>
                  <div className={classes["content-container__description"]}>
                    {item.description}
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
      {!getCourseDetailsError && (
        <hr className={classes["content-container__horizontal"]} />
      )}
      {!getCourseDetailsError && (
        <div className={classes["content-container"]}>
          {getCourseDetailsData &&
            showExams &&
            getCourseDetailsStatus === "completed" &&
            getCourseDetailsData.exams.map((item) => (
              <div
                key={item.id}
                className={`${classes["content-container__item"]} ${classes["exam"]}`}
              >
                <div
                  onClick={() => {
                    examDetailsHandler(item.id);
                  }}
                >
                  <h2 className={classes["content-container__title"]}>
                    {item.name}
                  </h2>
                  <div
                    className={classes["content-container__image-container"]}
                  >
                    <img src={examImage} alt="exam" />
                  </div>
                  <div className={classes["content-container__description"]}>
                    {item.description}
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
      {!getCourseDetailsError && (
        <hr className={classes["content-container__horizontal"]} />
      )}
      {!getCourseDetailsError && (
        <div className={classes["content-container"]}>
          {getCourseDetailsData &&
            showAssignments &&
            getCourseDetailsStatus === "completed" &&
            getCourseDetailsData.assignments.map((item) => (
              <div
                key={item.id}
                className={`${classes["content-container__item"]} ${classes["assignment"]}`}
              >
                <div
                  onClick={() => {
                    assignmentDetailsHandler(item.id);
                  }}
                >
                  <h2 className={classes["content-container__title"]}>
                    {item.name}
                  </h2>
                  <div
                    className={classes["content-container__image-container"]}
                  >
                    <img src={assignmentImage} alt="assignment" />
                  </div>
                  <div className={classes["content-container__description"]}>
                    {item.description}
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}

      {getCourseDetailsStatus !== "completed" && !getCourseDetailsData && (
        <Card>
          <div>
            <LoadingSpinner />
          </div>
        </Card>
      )}
      {getCourseDetailsData &&
        getCourseDetailsData.exams.length === 0 &&
        getCourseDetailsData.lessons.length === 0 &&
        getCourseDetailsData.assignments.length === 0 &&
        !getCourseDetailsError &&
        getCourseDetailsStatus === "completed" && (
          <h2 className={classes["error"]}>
            Brak egzaminów lekcji i prac do wyświetlenia
          </h2>
        )}

{getCourseDetailsError && <div className={classes["card"]}>
      {getCourseDetailsError && (
        <div className={classes["error"]}><h3>{getCourseDetailsError}</h3></div>
      )}
      {getCourseDetailsError ===
        "Wygląda na to że nie posiadasz dostępu do kursu" && (
        <form
          onSubmit={onEnrollInCourseSubmit}
          className={classes["enroll-form"]}
        >
          {renderEnrollFormInputs()}
          {enrollInCourseError && <div className={classes["error"]}>{enrollInCourseError}</div>}
          <button type="submit">Zapisz się na kurs</button>
        </form>
      )}
      {!getCourseDetailsData &&
        getCourseDetailsStatus === "completed" &&
        !getCourseDetailsError && <h2>Pusto</h2>}
        </div>}
    </section>
  );
};

export default CourseDetails;
