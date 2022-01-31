import { useParams } from "react-router";
import classes from "./ExamDetailsStudent.module.css";
import useHttp from "../../hooks/use-http";
import { getQuestions } from "../../lib/api/question-api";
import { useEffect } from "react";
import Card from "../UI/Card";
import AnswerText from "./Answers/AnswerText";
import AnswerTextArea from "./Answers/AnswerTextArea";
import { submitAnswers } from "../../lib/api/answer-api";
import { checkSubmission } from "../../lib/api/submission-api";
import CountdownTimer from "../UI/CountdownTimer";
import { useState } from "react";
import { usePrompt } from "../../hooks/use-blocker";

const ExamDetailsStudent = () => {
  let [isBlocking] = useState(true);

  usePrompt("Czy napewno chcesz wyjść?",
     isBlocking);

  const params = useParams();
  const { sendRequest: getQuestionsRequest, data: getQuestionsData } = useHttp(
    getQuestions,
    true
  );
  const {
    sendRequest: checkSubmissionRequest,
    data: checkSubmissionData,
    error: checkSubmissionError,
  } = useHttp(checkSubmission, true);
  const {
    sendRequest: submitAnswersRequest,
    data: submitAnswersData,
    error: submitAnswersError,
    status : submitAnswersStatus
  } = useHttp(submitAnswers);

  let answersMap = new Map();

  useEffect(() => {
    getQuestionsRequest({
      courseId: params.courseId,
      examId: params.examId,
    });
    checkSubmissionRequest({
      courseId: params.courseId,
      examId: params.examId
    })
  }, [getQuestionsRequest, checkSubmissionRequest, params.courseId, params.examId, submitAnswersStatus]);

  const handleRadio = (event, id) => {
    answersMap.set(id, event.target.value);
  };

  const handleText = (event, id, setState) => {
    setState(event.target.value);
    answersMap.set(id, event.target.value);
  };

  const handleTextArea = (event, id, setState) => {
    setState(event.target.value);
    answersMap.set(id, event.target.value);
  };

  const saveExamHandler = (event) => {
    event.preventDefault();
    const tmp = [];
    for (const [key, value] of answersMap.entries()) {
      tmp.push({
        questionId: key,
        answer: value,
      });
    }

    submitAnswersRequest({
      courseId: params.courseId,
      examId: params.examId,
      submissionId: params.submissionId,
      request: {
        answers: tmp,
      },
    });
  };

  const radioForm = (item) => {
      return (
        <form className={classes["radio-question__form"]}>
          <div>
            {item.queries.map((query) => {
              return (
                <div className={classes["radio-question__form-elements"]} key={query.id}>
                  <input
                    type="radio"
                    id={query.id}
                    name="radio"
                    value={query.text}
                    onChange={(e) => handleRadio(e, item.id)}
                  />
                  <label htmlFor={query.id}>{query.text}</label>
                </div>
              );
            })}
          </div>
          </form>
      );
  };

  console.log(checkSubmissionData)

  return (
    <div className={classes.questionDetails}>
      {checkSubmissionData && checkSubmissionData.status === "PENDING" && <CountdownTimer date={checkSubmissionData.endDate}/>}
      {(!getQuestionsData || getQuestionsData.length === 0) && <div>pusto</div>}
      {getQuestionsData && checkSubmissionData && checkSubmissionData.status === "PENDING" &&
        getQuestionsData
          .sort((a, b) => a.id - b.id)
          .map((item) => (
            <div key={item.id} className={classes.question}>
              <Card>
                <h3>{item.description}</h3>
                {item.type === "radio" && radioForm(item)}
                {item.type === "text" && (
                  <AnswerText handleText={handleText} item={item} />
                )}
                {item.type === "textarea" && (
                  <AnswerTextArea
                    handleTextArea={handleTextArea}
                    question={item}
                  />
                )}
              </Card>
            </div>
          ))}
      {checkSubmissionData && checkSubmissionData.status === "PENDING" && <div>
      <form onSubmit={saveExamHandler}>
        <button type="submit">Zapisz</button>
      </form></div>}
      {/* {submitAnswersData && <div>{submitAnswersData.message}</div>} */}
      {submitAnswersError && <div>{submitAnswersError}</div>}
      {checkSubmissionData && checkSubmissionData.status === "ERROR" && <Card><h3>Test zakończony</h3><div>{checkSubmissionData.message}</div></Card>}
      {checkSubmissionData && checkSubmissionData.status === "CHECKING" && <Card><h3>Egzamin wymaga sprawdzenia przez nauczyciela</h3><div>{checkSubmissionData.message}</div></Card>}
      {checkSubmissionError && <Card><h3>{checkSubmissionError}</h3></Card>}
    </div>
  );
};

export default ExamDetailsStudent;
