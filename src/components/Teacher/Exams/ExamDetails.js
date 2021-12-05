import { useParams } from "react-router";
import { addQuestionForm } from "../../../lib/forms/question-form";
import useForm from "../../../hooks/use-form";
import { useState, useEffect } from "react";
import useHttp from "../../../hooks/use-http";
import {
  addQuestion,
  deleteQuestion,
  getQuestions,
  addQuestionRadio,
  addQuestionText,
  addQuestionTextArea
} from "../../../lib/api/question-api";
import classes from "./ExamDetails.module.css";
import Card from "../../UI/Card";
import { Form } from "react-bootstrap";
import QuestionRadio from "./QuestionRadio";
import QuestionText from "./QuestionText";
import QuestionTextArea from "./QuestionTextArea";

const ExamDetails = () => {
  const params = useParams();
  const [questionType, setQuestionType] = useState("radio");
  const [showAddQuestionForm, setShowAddQuestionForm] = useState(false);
  const {
    renderFormInputs: renderAddQuestionInputs,
    isFormValid: isAddQuestionFormValid,
  } = useForm(addQuestionForm);
  const { sendRequest: getQuestionsRequest, data: getQuestionsData } = useHttp(
    getQuestions,
    true
  );
  const {
    sendRequest: addQuestionRequest,
    data: addQuestionData,
    status: addQuestionStatus,
  } = useHttp(addQuestion);
  const {
    sendRequest: deleteQuestionRequest,
    data: deleteQuestionData,
    status: deleteQuestionStatus,
  } = useHttp(deleteQuestion);
  const {
    sendRequest: addQuestionRadioRequest,
    data: addQuestionRadioData,
    error: addQuestionRadioError,
    status: addQuestionRadioStatus,
  } = useHttp(addQuestionRadio);
  const {
    sendRequest: addQuestionTextRequest,
    data: addQuestionTextData,
    error: addQuestionTextError,
    status: addQuestionTextStatus,
  } = useHttp(addQuestionText);
  const {
    sendRequest: addQuestionTextAreaRequest,
    data: addQuestionTextAreaData,
    error: addQuestionTextAreaError,
    status: addQuestionTextAreaStatus,
  } = useHttp(addQuestionTextArea);

  useEffect(() => {
    getQuestionsRequest({
      courseId: params.courseId,
      examId: params.examId,
    });
  }, [
    getQuestionsRequest,
    params,
    addQuestionStatus,
    deleteQuestionStatus,
    addQuestionRadioStatus,
    addQuestionTextStatus,
    addQuestionTextAreaStatus
  ]);

  const addQuestionHandler = (event) => {
    event.preventDefault();
    addQuestionRequest({
      courseId: params.courseId,
      examId: params.examId,
      request: {
        description: renderAddQuestionInputs()[0].props.value,
        type: questionType,
        maxPoints: renderAddQuestionInputs()[1].props.value
      },
    });
    setShowAddQuestionForm(!showAddQuestionForm);
  };

  const showAddQuestionFormHandler = () => {
    setShowAddQuestionForm(!showAddQuestionForm);
  };

  const handleQuestionTypeChange = (event) => {
    setQuestionType(event.target.value);
  };


  return (
    <div className={classes.questionDetails}>
      <button onClick={showAddQuestionFormHandler}>
        {showAddQuestionForm ? "Zamknji formularz" : "Dodaj pytanie"}{" "}
      </button>
      {showAddQuestionForm && (
        <form
          className={classes.createQuestionForm}
          onSubmit={addQuestionHandler}
        >
          {renderAddQuestionInputs()}
          <label htmlFor="type-select">Wybierz formę pytania:</label>
          <Form.Select
            value={questionType}
            onChange={handleQuestionTypeChange}
            name="types"
            id="type-select"
            required
          >
            <option value="radio">Zadanie zamknięte</option>
            <option value="text">Krótkie zadanie otwarte</option>
            <option value="textarea">
              Długie zadanie otwarte (sprawozdanie, kod itp.)
            </option>
          </Form.Select>
          <br />
          <button type="submit" disabled={!isAddQuestionFormValid()}>
            Dodaj pytanie
          </button>
        </form>
      )}
      {(!getQuestionsData || getQuestionsData.length === 0) && <div>pusto</div>}
      {getQuestionsData &&
        getQuestionsData
          .sort((a, b) => b.id - a.id)
          .map((item) => (
            <div key={item.id} className={classes.question}>
              <Card>
                <h3>{item.description}</h3>
                {item.type === "radio" && <QuestionRadio question={item} addQuestionRadioRequest={addQuestionRadioRequest} />}
                {item.type === "text" && <QuestionText question={item} addQuestionTextRequest={addQuestionTextRequest} />}
                {item.type === "textarea" && <QuestionTextArea question={item} addQuestionTextAreaRequest={addQuestionTextAreaRequest} />}
                <hr />
                <button
                  onClick={() => {
                    if (window.confirm(`Czy napewno chcesz usunąć?`)) {
                      deleteQuestionRequest({
                        courseId: params.courseId,
                        examId: params.examId,
                        questionId: item.id,
                      });
                    }
                  }}
                >
                  Usuń pytanie
                </button>
              </Card>
            </div>
          ))}
    </div>
  );
};

export default ExamDetails;
