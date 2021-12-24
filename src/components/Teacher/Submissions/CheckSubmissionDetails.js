import { useParams } from "react-router";
import { getUncheckedAnswers, rateAnswer } from "../../../lib/api/answer-api";
import useHttp from "../../../hooks/use-http";
import classes from "./CheckSubmissionDetails.module.css";
import { useEffect } from "react";
import CheckTextArea from "./Answers/CheckTextArea";

const CheckSubmissionDetails = () => {
  const params = useParams();
  const {
    sendRequest: getUncheckedAnswersRequest,
    data: getUncheckedAnswersData,
  } = useHttp(getUncheckedAnswers, true);
  const { sendRequest: rateAnswerRequest, data: rateAnswerData, status: rateAnswerStatus } =
    useHttp(rateAnswer);

  useEffect(() => {
    getUncheckedAnswersRequest({
      courseId: params.courseId,
      examId: params.examId,
      submissionId: params.submissionId,
    });
  }, [getUncheckedAnswersRequest, params, rateAnswerStatus]);

  const handleTextArea = (event, setState) => {
    setState(event.target.value);
  };

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
      {(!getUncheckedAnswersData || getUncheckedAnswersData.length === 0) && (
        <div className={classes["card"]}><div><h3 className={classes["checked-exams"]}>Sprawdzony</h3></div></div>
      )}
      {getUncheckedAnswersData &&
        getUncheckedAnswersData
          .sort((a, b) => a.id - b.id)
          .map((item) => (
            <div key={item.id} className={classes["submission"]}>
              <div className={classes["card"]}>
                <h3>{item.description}</h3>
                {item.type === "textarea" && (
                  <CheckTextArea
                    handleTextArea={handleTextArea}
                    answer={item}
                    rateAnswerFormHandler={rateAnswerFormHandler}
                  >{rateAnswerData && rateAnswerData.status === "ERROR" && rateAnswerData.message}</CheckTextArea>
                )}
              </div>
            </div>
          ))}
    </div>
  );
};

export default CheckSubmissionDetails;
