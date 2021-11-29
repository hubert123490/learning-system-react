import { useState } from "react";
import { addQuestionRadioForm } from "../../../lib/forms/question-form";
import useForm from "../../../hooks/use-form";
import { Form } from "react-bootstrap";
import classes from "./QuestionRadio.module.css";
import { useParams } from "react-router";

const QuestionRadio = (props) => {
  const params = useParams();
  const [showForm, setShowForm] = useState(false);
  const { renderFormInputs, isFormValid } = useForm(addQuestionRadioForm);
  const [correctAnswer, setCorrectAnswer] = useState(
    "Wybierz prawidłową odpowiedź (po wypełnieniu opcji)"
  );

  const handleCorrectAnswerChange = (event) => {
    setCorrectAnswer(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const radios = [];
    renderFormInputs().map((item) => {
      if(item.props.value !== "")
        radios.push(item.props.value)
    })
    props.addQuestionRadioRequest({
      courseId: params.courseId,
      examId: params.examId,
      questionId: props.question.id,
      request: {
        correctAnswer: correctAnswer,
        queries: radios,
      },
    });
    setShowForm(false);
  };

  const isSelectValid = () => {
    return (
      (correctAnswer === renderFormInputs()[0].props.value && renderFormInputs()[0].props.value !== "") ||
      (correctAnswer === renderFormInputs()[1].props.value && renderFormInputs()[0].props.value !== "") ||
      (correctAnswer === renderFormInputs()[2].props.value && renderFormInputs()[0].props.value !== "") ||
      (correctAnswer === renderFormInputs()[3].props.value && renderFormInputs()[0].props.value !== "")
    );
  };

  const isAllValid = () => {
    return isSelectValid() && isFormValid();
  };

  const showFormHandler = () => {
    setShowForm(!showForm);
  };

  const radioForm = (item) => {
    {
      return (
        <Form className={classes.radioForm}>
          <div key={`default-radio`} className="mb-3">
            <p>{item.description}</p>
            {item.queries.map((item) => {
              return <Form.Check
              type="radio"
              id={item.id}
              label={item.text}
              value={item.text}
              name="radio"
              key={item.id}
            />
            })}
          </div>
        </Form>
      );
    }
  };

  return (
    <div>
      {props.question.type === "radio" &&
        props.question.queries.length !== 0 &&
        radioForm(props.question)}
      {props.question.queries.length === 0 && <button onClick={showFormHandler}>
        {!showForm ? "Pokaż formularz" : "Zamknji formularz"}
      </button>}
      {showForm && (
        <form
          className={classes.createQuestionRadioForm}
          onSubmit={handleFormSubmit}
        >
          {renderFormInputs()}
          <label htmlFor="type-select">Prawidłowa odpowiedź:</label>
          <Form.Select
            value={correctAnswer}
            onChange={handleCorrectAnswerChange}
            name="correctAnswer"
            id="answer-select"
            required
          >
            <option value="null">
              Wybierz prawidłową odpowiedź (po wypełnieniu opcji)
            </option>
            <option value={renderFormInputs()[0].props.value}>
              {renderFormInputs()[0].props.value === ""
                ? "Wypełnji opcję pierwszą"
                : renderFormInputs()[0].props.value}
            </option>
            <option value={renderFormInputs()[1].props.value}>
              {renderFormInputs()[1].props.value === ""
                ? "Wypełnji opcję drugą"
                : renderFormInputs()[1].props.value}
            </option>
            <option value={renderFormInputs()[2].props.value}>
              {renderFormInputs()[2].props.value === ""
                ? "Wypełnji opcję trzecią"
                : renderFormInputs()[2].props.value}
            </option>
            <option value={renderFormInputs()[3].props.value}>
              {renderFormInputs()[3].props.value === ""
                ? "Wypełnji opcję czwartą"
                : renderFormInputs()[3].props.value}
            </option>
          </Form.Select>
          <br />
          <button type="submit" disabled={!isSelectValid()}>
            Zapisz
          </button>
        </form>
      )}
    </div>
  );
};

export default QuestionRadio;
