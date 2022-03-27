import { useParams } from "react-router-dom";
import {
  getTaskSubmissionAnswers,
  rateTaskAnswer,
} from "../../../lib/api/task-answer-api";
import useHttp from "../../../hooks/use-http";
import { useEffect } from "react";
import classes from "./AssignmentsPreviewSubmissionDetails.module.css";
import Section from "./Section";
import { useTranslation } from "react-i18next";

const AssignmentsPreviewSubmissionDetails = () => {
  const { t } = useTranslation();
  const params = useParams();
  const { sendRequest: getAnswersRequest, data: getAnswersData } = useHttp(
    getTaskSubmissionAnswers,
    true
  );
  const {
    sendRequest: rateAnswerRequest,
    data: rateAnswerData,
    status: rateAnswerStatus,
  } = useHttp(rateTaskAnswer);

  useEffect(() => {
    getAnswersRequest({
      courseId: params.courseId,
      assignmentId: params.assignmentId,
      taskSubmissionId: params.taskSubmissionId,
    });
  }, [getAnswersRequest, params, rateAnswerStatus]);

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

  return (
    <div className={classes["assignment-details"]}>
      {(!getAnswersData || getAnswersData.length === 0) && (
        <div className={classes["card"]}>{t("Teacher__AssignmentsPreview_Empty")}</div>
      )}
      {getAnswersData &&
        getAnswersData
          .sort((a, b) => a.id - b.id)
          .map((item) => (
            <Section
              key={item.id}
              item={item}
              rateAnswerFormHandler={rateAnswerFormHandler}
            >
              {rateAnswerData &&
                rateAnswerData.status === "ERROR" &&
                rateAnswerData.message}
            </Section>
          ))}
    </div>
  );
};

export default AssignmentsPreviewSubmissionDetails;
