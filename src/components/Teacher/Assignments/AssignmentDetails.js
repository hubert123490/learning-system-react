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

const AssignmentDetails = () => {
  const params = useParams();
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const {
    renderFormInputs: renderAddTaskInputs,
    isFormValid: isAddTaskFormValid,
  } = useForm(createAddTaskForm);
  const { sendRequest: getTaskRequest, data: getTaskData } = useHttp(
    getTasks,
    true
  );
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
    return getTaskRequest;
  }, [
    getTaskRequest,
    params,
    addTaskStatus,
    deleteTaskStatus,
    updateTaskDescriptionStatus,
    addFileTaskStatus,
    deleteFileTaskStatus,
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

  const showAddTaskFormHandler = () => {
    setShowAddTaskForm((prevState) => {
      return !prevState;
    });
  };

  return (
    <div className={classes["assignment-details"]}>
      <button onClick={showAddTaskFormHandler}>
        {showAddTaskForm ? "Zamknji formularz" : "Dodaj zadanie"}{" "}
      </button>
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