import { useParams } from "react-router-dom";
import classes from "./ExamsPreviewSubmissionDetails.module.css"
import useHttp from "../../../hooks/use-http";
import { useEffect } from "react";
import { getSubmissionAnswers } from "../../../lib/api/answer-api";
import TextAreaItem from "./Answers/TextAreaItem";
import { rateAnswer } from "../../../lib/api/answer-api";
import TextItem from "./Answers/TextItem";
import RadioItem from "./Answers/RadioItem";

const ExamsPreviewSubmissionDetails = () => {
    const params = useParams();
    const {
      sendRequest: getAnswersRequest,
      data: getAnswersData,
    } = useHttp(getSubmissionAnswers, true);
    const { sendRequest: rateAnswerRequest, data: rateAnswerData, status: rateAnswerStatus } =
    useHttp(rateAnswer);
    

    useEffect(() => {
        getAnswersRequest({
          courseId: params.courseId,
          examId: params.examId,
          submissionId: params.submissionId,
        });
      }, [getAnswersRequest, params, rateAnswerStatus]);
    

      const rateAnswerFormHandler = (event, answerId, points) => {
        event.preventDefault();
        rateAnswerRequest({
          courseId: params.courseId,
          examId: params.examId,
          submissionId: params.submissionId,
          answerId: answerId,
          request: { points: points },
        });
      };

    return (
        <div className={classes["submission-details"]}>
      {getAnswersData &&
        getAnswersData
          .sort((a, b) => a.id - b.id)
          .map((item) => (
            <div key={item.id} className={classes["submission"]}>
              <div className={classes["card"]}>
                <h3>{item.description}</h3>
                 {item.type === "textarea" && (
                  <TextAreaItem
                    answer={item}
                    rateAnswerFormHandler={rateAnswerFormHandler}
                  >{rateAnswerData && rateAnswerData.status === "ERROR" && rateAnswerData.message}</TextAreaItem>
                )} 
                 {item.type === "text" && (
                  <TextItem
                    answer={item}
                    rateAnswerFormHandler={rateAnswerFormHandler}
                  >{rateAnswerData && rateAnswerData.status === "ERROR" && rateAnswerData.message}</TextItem>
                )} 
                {item.type === "radio" && (
                  <RadioItem
                    item={item}
                    rateAnswerFormHandler={rateAnswerFormHandler}
                  >{rateAnswerData && rateAnswerData.status === "ERROR" && rateAnswerData.message}</RadioItem>
                )} 
              </div>
            </div>
          ))}
    </div>
    )
}

export default ExamsPreviewSubmissionDetails