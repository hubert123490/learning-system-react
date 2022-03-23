import { courseDetails } from "../../../lib/api/course-api";
import useHttp from "../../../hooks/use-http";
import { useEffect, useState } from "react";
import classes from "./CourseDetails.module.css";
import Card from "../../UI/Card";
import LoadingSpinner from "../../UI/LoadingSpinner";
import { createLesson, deleteLesson } from "../../../lib/api/lesson-api";
import { createExam, deleteExam } from "../../../lib/api/exam-api";
import { useNavigate, useParams } from "react-router";
import {
  createLessonForm,
  createLessonFormEn,
} from "../../../lib/forms/lesson-form";
import useForm from "../../../hooks/use-form";
import { createExamForm, createExamFormEn } from "../../../lib/forms/exam-form";
import Lesson from "./Lesson";
import Exam from "./Exam";
import { createAssignmentForm, createAssignmentFormEn } from "../../../lib/forms/assignment-form";
import {
  createAssignment,
  deleteAssignment,
} from "../../../lib/api/assignment-api";
import Assignment from "./Assignment";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

const CourseDetails = () => {
  const { t } = useTranslation();
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
    renderFormInputs: renderCreateLessonFormInputsEn,
    isFormValid: isCreateLessonFormValidEn,
  } = useForm(createLessonFormEn);
  const {
    renderFormInputs: renderCreateExamFormInputs,
    isFormValid: isCreateExamFormValid,
  } = useForm(createExamForm);
  const {
    renderFormInputs: renderCreateExamFormInputsEn,
    isFormValid: isCreateExamFormValidEn,
  } = useForm(createExamFormEn);
  const {
    renderFormInputs: renderCreateAssignmentFormInputs,
    isFormValid: isCreateAssignmentFormValid,
  } = useForm(createAssignmentForm);
  const {
    renderFormInputs: renderCreateAssignmentFormInputsEn,
    isFormValid: isCreateAssignmentFormValidEn,
  } = useForm(createAssignmentFormEn);

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

  console.log(renderCreateLessonFormInputs());

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
    if (i18next.language === "pl") {
      createLessonRequest({
        name: renderCreateLessonFormInputs()[0].props.value,
        description: renderCreateLessonFormInputs()[1].props.value,
        courseId: params.courseId,
      });
    } else if (i18next.language === "en") {
      createLessonRequest({
        name: renderCreateLessonFormInputsEn()[0].props.value,
        description: renderCreateLessonFormInputsEn()[1].props.value,
        courseId: params.courseId,
      });
    }
  };

  const submitCreateExamFormHandler = (event) => {
    event.preventDefault();
    if (i18next.language === "pl") {
      createExamRequest({
        name: renderCreateExamFormInputs()[0].props.value,
        description: renderCreateExamFormInputs()[1].props.value,
        startDate: renderCreateExamFormInputs()[2].props.value,
        endDate: renderCreateExamFormInputs()[3].props.value,
        courseId: params.courseId,
      });
    } else if (i18next.language === "en") {
      createExamRequest({
        name: renderCreateExamFormInputsEn()[0].props.value,
        description: renderCreateExamFormInputsEn()[1].props.value,
        startDate: renderCreateExamFormInputsEn()[2].props.value,
        endDate: renderCreateExamFormInputsEn()[3].props.value,
        courseId: params.courseId,
      });
    }
  };

  const submitCreateAssignmentFormHandler = (event) => {
    event.preventDefault();
    if (i18next.language === "pl") {
      createAssignmentRequest({
        courseId: params.courseId,
        request: {
          name: renderCreateAssignmentFormInputs()[0].props.value,
          description: renderCreateAssignmentFormInputs()[1].props.value,
          startDate: renderCreateAssignmentFormInputs()[2].props.value,
          endDate: renderCreateAssignmentFormInputs()[3].props.value,
        },
      });
    } else if (i18next.language === "en") {
      createAssignmentRequest({
        courseId: params.courseId,
        request: {
          name: renderCreateAssignmentFormInputsEn()[0].props.value,
          description: renderCreateAssignmentFormInputsEn()[1].props.value,
          startDate: renderCreateAssignmentFormInputsEn()[2].props.value,
          endDate: renderCreateAssignmentFormInputsEn()[3].props.value,
        },
      });
    }
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
      {!createdLessonData && (
        <h1>{t("Teacher__CourseDetails_CreateLesson")}</h1>
      )}
      {createdLessonData && (
        <h1>{t("Teacher__CourseDetails_LessonCreated")}</h1>
      )}
      {!createdLessonData &&
        i18next.language === "pl" &&
        renderCreateLessonFormInputs()}
      {!createdLessonData &&
        i18next.language === "en" &&
        renderCreateLessonFormInputsEn()}
      {createdLessonStatus === "completed" && createdLessonError ? (
        <div className={classes["error"]}>{createdLessonError}</div>
      ) : (
        ""
      )}
      {createdLessonStatus === "completed" && createdLessonData ? (
        <div className={classes["success"]}>
          {t("Teacher__CourseDetails_LessonSuccess")}
        </div>
      ) : (
        ""
      )}
      {createdLessonStatus === "pending" && !createdLessonData && (
        <LoadingSpinner />
      )}
      {!createdLessonData &&
        (i18next.language === "pl" ? (
          <button type="submit" disabled={!isCreateLessonFormValid()}>
            Stwórz lekcję{" "}
          </button>
        ) : (
          i18next.language === "en" && (
            <button type="submit" disabled={!isCreateLessonFormValidEn()}>
              Create lesson{" "}
            </button>
          )
        ))}
      {createdLessonStatus === "completed" && createdLessonData && (
        <button onClick={createLessonRedirectHandler}>
          {t("Teacher__CourseDetails_LessonRedirect")}
        </button>
      )}
    </form>
  );

  const createExamFormJSX = (
    <form
      className={classes["create-form"]}
      onSubmit={submitCreateExamFormHandler}
    >
      {!createdExamData && <h1>{t("Teacher__CourseDetails_CreateExam")}</h1>}
      {createdExamData && <h1>{t("Teacher__CourseDetails_ExamCreated")}</h1>}
      {!createdExamData &&
        i18next.language === "pl" &&
        renderCreateExamFormInputs()}
      {!createdExamData &&
        i18next.language === "en" &&
        renderCreateExamFormInputsEn()}
      {createdExamStatus === "completed" && createdExamError ? (
        <div className={classes["error"]}>{createdExamError}</div>
      ) : (
        ""
      )}
      {createdExamStatus === "completed" && createdExamData ? (
        <div className={classes["success"]}>
          {t("Teacher__CourseDetails_ExamSuccess")}
        </div>
      ) : (
        ""
      )}
      {createdExamStatus === "pending" && !createdExamData && (
        <LoadingSpinner />
      )}
      {!createdExamData && i18next.language === "pl" && (
        <button type="submit" disabled={!isCreateExamFormValid()}>
          Stwórz egzamin{" "}
        </button>
      )}
      {!createdExamData && i18next.language === "en" && (
        <button type="submit" disabled={!isCreateExamFormValidEn()}>
          Create exam{" "}
        </button>
      )}
      {createdExamStatus === "completed" && createdExamData && (
        <button onClick={createExamRedirectHandler}>
          {t("Teacher__CourseDetails_ExamRedirect")}
        </button>
      )}
    </form>
  );

  const createAssignmentsFormJSX = (
    <form
      className={classes["create-form"]}
      onSubmit={submitCreateAssignmentFormHandler}
    >
      {!createdAssignmentData && <h1>{t("Teacher__CourseDetails_CreateAssignment")}</h1>}
      {createdAssignmentData && <h1>{t("Teacher__CourseDetails_CreateAssignment")}</h1>}
      {!createdAssignmentData && i18next.language === "pl" && renderCreateAssignmentFormInputs()}
      {!createdAssignmentData && i18next.language === "en" && renderCreateAssignmentFormInputsEn()}
      {createdAssignmentStatus === "completed" && createdAssignmentError ? (
        <div className={classes["error"]}>{createdAssignmentError}</div>
      ) : (
        ""
      )}
      {createdAssignmentStatus === "completed" && createdAssignmentData ? (
        <div className={classes["success"]}>
          {t("Teacher__CourseDetails_AssignmentSuccess")}
        </div>
      ) : (
        ""
      )}
      {createdAssignmentStatus === "pending" && !createdAssignmentData && (
        <LoadingSpinner />
      )}
      {!createdAssignmentData && i18next.language === "pl" && (
        <button type="submit" disabled={!isCreateAssignmentFormValid()}>
          Stwórz pracę domową{" "}
        </button>
      )}
      {!createdAssignmentData && i18next.language === "en" && (
        <button type="submit" disabled={!isCreateAssignmentFormValidEn()}>
          Create assignment{" "}
        </button>
      )}
      {createdAssignmentStatus === "completed" && createdAssignmentData && (
        <button onClick={createAssignmentRedirectHandler}>
          {t("Teacher__CourseDetails_AssignmentRedirect")}
        </button>
      )}
    </form>
  );

  return (
    <div className={classes["course-details"]}>
      <h1 style={{ fontSize: "3rem" }}>
        {t("Teacher__CourseDetails_Welcome")}
      </h1>

      <section className={classes["course-details"]}>
        <div>
          <button onClick={showCreateFormHandler}>
            {showCreateLesson
              ? t("Teacher__CourseDetails_HideForm")
              : t("Teacher__CourseDetails_CreateLesson")}
          </button>
          {showCreateLesson && createLessonFormJSX}
        </div>
        <br />
        <div>
          <button onClick={showCreateExamFormHandler}>
            {showCreateExam
              ? t("Teacher__CourseDetails_HideForm")
              : t("Teacher__CourseDetails_CreateExam")}
          </button>
          {showCreateExam && createExamFormJSX}
        </div>
        <br />
        <div>
          <button onClick={showCreateAssignmentFormHandler}>
            {showCreateAssignment
              ? t("Teacher__CourseDetails_HideForm")
              : t("Teacher__CourseDetails_CreateAssignment")}
          </button>
          {showCreateAssignment && createAssignmentsFormJSX}
        </div>
        <hr />
        <div className={classes["filter-container"]}>
          <button
            onClick={showLessonsHandler}
            className={!showLessons ? classes["button-active"] : ""}
          >
            {showLessons
              ? t("Teacher__CourseDetails_HideLessons")
              : t("Teacher__CourseDetails_ShowLessons")}
          </button>
          <button
            onClick={showExamsHandler}
            className={!showExams ? classes["button-active"] : ""}
          >
            {showExams
              ? t("Teacher__CourseDetails_HideExams")
              : t("Teacher__CourseDetails_ShowExams")}
          </button>
          <button
            onClick={showAssignmentsHandler}
            className={!showAssignments ? classes["button-active"] : ""}
          >
            {showAssignments
              ? t("Teacher__CourseDetails_HideAssignments")
              : t("Teacher__CourseDetails_ShowAssignments")}
          </button>
        </div>
        <div className={classes["content-container"]}>
          {getDetailsData &&
            showLessons &&
            getDetailsStatus === "completed" &&
            getDetailsData.lessons
              .sort((a, b) => {
                var textA = a.name.toUpperCase();
                var textB = b.name.toUpperCase();
                return textA < textB ? -1 : textA > textB ? 1 : 0;
              })
              .map((item) => (
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
            getDetailsData.exams
              .sort((a, b) => {
                var textA = a.name.toUpperCase();
                var textB = b.name.toUpperCase();
                return textA < textB ? -1 : textA > textB ? 1 : 0;
              })
              .map((item) => (
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
            getDetailsData.assignments
              .sort((a, b) => {
                var textA = a.name.toUpperCase();
                var textB = b.name.toUpperCase();
                return textA < textB ? -1 : textA > textB ? 1 : 0;
              })
              .map((item) => (
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
