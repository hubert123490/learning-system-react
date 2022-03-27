import { useState } from "react";
import {
  rateAnswerForm,
  rateAnswerFormEn,
} from "../../../../lib/forms/answer-form";
import useForm from "../../../../hooks/use-form";
import classes from "./CheckTextArea.module.css";
import i18next from "i18next";
import { useTranslation } from "react-i18next";

const CheckTextArea = (props) => {
  const { t } = useTranslation();
  const [answer, setAnswer] = useState(props.answer.givenAnswer);
  const {
    renderFormInputs: renderRateAnswerFormInputs,
    isFormValid: isRateAnswerFormValid,
  } = useForm(rateAnswerForm);
  const {
    renderFormInputs: renderRateAnswerFormInputsEn,
    isFormValid: isRateAnswerFormValidEn,
  } = useForm(rateAnswerFormEn);

  return (
    <>
      <form className={classes["textarea-display"]}>
        <textarea
          value={answer}
          onChange={(e) => props.handleTextArea(e, props.answer.id, setAnswer)}
          disabled
        />
      </form>
      <form
        onSubmit={(e) => {
          if (i18next.language === "pl") {
            props.rateAnswerFormHandler(
              e,
              props.answer.id,
              renderRateAnswerFormInputs()[0].props.value
            );
          } else if (i18next.language === "en") {
            props.rateAnswerFormHandler(
              e,
              props.answer.id,
              renderRateAnswerFormInputsEn()[0].props.value
            );
          }
        }}
        className={classes["rate-answer__form"]}
      >
        {i18next.language === "pl" && renderRateAnswerFormInputs()}
        {i18next.language === "en" && renderRateAnswerFormInputsEn()}
        <div>{t("Teacher__Submissions_MaxPoints")} {props.answer.maxPoints}</div>
        <div className={classes["error"]}>{props.children}</div>
        {i18next.language === "pl" && (
          <button type="submit" disabled={!isRateAnswerFormValid()}>
            Oceń
          </button>
        )}
        {i18next.language === "en" && (
          <button type="submit" disabled={!isRateAnswerFormValidEn()}>
            Rate
          </button>
        )}
      </form>
    </>
  );
};

export default CheckTextArea;
