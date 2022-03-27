import {
  createAddTaskForm,
  createAddTaskFormEn,
} from "../../../lib/forms/task-form";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useForm from "../../../hooks/use-form";
import {
  addFileToTask,
  addTask,
  deleteFileFromTask,
  deleteTask,
  getTasks,
  updateTaskDescription,
} from "../../../lib/api/task-api";
import useHttp from "../../../hooks/use-http";
import classes from "./AssignmentDetails.module.css";
import Section from "./Section";
import {
  changeAssignmentDatesForm,
  changeAssignmentDatesFormEn,
} from "../../../lib/forms/assignment-form";
import { changeAssignmentDates } from "../../../lib/api/assignment-api";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

const AssignmentDetails = () => {
  const { t } = useTranslation();
  const params = useParams();
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const [showChangeDatesForm, setShowChangeDatesForm] = useState(false);
  const {
    renderFormInputs: renderAddTaskInputs,
    isFormValid: isAddTaskFormValid,
  } = useForm(createAddTaskForm);
  const {
    renderFormInputs: renderAddTaskInputsEn,
    isFormValid: isAddTaskFormValidEn,
  } = useForm(createAddTaskFormEn);
  const {
    renderFormInputs: renderChangeAssignmentDatesInputs,
    isFormValid: isChangeAssignmentDatesFormValid,
  } = useForm(changeAssignmentDatesForm);
  const {
    renderFormInputs: renderChangeAssignmentDatesInputsEn,
    isFormValid: isChangeAssignmentDatesFormValidEn,
  } = useForm(changeAssignmentDatesFormEn);
  const { sendRequest: getTaskRequest, data: getTaskData } = useHttp(
    getTasks,
    true
  );
  const {
    sendRequest: changeAssignmentDatesRequest,
    data: changeAssignmentDatesData,
    status: changeAssignmentDatesStatus,
    error: changeAssignmentDatesError,
  } = useHttp(changeAssignmentDates);
  const { sendRequest: addTaskRequest, status: addTaskStatus } =
    useHttp(addTask);
  const { sendRequest: deleteTaskRequest, status: deleteTaskStatus } =
    useHttp(deleteTask);
  const {
    sendRequest: updateTaskDescriptionRequest,
    status: updateTaskDescriptionStatus,
  } = useHttp(updateTaskDescription);
  const { sendRequest: addFileTaskRequest, status: addFileTaskStatus } =
    useHttp(addFileToTask);
  const { sendRequest: deleteFileTaskRequest, status: deleteFileTaskStatus } =
    useHttp(deleteFileFromTask);

  useEffect(() => {
    getTaskRequest({
      courseId: params.courseId,
      assignmentId: params.assignmentId,
    });
  }, [
    getTaskRequest,
    params,
    addTaskStatus,
    deleteTaskStatus,
    updateTaskDescriptionStatus,
    addFileTaskStatus,
    deleteFileTaskStatus,
    changeAssignmentDatesStatus,
  ]);

  const addTaskHandler = (event) => {
    event.preventDefault();
    if (i18next.language === "pl") {
      addTaskRequest({
        courseId: params.courseId,
        assignmentId: params.assignmentId,
        request: {
          title: renderAddTaskInputs()[0].props.value,
          points: renderAddTaskInputs()[1].props.value,
        },
      });
    } else if (i18next.language === "en") {
      addTaskRequest({
        courseId: params.courseId,
        assignmentId: params.assignmentId,
        request: {
          title: renderAddTaskInputsEn()[0].props.value,
          points: renderAddTaskInputsEn()[1].props.value,
        },
      });
    }

    setShowAddTaskForm((prevState) => {
      return !prevState;
    });
  };

  const changeAssignmentDatesHandler = (event) => {
    event.preventDefault();
    if (i18next.language === "pl") {
      changeAssignmentDatesRequest({
        courseId: params.courseId,
        assignmentId: params.assignmentId,
        request: {
          startDate: renderChangeAssignmentDatesInputs()[0].props.value,
          endDate: renderChangeAssignmentDatesInputs()[1].props.value,
        },
      });
    } else if (i18next.language === "en") {
      changeAssignmentDatesRequest({
        courseId: params.courseId,
        assignmentId: params.assignmentId,
        request: {
          startDate: renderChangeAssignmentDatesInputsEn()[0].props.value,
          endDate: renderChangeAssignmentDatesInputsEn()[1].props.value,
        },
      });
    }
  };

  const showAddTaskFormHandler = () => {
    setShowAddTaskForm((prevState) => {
      return !prevState;
    });
  };

  const showChangeAssignmentDatesFormHandler = () => {
    setShowChangeDatesForm((prevState) => !prevState);
  };

  return (
    <div className={classes["assignment-details"]}>
      <div className={classes["button-container"]}>
        <button onClick={showAddTaskFormHandler}>
          {showAddTaskForm
            ? t("Teacher__Assignments_HideForm")
            : t("Teacher__Assignments_AddAssignment")}{" "}
        </button>
      </div>
      {showAddTaskForm && (
        <form
          className={classes["create-task__form"]}
          onSubmit={addTaskHandler}
        >
          {i18next.language === "pl" && renderAddTaskInputs()}
          {i18next.language === "en" && renderAddTaskInputsEn()}
          {i18next.language === "pl" && (
            <button type="submit" disabled={!isAddTaskFormValid()}>
              Dodaj zadanie
            </button>
          )}
          {i18next.language === "en" && (
            <button type="submit" disabled={!isAddTaskFormValidEn()}>
              Add assignment
            </button>
          )}
        </form>
      )}
      <div className={classes["button-container"]}>
        <button onClick={showChangeAssignmentDatesFormHandler}>
          {showChangeDatesForm
            ? t("Teacher__Assignments_HideForm")
            : t("Teacher__Assignments_ChangeDate")}
        </button>
      </div>
      {showChangeDatesForm && (
        <form
          className={classes["create-task__form"]}
          onSubmit={changeAssignmentDatesHandler}
        >
          {i18next.language === "pl" && renderChangeAssignmentDatesInputs()}
          {i18next.language === "en" && renderChangeAssignmentDatesInputsEn()}
          {i18next.language === "pl" && <button type="submit" disabled={!isChangeAssignmentDatesFormValid()}>
            Zmień czas
          </button>}
          {i18next.language === "en" && <button type="submit" disabled={!isChangeAssignmentDatesFormValidEn()}>
            Change time
          </button>}
          {changeAssignmentDatesError && (
            <div style={{ color: "red" }}>{changeAssignmentDatesError}</div>
          )}
          {changeAssignmentDatesData && (
            <div style={{ color: "green" }}>
              {t("Teacher__Assignments_DateChanged")}
            </div>
          )}
        </form>
      )}

      {/* main content preview starts from here */}
      {(!getTaskData || getTaskData.length === 0) && (
        <div className={classes["card"]}>pusto</div>
      )}
      {getTaskData &&
        getTaskData
          .sort((a, b) => a.id - b.id)
          .map((item) => (
            <Section
              key={item.id}
              item={item}
              deleteTaskRequest={deleteTaskRequest}
              updateTaskDescriptionRequest={updateTaskDescriptionRequest}
              addFileTaskRequest={addFileTaskRequest}
              deleteFileTaskRequest={deleteFileTaskRequest}
            />
          ))}
    </div>
  );
};

export default AssignmentDetails;
