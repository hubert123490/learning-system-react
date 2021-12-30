import classes from "./RadioItem.module.css";
import { useState } from "react";
import useForm from "../../../../hooks/use-form";
import { rateAnswerForm } from "../../../../lib/forms/answer-form";

const RadioItem = (props) => {
  const [showForm, setShowForm] = useState(false);
  const {
    renderFormInputs: renderRateAnswerFormInputs,
    isFormValid: isRateAnswerFormValid,
  } = useForm(rateAnswerForm);

  const showFormHandler = () => {
    setShowForm((prevState) => !prevState);
  };

  return (
    <>
      <form className={classes["radio-question__form"]}>
        <div>Odpowiedź</div>
        <div>
          {props.item.queries.map((query) => {
            return (
              <div
                className={classes["radio-question__form-elements"]}
                key={query.id}
              >
                {props.item.givenAnswer === query.text ? (
                  <input
                    type="radio"
                    id={query.id}
                    name="radio"
                    value={query.text}
                    checked
                    readOnly
                  />
                ) : (
                  <input
                    type="radio"
                    id={query.id}
                    name="radio"
                    value={query.text}
                    readOnly
                  />
                )}
                <label htmlFor={query.id}>{query.text}</label>
              </div>
            );
          })}
        </div>
      </form>
      {props.item.checked && (
        <div>
          uzyskane punkty {props.item.points}/{props.item.maxPoints}
        </div>
      )}
      {!props.item.checked && <div>nie oceniono</div>}
      <button onClick={showFormHandler}>
        {!showForm ? "Oceń" : "Schowaj"}
      </button>

      {showForm && (
        <form
          onSubmit={(e) =>
            props.rateAnswerFormHandler(
              e,
              props.item.id,
              renderRateAnswerFormInputs()[0].props.value
            )
          }
          className={classes["rate-answer__form"]}
        >
          {renderRateAnswerFormInputs()}
          <div>Maksymalna liczba punktów: {props.item.maxPoints}</div>
          <div className={classes["error"]}>{props.children}</div>
          <button type="submit" disabled={!isRateAnswerFormValid()}>
            Oceń
          </button>
        </form>
      )}
    </>
  );
};

export default RadioItem;
