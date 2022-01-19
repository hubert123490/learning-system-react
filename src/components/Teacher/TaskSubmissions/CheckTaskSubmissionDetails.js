import { getUncheckedTaskAnswers, rateTaskAnswer } from "../../../lib/api/task-answer-api";
import { useParams } from "react-router-dom";
import useHttp from "../../../hooks/use-http";
import { useEffect } from "react";
import Section from "../AssignmentsPreview/Section";
import classes from "./CheckTaskSubmissionDetails.module.css"

const CheckTaskSubmissionDetails = () => {
    const params = useParams();
    const {
      sendRequest: getUncheckedAnswersRequest,
      data: getUncheckedAnswersData,
    } = useHttp(getUncheckedTaskAnswers, true);
    const { sendRequest: rateAnswerRequest, data: rateAnswerData, status: rateAnswerStatus } =
      useHttp(rateTaskAnswer);
  
    useEffect(() => {
      getUncheckedAnswersRequest({
        courseId: params.courseId,
        assignmentId: params.assignmentId,
        taskSubmissionId: params.taskSubmissionId,
      });
    }, [getUncheckedAnswersRequest, params, rateAnswerStatus]);


    const rateAnswerFormHandler = (event, taskAnswerId, points) => {
        event.preventDefault();
        rateAnswerRequest({
          courseId: params.courseId,
          assignmentId: params.assignmentId,
          taskSubmissionId: params.taskSubmissionId,
          taskAnswerId: taskAnswerId,
          request: { points: points },
        });
      };

      return <div className={classes["submission-details"]}>
      {(!getUncheckedAnswersData || getUncheckedAnswersData.length === 0) && (
        <div className={classes["card"]}>Sprawdzono wszystkie prace</div>
      )}
      {getUncheckedAnswersData &&
        getUncheckedAnswersData
          .sort((a, b) => a.id - b.id)
          .map((item) => (
            <Section
              key={item.id}
              item={item}
              rateAnswerFormHandler={rateAnswerFormHandler}
            >{rateAnswerData && rateAnswerData.status === "ERROR" && rateAnswerData.message}</Section>
          ))}
    </div>
}

export default CheckTaskSubmissionDetails