import classes from "./Section.module.css";
import FileItem from "./FileItem";
import { useState } from "react";
import useForm from "../../../hooks/use-form";
import { rateAnswerForm } from "../../../lib/forms/answer-form";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

const Section = (props) => {
  const { t } = useTranslation();
  const [showForm, setShowForm] = useState(false);
  const {
    renderFormInputs: renderRateAnswerFormInputs,
    isFormValid: isRateAnswerFormValid,
  } = useForm(rateAnswerForm);
  const {
    renderFormInputs: renderRateAnswerFormInputsEn,
    isFormValid: isRateAnswerFormValidEn,
  } = useForm(rateAnswerForm);

  const showFormHandler = () => {
    setShowForm((prevState) => !prevState);
  };

  console.log(props.item);

  return (
    <div className={classes["assignment"]}>
      <div className={classes["card"]}>
        <div>
          <h3>{props.item.title}</h3>
        </div>
        <div className={classes["text"]} style={{ whiteSpace: "pre-wrap" }}>
          {props.item.description}
        </div>
        <hr />
        <h3>{t("Teacher__AssignmentsPreview_SupportMaterials")}</h3>
        {props.item.files && props.item.files.length === 0 && (
          <div>{t("Teacher__AssignmentsPreview_NoSupportMaterials")}</div>
        )}
        {props.item.files.map((file) => (
          <div key={file.id} className={classes["lesson-content__files"]}>
            <FileItem file={file} />
          </div>
        ))}
        <hr />
        <h3>{t("Teacher__AssignmentsPreview_SharedFiles")}</h3>
        {props.item.submissionFiles &&
          props.item.submissionFiles.length === 0 && (
            <div style={{ color: "red" }}>
              {t("Teacher__AssignmentsPreview_NoSharedFiles")}
            </div>
          )}
        {props.item.submissionFiles.map((file) => (
          <div key={file.id} className={classes["lesson-content__files"]}>
            <FileItem
              file={file}
              deleteTaskAnswerFile={props.deleteTaskAnswerFile}
              taskId={props.item.id}
            />
          </div>
        ))}
        <hr />
        <div className={classes["info"]}>
          <h3>{t("Teacher__AssignmentsPreview_Informations")}</h3>
          <div>
            {t("Teacher__AssignmentsPreview_Rated")}{" "}
            {props.item.checkedOnce
              ? t("Teacher__AssignmentsPreview_Yes")
              : t("Teacher__AssignmentsPreview_No")}
          </div>
          <div>
            {t("Teacher__AssignmentsPreview_PointsObtained")}{" "}
            {props.item.points} / {props.item.maxPoints}
          </div>
          <button onClick={showFormHandler}>
            {showForm ? t("Teacher__AssignmentsPreview_Hide") : t("Teacher__AssignmentsPreview_Rate")}
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
                {t("Teacher__AssignmentsPreview_MaxPoints")}{" "}
                {props.item.maxPoints}
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
        </div>
      </div>
    </div>
  );
};

export default Section;
