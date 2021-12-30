import { useParams } from "react-router-dom";
import useHttp from "../../../hooks/use-http";
import { getTasks } from "../../../lib/api/task-api";
import { useEffect } from "react";
import classes from "./AssignmentDetailsStudent.module.css"
import Section from "./Section";

const AssignmentDetailsStudent = () => {
  const params = useParams();
  const { sendRequest: getTaskRequest, data: getTaskData } = useHttp(
    getTasks,
    true
  );

  useEffect(() => {
    getTaskRequest({
      courseId: params.courseId,
      assignmentId: params.assignmentId,
    });
    return getTaskRequest;
  }, [getTaskRequest, params]);

  return (
    <div className={classes["assignment-details"]}>
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
            />
          ))}
    </div>
  );
};

export default AssignmentDetailsStudent;
