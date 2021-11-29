import { courseDetails } from "../../../lib/api/course-api";
import useHttp from "../../../hooks/use-http";
import { useEffect, useState } from "react";
import classes from "./CourseDetails.module.css";
import Card from "../../UI/Card";
import LoadingSpinner from "../../UI/LoadingSpinner";
import { createLesson, deleteLesson } from "../../../lib/api/lesson-api";
import { createExam, deleteExam } from "../../../lib/api/exam-api";
import { useNavigate, useLocation, useParams } from "react-router";
import { createLessonForm } from "../../../lib/forms/lesson-form";
import useForm from "../../../hooks/use-form";
import { createExamForm } from "../../../lib/forms/exam-form";

const CourseDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const [showCreateLesson, setShowCreateLesson] = useState(false);
  const [showCreateExam, setShowCreateExam] = useState(false);
  const {
    renderFormInputs: renderCreateLessonFormInputs,
    isFormValid: isCreateLessonFormValid,
  } = useForm(createLessonForm);
  const {
    renderFormInputs: renderCreateExamFormInputs,
    isFormValid: isCreateExamFormValid,
  } = useForm(createExamForm);

  const {
    sendRequest: getDetailsRequest,
    data: getDetailsData,
    status: getDetailsStatus,
    error: getDetailsError,
  } = useHttp(courseDetails, true);
  const { sendRequest: deleteLessonRequest, status: deleteLessonStatus } =
    useHttp(deleteLesson);
    const {sendRequest : deleteExamRequest, status: deleteExamStatus } =
    useHttp(deleteExam);
  const {
    sendRequest: createLessonRequest,
    data: createdLessonData,
    error: createdLessonError,
    status: createdLessonStatus,
  } = useHttp(createLesson);
  const {
    sendRequest: createExamRequest,
    data: createdExamData,
    error: createdExamError,
    status: createdExamStatus,
  } = useHttp(createExam);

  useEffect(() => {
    if (params.courseId) {
      getDetailsRequest(params.courseId);
    }
    return getDetailsRequest;
  }, [
    getDetailsRequest,
    params.courseId,
    deleteLessonStatus,
    deleteExamStatus,
    createdLessonStatus,
    createdExamStatus
  ]);

  const lessonDetailsHandler = (lessonId) => {
    if (location.pathname) navigate(`${location.pathname}/lessons/${lessonId}`);
  };

  const examDetailsHandler = (examId) => {
    if(location.pathname) navigate(`${location.pathname}/exams/${examId}`)
  }

  const submitCreateFormHandler = (event) => {
    event.preventDefault();
    createLessonRequest({
      name: renderCreateLessonFormInputs()[0].props.value,
      courseId: params.courseId,
    });
  };

  const submitCreateExamFormHandler = (event) => {
    event.preventDefault();
    createExamRequest({
      name: renderCreateExamFormInputs()[0].props.value,
      description: renderCreateExamFormInputs()[1].props.value,
      courseId: params.courseId,
    });
  };

  const showCreateFormHandler = () => {
    setShowCreateLesson(!showCreateLesson);
  };

  const showCreateExamFormHandler = () => {
    setShowCreateExam(!showCreateExam);
  };

  const createLessonRedirectHandler = () => {
    navigate(`/courses/${params.courseId}/lessons/${createdLessonData.id}`);
  };

  const createExamRedirectHandler = () => {
    navigate(`/courses/${params.courseId}/exams/${createdExamData.id}`)
  }

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

  const createExamFormJSX = (
    <form
      className={classes.createLessonForm}
      onSubmit={submitCreateExamFormHandler}
    >
      {!createdExamData && <h1>Stwórz nowy egzamin</h1>}
      {createdExamData && <h1>Utworzono egzamin</h1>}
      {!createdExamData && renderCreateExamFormInputs()}
      {createdExamStatus === "completed" && createdExamError ? (
        <div className={classes.error}>{createdExamError}</div>
      ) : (
        ""
      )}
      {createdExamStatus === "completed" && createdExamData ? (
        <div className={classes.success}>{createdExamData.message}</div>
      ) : (
        ""
      )}
      {createdExamStatus === "pending" && !createdExamData && (
        <LoadingSpinner />
      )}
      {!createdExamData && (
        <button type="submit" disabled={!isCreateExamFormValid()}>
          Stwórz egzamin{" "}
        </button>
      )}
      {createdExamStatus === "completed" && createdExamData && (
        <button onClick={createExamRedirectHandler}>
          Przejdź do nowo utworzonego egzaminu
        </button>
      )}
    </form>
  );

  return (
    <div className={classes.courseDetails}>
      <h1 style={{ fontSize: "3rem" }}>Witaj!</h1>

      <section className={classes.courseDetails}>
        <div>
          <button onClick={showCreateFormHandler}>
            {showCreateLesson ? "Zamknij" : "Dodaj lekcję"}
          </button>
          {showCreateLesson && createLessonFormJSX}
        </div>
        <br />
        <div>
          <button onClick={showCreateExamFormHandler}>
            {showCreateExam ? "Zamknij" : "Dodaj egzamin"}
          </button>
          {showCreateExam && createExamFormJSX}
        </div>
        <hr />
        {getDetailsData &&
          getDetailsStatus === "completed" &&
          getDetailsData.lessons.map((item) => (
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
                      deleteLessonRequest({
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
          {getDetailsData && getDetailsStatus === "completed" && 
           getDetailsData.exams.map((item) => (
            <div key={item.id} className={classes.course}>
              <div className={classes.card} style={{backgroundColor : "lightyellow"}}>
                <div
                  onClick={() => {
                    examDetailsHandler(item.id);
                  }}
                >
                  <h2>{item.name}</h2>
                </div>

                <button onClick={() => {
                    if (
                      window.confirm(`Czy napewno chcesz usunąć ${item.name}?`)
                    )
                      deleteExamRequest({
                        courseId: params.courseId,
                        examId: item.id,
                      });
                  }}>
                  Usuń egzamin
                </button>
              </div>
            </div>
          ))}
        {getDetailsStatus !== "completed" && !getDetailsData && (
          <Card>
            <div>
              <LoadingSpinner />
            </div>
          </Card>
        )}
        {getDetailsError && (
          <div className={classes.error}>{getDetailsError}</div>
        )}
        {!getDetailsData && getDetailsStatus === "completed" && <h2>Pusto</h2>}
      </section>
    </div>
  );
};

export default CourseDetails;
