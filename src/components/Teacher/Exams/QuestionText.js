import { useParams } from "react-router";
import { useState } from "react";
import useForm from "../../../hooks/use-form";
import { addQuestionTextForm } from "../../../lib/forms/question-form";
import classes from "./QuestionText.module.css"

const QuestionText = (props) => {
    const params = useParams();
    const [showForm, setShowForm] = useState(false);
    const [answer, setAnswer] = useState("");
    const { renderFormInputs, isFormValid } = useForm(addQuestionTextForm);

    const showFormHandler = () => {
        setShowForm(!showForm);
      };

      const handleFormSubmit = (event) => {
        event.preventDefault();
        props.addQuestionTextRequest({
          courseId: params.courseId,
          examId: params.examId,
          questionId: props.question.id,
          correctAnswer: renderFormInputs()[0].props.value,
        });
        setShowForm(false);
      };

      const onAnswerChange = (event) => {
          setAnswer(event.target.value);
      }

      const textForm = (item) => {
        {
          return (
            <form>
                <label htmlFor="answer">Podaj odpowiedź </label><br/>
                <input type="text" id="answer" name="answer" value={answer} onChange={onAnswerChange} />
            </form>
          );
        }
      };

      return <>
      {props.question.type === "text" && props.question.correctAnswer != null &&
        textForm(props.question)}
         {props.question.correctAnswer == null && <div className={classes.error}>Wypełnji formularz</div>}
      {<button onClick={showFormHandler}>
        {!showForm ? "Pokaż formularz" : "Zamknji formularz"}
      </button>}
      {showForm  &&(
        <form
          className={classes.createQuestionTextForm}
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
}


export default QuestionText;