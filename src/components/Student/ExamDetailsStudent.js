import { useParams } from "react-router";
import classes from "./ExamDetailsStudent.module.css";
import useHttp from "../../hooks/use-http";
import { getQuestions } from "../../lib/api/question-api";
import { useEffect } from "react";
import Card from "../UI/Card";
import { Form } from "react-bootstrap";
import AnswerText from "./Answers/AnswerText";
import AnswerTextArea from "./Answers/AnswerTextArea";
import { submitAnswers } from "../../lib/api/answer-api";
import { checkSubmission } from "../../lib/api/submission-api";

const ExamDetailsStudent = () => {
  const params = useParams();
  const { sendRequest: getQuestionsRequest, data: getQuestionsData } = useHttp(
    getQuestions,
    true
  );
  const {
    sendRequest: checkSubmissionRequest,
    data: checkSubmissionData,
    error: checkSubmissionError,
    status: checkSubmissionStatus,
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
    {
      return (
        <Form className={classes.radioForm}>
          <div key={`default-radio`} className="mb-3">
            {item.queries.map((query) => {
              return (
                <Form.Check
                  type="radio"
                  id={query.id}
                  label={query.text}
                  value={query.text}
                  name="radio"
                  key={query.id}
                  onChange={(e) => handleRadio(e, item.id)}
                />
              );
            })}
          </div>
        </Form>
      );
    }
  };

  console.log(checkSubmissionData)

  return (
    <div className={classes.questionDetails}>
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
      {submitAnswersData && <div>{submitAnswersData.message}</div>}
      {submitAnswersError && <div>{submitAnswersError}</div>}
      {checkSubmissionData && checkSubmissionData.status === "ERROR" && <Card><h3>Test zakończony</h3><div>{checkSubmissionData.message}</div></Card>}
    </div>
  );
};

export default ExamDetailsStudent;
