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
import Lesson from "./Lesson";
import Exam from "./Exam";
import { createAssignmentForm } from "../../../lib/forms/assignment-form";
import {
  createAssignment,
  deleteAssignment,
} from "../../../lib/api/assignment-api";
import Assignment from "./Assignment";

const CourseDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [showCreateLesson, setShowCreateLesson] = useState(false);
  const [showCreateExam, setShowCreateExam] = useState(false);
  const [showCreateAssignment, setShowCreateAssignment] = useState(false);
  const [showLessons, setShowLessons] = useState(true);
  const [showExams, setShowExams] = useState(false);
  const [showAssignments, setShowAssignments] = useState(false);
  const {
    renderFormInputs: renderCreateLessonFormInputs,
    isFormValid: isCreateLessonFormValid,
  } = useForm(createLessonForm);
  const {
    renderFormInputs: renderCreateExamFormInputs,
    isFormValid: isCreateExamFormValid,
  } = useForm(createExamForm);
  const {
    renderFormInputs: renderCreateAssignmentFormInputs,
    isFormValid: isCreateAssignmentFormValid,
  } = useForm(createAssignmentForm);

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
    sendRequest: deleteAssignmentRequest,
    status: deleteAssignmentStatus,
  } = useHttp(deleteAssignment);
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
  const {
    sendRequest: createAssignmentRequest,
    data: createdAssignmentData,
    error: createdAssignmentError,
    status: createdAssignmentStatus,
  } = useHttp(createAssignment);

  useEffect(() => {
    if (params.courseId) {
      getDetailsRequest(params.courseId);
    }
  }, [
    getDetailsRequest,
    deleteLessonStatus,
    deleteExamStatus,
    deleteAssignmentStatus,
    createdLessonStatus,
    createdExamStatus,
    createdAssignmentStatus,
    params,
  ]);

  const lessonDetailsHandler = (lessonId) => {
    navigate(`lessons/${lessonId}`);
  };

  const examDetailsHandler = (examId) => {
    navigate(`exams/${examId}`);
  };

  const assignmentDetailsHandler = (assignmentId) => {
    navigate(`assignments/${assignmentId}`);
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

  const submitCreateAssignmentFormHandler = (event) => {
    event.preventDefault();
    createAssignmentRequest({
      courseId: params.courseId,
      request: {
        name: renderCreateAssignmentFormInputs()[0].props.value,
        description: renderCreateAssignmentFormInputs()[1].props.value,
        startDate: renderCreateAssignmentFormInputs()[2].props.value,
        endDate: renderCreateAssignmentFormInputs()[3].props.value,
      },
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

  const showCreateAssignmentFormHandler = () => {
    setShowCreateAssignment((prevState) => {
      return !prevState;
    });
  };

  const createLessonRedirectHandler = () => {
    navigate(`lessons/${createdLessonData.id}`);
  };

  const createExamRedirectHandler = () => {
    navigate(`exams/${createdExamData.id}`);
  };

  const createAssignmentRedirectHandler = () => {
    navigate(`assignments/${createdAssignmentData.id}`);
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
    setShowAssignments((prevState) => {
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

  const createAssignmentsFormJSX = (
    <form
      className={classes["create-form"]}
      onSubmit={submitCreateAssignmentFormHandler}
    >
      {!createdAssignmentData && <h1>Stwórz nową pracę domową</h1>}
      {createdAssignmentData && <h1>Utworzono pracę domową</h1>}
      {!createdAssignmentData && renderCreateAssignmentFormInputs()}
      {createdAssignmentStatus === "completed" && createdAssignmentError ? (
        <div className={classes["error"]}>{createdAssignmentError}</div>
      ) : (
        ""
      )}
      {createdAssignmentStatus === "completed" && createdAssignmentData ? (
        <div className={classes["success"]}>
          {createdAssignmentData.message}
        </div>
      ) : (
        ""
      )}
      {createdAssignmentStatus === "pending" && !createdAssignmentData && (
        <LoadingSpinner />
      )}
      {!createdAssignmentData && (
        <button type="submit" disabled={!isCreateAssignmentFormValid()}>
          Stwórz pracę domową{" "}
        </button>
      )}
      {createdAssignmentStatus === "completed" && createdAssignmentData && (
        <button onClick={createAssignmentRedirectHandler}>
          Przejdź do nowo utworzonej pracy domowej
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
        <br />
        <div>
          <button onClick={showCreateAssignmentFormHandler}>
            {showCreateAssignment ? "Zamknij" : "Dodaj prace"}
          </button>
          {showCreateAssignment && createAssignmentsFormJSX}
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
          <button
            onClick={showAssignmentsHandler}
            className={!showAssignments ? classes["button-active"] : ""}
          >
            {showAssignments ? "Ukryj prace" : "Pokaż prace"}
          </button>
        </div>
        <div className={classes["content-container"]}>
          {getDetailsData &&
            showLessons &&
            getDetailsStatus === "completed" &&
            getDetailsData.lessons.map((item) => (
              <Lesson
                key={item.id}
                item={item}
                deleteLessonRequest={deleteLessonRequest}
                lessonDetailsHandler={lessonDetailsHandler}
              />
            ))}
        </div>
        <hr className={classes["content-container__horizontal"]} />
        <div className={classes["content-container"]}>
          {getDetailsData &&
            showExams &&
            getDetailsStatus === "completed" &&
            getDetailsData.exams.map((item) => (
              <Exam
                key={item.id}
                item={item}
                deleteExamRequest={deleteExamRequest}
                examDetailsHandler={examDetailsHandler}
              />
            ))}
        </div>
        <hr className={classes["content-container__horizontal"]} />
        <div className={classes["content-container"]}>
          {getDetailsData &&
            showAssignments &&
            getDetailsStatus === "completed" &&
            getDetailsData.assignments.map((item) => (
              <Assignment
                key={item.id}
                item={item}
                deleteAssignmentRequest={deleteAssignmentRequest}
                assignmentDetailsHandler={assignmentDetailsHandler}
              />
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
