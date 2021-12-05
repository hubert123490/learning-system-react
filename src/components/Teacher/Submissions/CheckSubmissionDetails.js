import { useParams } from "react-router";
import { getUncheckedAnswers, rateAnswer } from "../../../lib/api/answer-api";
import useHttp from "../../../hooks/use-http";
import classes from "./CheckSubmissionDetails.module.css";
import { useEffect } from "react";
import Card from "../../UI/Card";
import CheckTextArea from "./Answers/CheckTextArea";

const CheckSubmissionDetails = () => {
  const params = useParams();
  const {
    sendRequest: getUncheckedAnswersRequest,
    data: getUncheckedAnswersData,
  } = useHttp(getUncheckedAnswers, true);
  const { sendRequest: rateAnswerRequest, data: rateAnswerData, error: rateAnswerError, status: rateAnswerStatus } =
    useHttp(rateAnswer);

  useEffect(() => {
    getUncheckedAnswersRequest({
      courseId: params.courseId,
      examId: params.examId,
      submissionId: params.submissionId,
    });
  }, [getUncheckedAnswersRequest, params, rateAnswerStatus]);

  const handleTextArea = (event, id, setState) => {
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
    <div className={classes.submissionDetails}>
      {(!getUncheckedAnswersData || getUncheckedAnswersData.length === 0) && (
        <Card><div><h3>Sprawdzony</h3></div></Card>
      )}
      {getUncheckedAnswersData &&
        getUncheckedAnswersData
          .sort((a, b) => a.id - b.id)
          .map((item) => (
            <div key={item.id} className={classes.submission}>
              <Card>
                <h3>{item.description}</h3>
                {item.type === "textarea" && (
                  <CheckTextArea
                    handleTextArea={handleTextArea}
                    answer={item}
                    rateAnswerFormHandler={rateAnswerFormHandler}
                  />
                )}
              </Card>
            </div>
          ))}
    </div>
  );
};

export default CheckSubmissionDetails;
