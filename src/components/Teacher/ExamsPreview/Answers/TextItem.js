import { useState } from "react";
import useForm from "../../../../hooks/use-form";
import { rateAnswerForm } from "../../../../lib/forms/answer-form";
import classes from "./TextItem.module.css"

const TextItem = (props) => {
    const [answer] = useState(props.answer.givenAnswer);
    const [showForm, setShowForm] = useState(false);
    const {
        renderFormInputs: renderRateAnswerFormInputs,
        isFormValid: isRateAnswerFormValid,
      } = useForm(rateAnswerForm);

    const showFormHandler = () => {
        setShowForm(prevState => !prevState)
    }

    return (
        <>
        <form className={classes["text-display"]}>
        <label htmlFor="answer">Odpowiedź </label>
        <br />
        <input
          type="text"
          id="answer"
          name="answer"
          value={answer}
          disabled
        />
         {props.answer.checked && <div>
            uzyskane punkty {props.answer.points}/{props.answer.maxPoints}
        </div>}
        {!props.answer.checked && <div>nie oceniono</div>}
      </form>
      <button onClick={showFormHandler}>{!showForm ? "Oceń" : "Schowaj"}</button>

      {showForm && <form onSubmit={(e) => props.rateAnswerFormHandler(e, props.answer.id, renderRateAnswerFormInputs()[0].props.value)} className={classes["rate-answer__form"]}>
      {renderRateAnswerFormInputs()}
      <div>Maksymalna liczba punktów: {props.answer.maxPoints}</div>
      <div className={classes["error"]}>{props.children}</div>
      <button type="submit" disabled={!isRateAnswerFormValid()}>Oceń</button>
    </form>}
    </>
    )
}

export default TextItem;