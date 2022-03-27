import { useEffect, useState } from "react";
import {
  addQuestionRadioForm,
  addQuestionRadioFormEn,
} from "../../../lib/forms/question-form";
import useForm from "../../../hooks/use-form";
import classes from "./QuestionRadio.module.css";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

const QuestionRadio = (props) => {
  const { t } = useTranslation();
  const params = useParams();
  const [showForm, setShowForm] = useState(false);
  const { renderFormInputs } = useForm(addQuestionRadioForm);
  const { renderFormInputs: renderFormInputsEn } = useForm(
    addQuestionRadioFormEn
  );
  const [correctAnswer, setCorrectAnswer] = useState(null);

  const handleCorrectAnswerChange = (event) => {
    setCorrectAnswer(event.target.value);
  };

  useEffect(() => {
    if (props.question.queries.length === 0)
      props.unfilledQuestionHandler(true);
  }, [props]);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const radios = [];
    if (i18next.language === "pl") {
      renderFormInputs().forEach((item) => {
        if (item.props.value !== "") radios.push(item.props.value);
      });
    } else if (i18next.language === "en") {
      renderFormInputsEn().forEach((item) => {
        if (item.props.value !== "") radios.push(item.props.value);
      });
    }
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
    if (i18next.language === "pl") {
      return (
        (correctAnswer === renderFormInputs()[0].props.value &&
          renderFormInputs()[0].props.value !== "") ||
        (correctAnswer === renderFormInputs()[1].props.value &&
          renderFormInputs()[0].props.value !== "") ||
        (correctAnswer === renderFormInputs()[2].props.value &&
          renderFormInputs()[0].props.value !== "") ||
        (correctAnswer === renderFormInputs()[3].props.value &&
          renderFormInputs()[0].props.value !== "")
      );
    } else if (i18next.language === "en") {
      return (
        (correctAnswer === renderFormInputsEn()[0].props.value &&
          renderFormInputsEn()[0].props.value !== "") ||
        (correctAnswer === renderFormInputsEn()[1].props.value &&
          renderFormInputsEn()[0].props.value !== "") ||
        (correctAnswer === renderFormInputsEn()[2].props.value &&
          renderFormInputsEn()[0].props.value !== "") ||
        (correctAnswer === renderFormInputsEn()[3].props.value &&
          renderFormInputsEn()[0].props.value !== "")
      );
    } else {
      return false;
    }
  };

  const showFormHandler = () => {
    setShowForm(!showForm);
  };

  const radioForm = (item) => {
    return (
      <form className={classes["radio-question__form"]}>
        <div>
          {item.queries.map((item) => {
            return (
              <div
                className={classes["radio-question__form-elements"]}
                key={item.id}
              >
                <input
                  type="radio"
                  id={item.id}
                  name="radio"
                  value={item.text}
                />
                <label htmlFor={item.id}>{item.text}</label>
              </div>
            );
            /* <Form.Check
                  type="radio"
                  id={item.id}
                  label={item.text}
                  value={item.text}
                  name="radio"
                  key={item.id}
                /> */
          })}
        </div>
        <div>
          {t("Teacher__Exams_Radio-CorrectAnswer")}{" "}
          <span>{item.correctAnswer ? item.correctAnswer : ""}</span>
        </div>
      </form>
    );
  };

  const renderPolishSelectValues = () => (
    <>
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
    </>
  );

  const renderEnglishSelectValues = () => (
    <>
      <option value={renderFormInputsEn()[0].props.value}>
        {renderFormInputsEn()[0].props.value === ""
          ? "Fill first option"
          : renderFormInputsEn()[0].props.value}
      </option>
      <option value={renderFormInputsEn()[1].props.value}>
        {renderFormInputsEn()[1].props.value === ""
          ? "Fill second option"
          : renderFormInputsEn()[1].props.value}
      </option>
      <option value={renderFormInputsEn()[2].props.value}>
        {renderFormInputsEn()[2].props.value === ""
          ? "Fill third option"
          : renderFormInputsEn()[2].props.value}
      </option>
      <option value={renderFormInputsEn()[3].props.value}>
        {renderFormInputsEn()[3].props.value === ""
          ? "Fill fourth option"
          : renderFormInputsEn()[3].props.value}
      </option>
    </>
  );

  return (
    <div>
      {props.question.type === "radio" &&
        props.question.queries.length !== 0 &&
        radioForm(props.question)}
      {props.question.queries.length === 0 && (
        <div className={classes["error"]}>
          {t("Teacher__Exams_Radio-FillForm")}
        </div>
      )}
      {
        <button onClick={showFormHandler}>
          {!showForm ? t("Teacher__Exams_Radio-ShowForm") : t("Teacher__Exams_Radio-CloseForm")}
        </button>
      }
      {showForm && (
        <form
          className={classes["radio-question__form"]}
          onSubmit={handleFormSubmit}
        >
          {i18next.language === "pl" && renderFormInputs()}
          {i18next.language === "en" && renderFormInputsEn()}
          <label htmlFor="type-select">
            {t("Teacher__Exams_Radio-CorrectAnswer")}
          </label>
          <select
            value={correctAnswer}
            onChange={handleCorrectAnswerChange}
            name="correctAnswer"
            id="answer-select"
            required
          >
            <option value="null">{t("Teacher__Exams_Radio-Answer")}</option>
            {i18next.language === "pl" && renderPolishSelectValues()}
            {i18next.language === "en" && renderEnglishSelectValues()}
          </select>
          <br />
          <button type="submit" disabled={!isSelectValid()}>
            {t("Teacher__Exams_Radio-SaveButton")}
          </button>
        </form>
      )}
    </div>
  );
};

export default QuestionRadio;
