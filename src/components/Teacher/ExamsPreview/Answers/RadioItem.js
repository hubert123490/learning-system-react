import classes from "./RadioItem.module.css";
import { useState } from "react";
import useForm from "../../../../hooks/use-form";
import {
  rateAnswerForm,
  rateAnswerFormEn,
} from "../../../../lib/forms/answer-form";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

const RadioItem = (props) => {
  const { t } = useTranslation();
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
      <form className={classes["radio-question__form"]}>
        <div>{t("Teacher__ExamsPreview_Answer")}</div>
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
          {t("Teacher__ExamsPreview_PointsObtained")} {props.item.points}/
          {props.item.maxPoints}
        </div>
      )}
      {!props.item.checked && <div>nie oceniono</div>}
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
                props.item.id,
                renderRateAnswerFormInputs()[0].props.value
              );
            } else if (i18next.language === "en") {
              props.rateAnswerFormHandler(
                e,
                props.item.id,
                renderRateAnswerFormInputsEn()[0].props.value
              );
            }
          }}
          className={classes["rate-answer__form"]}
        >
          {i18next.language === "pl" && renderRateAnswerFormInputs()}
          {i18next.language === "en" && renderRateAnswerFormInputsEn()}
          <div>
            {t("Teacher__ExamsPreview_MaxPoints")} {props.item.maxPoints}
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

export default RadioItem;
