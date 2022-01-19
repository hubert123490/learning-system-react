import { createAddTaskForm } from "../../../lib/forms/task-form";
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
import { changeAssignmentDatesForm } from "../../../lib/forms/assignment-form";
import { changeAssignmentDates } from "../../../lib/api/assignment-api";

const AssignmentDetails = () => {
  const params = useParams();
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const [showChangeDatesForm, setShowChangeDatesForm] = useState(false);
  const {
    renderFormInputs: renderAddTaskInputs,
    isFormValid: isAddTaskFormValid,
  } = useForm(createAddTaskForm);
  const {
    renderFormInputs: renderChangeAssignmentDatesInputs,
    isFormValid: isChangeAssignmentDatesFormValid,
  } = useForm(changeAssignmentDatesForm);
  const { sendRequest: getTaskRequest, data: getTaskData } = useHttp(
    getTasks,
    true
  );
  const { sendRequest: changeAssignmentDatesRequest, data: changeAssignmentDatesData, status: changeAssignmentDatesStatus, error: changeAssignmentDatesError } =
  useHttp(changeAssignmentDates);
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
    changeAssignmentDatesStatus
  ]);

  const addTaskHandler = (event) => {
    event.preventDefault();
    addTaskRequest({
      courseId: params.courseId,
      assignmentId: params.assignmentId,
      request : {
      title: renderAddTaskInputs()[0].props.value,
      points: renderAddTaskInputs()[1].props.value
    }});
    setShowAddTaskForm((prevState) => {
      return !prevState;
    });
  };

  const changeAssignmentDatesHandler = (event) => {
    event.preventDefault();
    changeAssignmentDatesRequest({
      courseId: params.courseId,
      assignmentId: params.assignmentId,
      request: {
        startDate: renderChangeAssignmentDatesInputs()[0].props.value,
        endDate: renderChangeAssignmentDatesInputs()[1].props.value,
      },
    });
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
        {showAddTaskForm ? "Zamknji formularz" : "Dodaj zadanie"}{" "}
      </button>
      </div>
      {showAddTaskForm && (
        <form
          className={classes["create-task__form"]}
          onSubmit={addTaskHandler}
        >
          {renderAddTaskInputs()}
          <button type="submit" disabled={!isAddTaskFormValid()}>
            Dodaj zadanie
          </button>
        </form>
      )}
      <div className={classes["button-container"]}>
        <button onClick={showChangeAssignmentDatesFormHandler}>
          {showChangeDatesForm ? "Zamknij formularz" : "Zmień datę"}
        </button>
      </div>
      {showChangeDatesForm && (
        <form className={classes["create-task__form"]}
        onSubmit={changeAssignmentDatesHandler} >
          {renderChangeAssignmentDatesInputs()}
          <button type="submit" disabled={!isChangeAssignmentDatesFormValid()}>
            Zmień czas
          </button>
          {changeAssignmentDatesError && <div style={{color : "red"}}>{changeAssignmentDatesError}</div>}
          {changeAssignmentDatesData && <div style={{color: "green"}}>{changeAssignmentDatesData.message}</div>}
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
