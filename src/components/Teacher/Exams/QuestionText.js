import { useParams } from "react-router";
import { useEffect, useState } from "react";
import useForm from "../../../hooks/use-form";
import {
  addQuestionTextForm,
  addQuestionTextFormEn,
} from "../../../lib/forms/question-form";
import classes from "./QuestionText.module.css";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

const QuestionText = (props) => {
  const { t } = useTranslation();
  const params = useParams();
  const [showForm, setShowForm] = useState(false);
  const [answer, setAnswer] = useState("");
  const { renderFormInputs, isFormValid } = useForm(addQuestionTextForm);
  const { renderFormInputs: renderFormInputsEn, isFormValid: isFormValidEn } =
    useForm(addQuestionTextFormEn);
  const showFormHandler = () => {
    setShowForm(!showForm);
  };

  useEffect(() => {
    if (props.question.correctAnswer == null)
      props.unfilledQuestionHandler(true);
  }, [props]);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (i18next.language === "pl") {
      props.addQuestionTextRequest({
        courseId: params.courseId,
        examId: params.examId,
        questionId: props.question.id,
        correctAnswer: renderFormInputs()[0].props.value,
      });
    } else if (i18next.language === "en") {
      props.addQuestionTextRequest({
        courseId: params.courseId,
        examId: params.examId,
        questionId: props.question.id,
        correctAnswer: renderFormInputsEn()[0].props.value,
      });
    }
    setShowForm(false);
  };

  const onAnswerChange = (event) => {
    setAnswer(event.target.value);
  };

  const textForm = () => {
    return (
      <form className={classes["text-preview"]}>
        <label htmlFor="answer">{t("Teacher__Exams_Text-GiveAnswer")}</label>
        <br />
        <input
          type="text"
          id="answer"
          name="answer"
          value={answer}
          onChange={onAnswerChange}
        />
        <div>
          {t("Teacher__Exams_Text-CorrectAnswer")}{" "}
          <span>
            {props.question.correctAnswer ? props.question.correctAnswer : ""}
          </span>
        </div>
      </form>
    );
  };

  return (
    <>
      {props.question.type === "text" &&
        props.question.correctAnswer != null &&
        textForm(props.question)}
      {props.question.correctAnswer == null && (
        <div className={classes.error}>{t("Teacher__Exams_Text-FillForm")}</div>
      )}
      {
        <button onClick={showFormHandler}>
          {!showForm
            ? t("Teacher__Exams_Text-ShowForm")
            : t("Teacher__Exams_Text-CloseForm")}
        </button>
      }
      {showForm && (
        <form
          className={classes["create-question-text__form"]}
          onSubmit={handleFormSubmit}
        >
          {i18next.language === "pl" && renderFormInputs()}
          {i18next.language === "en" && renderFormInputsEn()}
          <br />
          {i18next.language === "pl" && (
            <button type="submit" disabled={!isFormValid()}>
              Zapisz
            </button>
          )}
          {i18next.language === "en" && (
            <button type="submit" disabled={!isFormValidEn()}>
              Save
            </button>
          )}
        </form>
      )}
    </>
  );
};

export default QuestionText;
