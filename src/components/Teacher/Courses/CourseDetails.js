import { courseDetails } from "../../../lib/api/course-api";
import useHttp from "../../../hooks/use-http";
import { useEffect, useState } from "react";
import classes from "./CourseDetails.module.css";
import Card from "../../UI/Card";
import LoadingSpinner from "../../UI/LoadingSpinner";
import { createLesson, deleteLesson } from "../../../lib/api/lesson-api";
import { useNavigate, useLocation, useParams } from "react-router";
import { createLessonForm } from "../../../lib/forms/lesson-form";
import useForm from "../../../hooks/use-form";

const CourseDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const [showCreateLesson, setShowCreateLesson] = useState(false);
  const {
    renderFormInputs: renderCreateLessonFormInputs,
    isFormValid: isCreateLessonFormValid,
  } = useForm(createLessonForm);

  const {
    sendRequest: getLessonsRequest,
    data: getLessonsData,
    status: getLessonsStatus,
    error: getLessonsError,
  } = useHttp(courseDetails, true);
  const { sendRequest: deleteRequest, status: deleteStatus } =
    useHttp(deleteLesson);
  const {
    sendRequest: createLessonRequest,
    data: createdLessonData,
    error: createdLessonError,
    status: createdLessonStatus,
  } = useHttp(createLesson);

  useEffect(() => {
    if (params.courseId) {
      getLessonsRequest(params.courseId);
    }
    return getLessonsRequest;
  }, [getLessonsRequest, params.courseId, deleteStatus, createdLessonStatus]);

  const lessonDetailsHandler = (lessonId) => {
    if (location.pathname) navigate(`${location.pathname}/lessons/${lessonId}`);
  };

  const submitCreateFormHandler = (event) => {
    event.preventDefault();
    createLessonRequest({
      name: renderCreateLessonFormInputs()[0].props.value,
      courseId: params.courseId,
    });
  };

  const showCreateFormHandler = () => {
    setShowCreateLesson(!showCreateLesson);
  };

  const createLessonRedirectHandler = () => {
    navigate(`/courses/${params.courseId}/lessons/${createdLessonData.id}`);
  };

  const createLessonFormJSX = (
    <form
      className={classes.createLessonForm}
      onSubmit={submitCreateFormHandler}
    >
      {!createdLessonData && <h1>Stwórz nową lekcję</h1>}
      {createdLessonData && <h1>Utworzono lekcję</h1>}
      {!createdLessonData && renderCreateLessonFormInputs()}
      {createdLessonStatus === "completed" && createdLessonError ? (
        <div className={classes.error}>{createdLessonError}</div>
      ) : (
        ""
      )}
      {createdLessonStatus === "completed" && createdLessonData ? (
        <div className={classes.success}>{createdLessonData.message}</div>
      ) : (
        ""
      )}
      {createdLessonStatus === "pending" && !createdLessonData && (
        <LoadingSpinner />
      )}
      {!createdLessonData && (
        <button type="submit" disabled={!isCreateLessonFormValid()}>
          Stwórz lekcję{" "}
        </button>
      )}
      {createdLessonStatus === "completed" && createdLessonData && (
        <button onClick={createLessonRedirectHandler}>
          Przejdź do nowo utworzonej lekcji
        </button>
      )}
    </form>
  );

  return (
    <div className={classes.courseDetails}>
      <h1 style={{ fontSize: "3rem" }}>Twoje lekcje!</h1>

      <section className={classes.courseDetails}>
        <button onClick={showCreateFormHandler}>
          {showCreateLesson ? "Zamknij" : "Dodaj lekcję"}
        </button>
        {showCreateLesson && createLessonFormJSX}
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

                <button
                  onClick={() => {
                    if (
                      window.confirm(`Czy napewno chcesz usunąć ${item.name}?`)
                    )
                      deleteRequest({
                        courseId: params.courseId,
                        lessonId: item.id,
                      });
                  }}
                >
                  Usuń lekcję
                </button>
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
        {!getLessonsData && getLessonsStatus === "completed" && <h2>Pusto</h2>}
      </section>
    </div>
  );
};

export default CourseDetails;
