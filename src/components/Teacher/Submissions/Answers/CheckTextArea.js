import { useState } from "react";
import { useParams } from "react-router";
import { rateAnswerForm } from "../../../../lib/forms/answer-form";
import useForm from "../../../../hooks/use-form";
import classes from "./CheckTextArea.module.css"

const CheckTextArea = (props) => {
  const params = useParams();
  const [answer, setAnswer] = useState(props.answer.givenAnswer);
  const {
    renderFormInputs: renderRateAnswerFormInputs,
    isFormValid: isRateAnswerFormValid,
  } = useForm(rateAnswerForm);

  return (
    <>
    <form>
      <p>{props.answer.description}</p>
      <textarea
        style={{ width: "100%", height: "5rem" }}
        value={answer}
        onChange={(e) => props.handleTextArea(e, props.answer.id, setAnswer)}
        disabled
      />
      <br />
    </form>
    <form onSubmit={(e) => props.rateAnswerFormHandler(e, props.answer.id, renderRateAnswerFormInputs()[0].props.value)} className={classes.rateAnswerForm}>
      {renderRateAnswerFormInputs()}
      <div style={{marginBottom: "1rem"}}>Maksymalna liczba punktów: {props.answer.maxPoints}</div>
      <button type="submit">Oceń</button>
    </form>
    </>
  );
};

export default CheckTextArea;
