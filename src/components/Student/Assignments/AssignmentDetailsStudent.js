import { useParams } from "react-router-dom";
import useHttp from "../../../hooks/use-http";
import { getTasks } from "../../../lib/api/task-api";
import { useEffect } from "react";
import classes from "./AssignmentDetailsStudent.module.css";
import Section from "./Section";
import { addFileToTaskAnswer, deleteTaskAnswerFile } from "../../../lib/api/task-answer-api";
import { useTranslation } from "react-i18next";

const AssignmentDetailsStudent = () => {
  const { t } = useTranslation();
  const params = useParams();
  const { sendRequest: getTaskRequest, data: getTaskData } = useHttp(
    getTasks,
    true
  );
  const {
    sendRequest: addFileToTaskAnswerRequest,
    data: getAddFileToTaskAnswerData,
  } = useHttp(addFileToTaskAnswer);
  const {
    sendRequest: deleteFileFromTaskAnswerRequest,
    data: getDeleteFromTaskAnswerData,
    error: deleteFileFromTaskAnswerError
  } = useHttp(deleteTaskAnswerFile);

  useEffect(() => {
    getTaskRequest({
      courseId: params.courseId,
      assignmentId: params.assignmentId,
    });
    return getTaskRequest;
  }, [getTaskRequest, params, getAddFileToTaskAnswerData, getDeleteFromTaskAnswerData]);


  return (
    <div className={classes["assignment-details"]}>
      {(!getTaskData || getTaskData.length === 0) && (
        <div className={classes["card"]}>{t("Student__Assignment_Empty")}</div>
      )}
      {getTaskData &&
        getTaskData
          .sort((a, b) => a.id - b.id)
          .map((item) => (
            <Section
              key={item.id}
              item={item}
              addFileToTaskAnswer={addFileToTaskAnswerRequest}
              deleteTaskAnswerFile={deleteFileFromTaskAnswerRequest}
              deleteFileFromTaskAnswerError={deleteFileFromTaskAnswerError}
            />
          ))}
    </div>
  );
};

export default AssignmentDetailsStudent;
