import { courseDetails } from "../../../lib/api/course-api";
import useHttp from "../../../hooks/use-http";
import { useEffect, useState } from "react";
import classes from "./CourseDetails.module.css";
import Card from "../../UI/Card";
import LoadingSpinner from "../../UI/LoadingSpinner";
import { createLesson, deleteLesson } from "../../../lib/api/lesson-api";
import { createExam, deleteExam } from "../../../lib/api/exam-api";
import { useNavigate, useParams } from "react-router";
import { createLessonForm } from "../../../lib/forms/lesson-form";
import useForm from "../../../hooks/use-form";
import { createExamForm } from "../../../lib/forms/exam-form";
import { FaTimes } from "react-icons/fa";
import lessonImage from "../../../assets/lesson.jpg";
import examImage from "../../../assets/exam.jpg";

const CourseDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [showCreateLesson, setShowCreateLesson] = useState(false);
  const [showCreateExam, setShowCreateExam] = useState(false);
  const [showLessons, setShowLessons] = useState(true);
  const [showExams, setShowExams] = useState(true);
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
  const { sendRequest: deleteExamRequest, status: deleteExamStatus } =
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
  }, [
    getDetailsRequest,
    deleteLessonStatus,
    deleteExamStatus,
    createdLessonStatus,
    createdExamStatus,
    params
  ]);

  const lessonDetailsHandler = (lessonId) => {
    navigate(`lessons/${lessonId}`);
  };

  const examDetailsHandler = (examId) => {
    navigate(`exams/${examId}`);
  };

  const submitCreateFormHandler = (event) => {
    event.preventDefault();
    createLessonRequest({
      name: renderCreateLessonFormInputs()[0].props.value,
      description: renderCreateLessonFormInputs()[1].props.value,
      courseId: params.courseId,
    });
  };

  const submitCreateExamFormHandler = (event) => {
    event.preventDefault();
    createExamRequest({
      name: renderCreateExamFormInputs()[0].props.value,
      description: renderCreateExamFormInputs()[1].props.value,
      startDate: renderCreateExamFormInputs()[2].props.value,
      endDate: renderCreateExamFormInputs()[3].props.value,
      courseId: params.courseId,
    });
  };

  const showCreateFormHandler = () => {
    setShowCreateLesson((prevState) => {
      return !prevState;
    });
  };

  const showCreateExamFormHandler = () => {
    setShowCreateExam((prevState) => {
      return !prevState;
    });
  };

  const createLessonRedirectHandler = () => {
    navigate(`lessons/${createdLessonData.id}`);
  };

  const createExamRedirectHandler = () => {
    navigate(`exams/${createdExamData.id}`);
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

  const createLessonFormJSX = (
    <form className={classes["create-form"]} onSubmit={submitCreateFormHandler}>
      {!createdLessonData && <h1>Stwórz nową lekcję</h1>}
      {createdLessonData && <h1>Utworzono lekcję</h1>}
      {!createdLessonData && renderCreateLessonFormInputs()}
      {createdLessonStatus === "completed" && createdLessonError ? (
        <div className={classes["error"]}>{createdLessonError}</div>
      ) : (
        ""
      )}
      {createdLessonStatus === "completed" && createdLessonData ? (
        <div className={classes["success"]}>{createdLessonData.message}</div>
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
      className={classes["create-form"]}
      onSubmit={submitCreateExamFormHandler}
    >
      {!createdExamData && <h1>Stwórz nowy egzamin</h1>}
      {createdExamData && <h1>Utworzono egzamin</h1>}
      {!createdExamData && renderCreateExamFormInputs()}
      {createdExamStatus === "completed" && createdExamError ? (
        <div className={classes["error"]}>{createdExamError}</div>
      ) : (
        ""
      )}
      {createdExamStatus === "completed" && createdExamData ? (
        <div className={classes["success"]}>{createdExamData.message}</div>
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
    <div className={classes["course-details"]}>
      <h1 style={{ fontSize: "3rem" }}>Witaj!</h1>

      <section className={classes["course-details"]}>
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
        </div>
        <div className={classes["content-container"]}>
          {getDetailsData &&
            showLessons &&
            getDetailsStatus === "completed" &&
            getDetailsData.lessons.map((item) => (
              <div key={item.id} className={classes["content-container__item"]}>
                <FaTimes
                  size={25}
                  onClick={() => {
                    if (
                      window.confirm(`Czy napewno chcesz usunąć ${item.name}?`)
                    )
                      deleteLessonRequest({
                        courseId: params.courseId,
                        lessonId: item.id,
                      });
                  }}
                  className={classes["delete-icon"]}
                />

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
                  <div className={classes["content-container__description"]}>{item.description}</div>
                </div>
              </div>
            ))}
        </div>
        <hr className={classes["content-container__horizontal"]} />
        <div className={classes["content-container"]}>
          {getDetailsData &&
            showExams &&
            getDetailsStatus === "completed" &&
            getDetailsData.exams.map((item) => (
              <div
                key={item.id}
                className={`${classes["content-container__item"]} ${classes["exam"]}`}
              >
                <FaTimes
                  size={25}
                  onClick={() => {
                    if (
                      window.confirm(`Czy napewno chcesz usunąć ${item.name}?`)
                    )
                      deleteExamRequest({
                        courseId: params.courseId,
                        examId: item.id,
                      });
                  }}
                  className={classes["delete-icon"]}
                />
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
                  <div className={classes["content-container__description"]}>{item.description}</div>
                </div>
              </div>
            ))}
        </div>
        {getDetailsStatus !== "completed" && !getDetailsData && (
          <Card>
            <div>
              <LoadingSpinner />
            </div>
          </Card>
        )}
        {getDetailsError && (
          <div className={classes["error"]}>{getDetailsError}</div>
        )}
        {!getDetailsData && getDetailsStatus === "completed" && <h2>Pusto</h2>}
      </section>
    </div>
  );
};

export default CourseDetails;
