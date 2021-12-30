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
  addQuestionTextArea,
} from "../../../lib/api/question-api";
import classes from "./ExamDetails.module.css";
import ExamDetailsItem from "./ExamDetailsItem"

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
    status: addQuestionStatus,
  } = useHttp(addQuestion);
  const {
    sendRequest: deleteQuestionRequest,
    status: deleteQuestionStatus,
  } = useHttp(deleteQuestion);
  const {
    sendRequest: addQuestionRadioRequest,
    status: addQuestionRadioStatus,
  } = useHttp(addQuestionRadio);
  const {
    sendRequest: addQuestionTextRequest,
    status: addQuestionTextStatus,
  } = useHttp(addQuestionText);
  const {
    sendRequest: addQuestionTextAreaRequest,
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
        maxPoints: renderAddQuestionInputs()[1].props.value,
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
    <div className={classes["exam-details"]}>
      <button onClick={showAddQuestionFormHandler}>
        {showAddQuestionForm ? "Zamknji formularz" : "Dodaj pytanie"}{" "}
      </button>
      {showAddQuestionForm && (
        <form
          className={classes["create-question__form"]}
          onSubmit={addQuestionHandler}
        >
          {renderAddQuestionInputs()}
          <label htmlFor="type-select">Wybierz formę pytania:</label>
          <select
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
          </select>
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
            <ExamDetailsItem 
              item={item}
              addQuestionRadioRequest={addQuestionRadioRequest}
              addQuestionTextRequest={addQuestionTextRequest}
              addQuestionTextAreaRequest={addQuestionTextAreaRequest}
              deleteQuestionRequest={deleteQuestionRequest}
              key={item.id}
            />
          ))}
    </div>
  );
};

export default ExamDetails;
