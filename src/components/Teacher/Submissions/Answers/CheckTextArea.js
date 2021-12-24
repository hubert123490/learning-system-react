import { useState } from "react";
import { rateAnswerForm } from "../../../../lib/forms/answer-form";
import useForm from "../../../../hooks/use-form";
import classes from "./CheckTextArea.module.css"

const CheckTextArea = (props) => {
  const [answer, setAnswer] = useState(props.answer.givenAnswer);
  const {
    renderFormInputs: renderRateAnswerFormInputs,
    isFormValid: isRateAnswerFormValid,
  } = useForm(rateAnswerForm);

  return (
    <>
    <form className={classes["textarea-display"]}>
      <textarea
        value={answer}
        onChange={(e) => props.handleTextArea(e, props.answer.id, setAnswer)}
        disabled
      />
    </form>
    <form onSubmit={(e) => props.rateAnswerFormHandler(e, props.answer.id, renderRateAnswerFormInputs()[0].props.value)} className={classes["rate-answer__form"]}>
      {renderRateAnswerFormInputs()}
      <div>Maksymalna liczba punktów: {props.answer.maxPoints}</div>
      <div className={classes["error"]}>{props.children}</div>
      <button type="submit" disabled={!isRateAnswerFormValid()}>Oceń</button>
    </form>
    </>
  );
};

export default CheckTextArea;
