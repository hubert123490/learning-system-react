import { useState } from "react";
import classes from "./TextAreaItem.module.css";
import useForm from "../../../../hooks/use-form";
import {
  rateAnswerForm,
  rateAnswerFormEn,
} from "../../../../lib/forms/answer-form";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

const TextAreaItem = (props) => {
  const { t } = useTranslation();
  const [answer] = useState(props.answer.givenAnswer);
  const [showForm, setShowForm] = useState(false);
  const {
    renderFormInputs: renderRateAnswerFormInputs,
    isFormValid: isRateAnswerFormValid,
  } = useForm(rateAnswerForm);
  const {
    renderFormInputs: renderRateAnswerFormInputsEn,
    isFormValid: isRateAnswerFormValidEn,
  } = useForm(rateAnswerFormEn);

  const showFormHandler = () => {
    setShowForm((prevState) => !prevState);
  };

  return (
    <>
      <form className={classes["textarea-display"]}>
        <div>{t("Teacher__ExamsPreview_Answer")}</div>
        <textarea value={answer} disabled />
        {props.answer.checked && (
          <div>
            {t("Teacher__ExamsPreview_PointsObtained")} {props.answer.points}/
            {props.answer.maxPoints}
          </div>
        )}
        {!props.answer.checked && <div>nie oceniono</div>}
      </form>
      <button onClick={showFormHandler}>
        {!showForm
          ? t("Teacher__ExamsPreview_Rate")
          : t("Teacher__ExamsPreview_HideForm")}
      </button>

      {showForm && (
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
          <div>
            {t("Teacher__ExamsPreview_MaxPoints")} {props.answer.maxPoints}
          </div>
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
      )}
    </>
  );
};

export default TextAreaItem;
