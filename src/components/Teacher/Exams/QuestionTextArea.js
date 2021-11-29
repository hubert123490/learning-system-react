import { useState } from "react";
import { useParams } from "react-router";
import useForm from "../../../hooks/use-form";
import { addQuestionTextAreaForm } from "../../../lib/forms/question-form";
import classes from "./QuestionTextArea.module.css"

const QuestionTextArea = (props) => {
  const params = useParams();
  const [showForm, setShowForm] = useState(false);
  const [text, setText] = useState("");
  const { renderFormInputs, isFormValid } = useForm(addQuestionTextAreaForm);

  const showFormHandler = () => {
    setShowForm(!showForm);
  };

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    props.addQuestionTextAreaRequest({
      courseId: params.courseId,
      examId: params.examId,
      questionId: props.question.id,
      correctAnswer: renderFormInputs()[0].props.value,
    });
    setShowForm(false);
  };

  const textAreaForm = () => {
    return (
      <form>
        <p>{props.question.description}</p>
        <textarea rows={4} cols={120} value={text} onChange={handleChange} />
        <br />
      </form>
    );
  };

  return (
    <>
      {props.question.type === "textarea" &&
        props.question.correctAnswer !== null &&
        textAreaForm(props.question)}
      {props.question.correctAnswer === null && (
        <button onClick={showFormHandler}>
          {!showForm ? "Pokaż formularz" : "Zamknji formularz"}
        </button>
      )}
      {showForm && props.question.correctAnswer === null && (
        <form
          className={classes.createQuestionTextAreaForm}
          onSubmit={handleFormSubmit}
        >
          {renderFormInputs()}
          <br />
          <button type="submit" disabled={!isFormValid()}>
            Zapisz
          </button>
        </form>
      )}
    </>
  );
};

export default QuestionTextArea;
