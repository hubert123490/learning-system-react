import { useParams } from "react-router";
import { addQuestionForm, addQuestionFormEn } from "../../../lib/forms/question-form";
import useForm from "../../../hooks/use-form";
import { useState, useEffect } from "react";
import useHttp from "../../../hooks/use-http";
import {
  addQuestion,
  deleteQuestion,
  getQuestions,
  addQuestionRadio,
  addQuestionText,
  addQuestionTextArea,
} from "../../../lib/api/question-api";
import classes from "./ExamDetails.module.css";
import ExamDetailsItem from "./ExamDetailsItem";
import { changeExamDatesForm, changeExamDatesFormEn } from "../../../lib/forms/exam-form";
import { changeExamDates } from "../../../lib/api/exam-api";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

const ExamDetails = () => {
  const { t } = useTranslation();
  const params = useParams();
  const [questionType, setQuestionType] = useState("radio");
  const [showAddQuestionForm, setShowAddQuestionForm] = useState(false);
  const [showChangeDatesForm, setShowChangeDatesForm] = useState(false);
  const {
    renderFormInputs: renderAddQuestionInputs,
    isFormValid: isAddQuestionFormValid,
  } = useForm(addQuestionForm);
  const {
    renderFormInputs: renderAddQuestionInputsEn,
    isFormValid: isAddQuestionFormValidEn,
  } = useForm(addQuestionFormEn);
  const {
    renderFormInputs: renderChangeExamDatesInputs,
    isFormValid: isChangeExamDatesFormValid,
  } = useForm(changeExamDatesForm);
  const {
    renderFormInputs: renderChangeExamDatesInputsEn,
    isFormValid: isChangeExamDatesFormValidEn,
  } = useForm(changeExamDatesFormEn);
  const { sendRequest: getQuestionsRequest, data: getQuestionsData } = useHttp(
    getQuestions,
    true
  );
  const { sendRequest: changeExamDatesRequest, data: changeExamDatesData, status: changeExamDatesStatus, error: changeExamDatesError } =
    useHttp(changeExamDates);
  const { sendRequest: addQuestionRequest, status: addQuestionStatus } =
    useHttp(addQuestion);
  const { sendRequest: deleteQuestionRequest, status: deleteQuestionStatus } =
    useHttp(deleteQuestion);
  const {
    sendRequest: addQuestionRadioRequest,
    status: addQuestionRadioStatus,
  } = useHttp(addQuestionRadio);
  const { sendRequest: addQuestionTextRequest, status: addQuestionTextStatus } =
    useHttp(addQuestionText);
  const {
    sendRequest: addQuestionTextAreaRequest,
    status: addQuestionTextAreaStatus,
  } = useHttp(addQuestionTextArea);

  useEffect(() => {
    getQuestionsRequest({
      courseId: params.courseId,
      examId: params.examId,
    });
  }, [
    getQuestionsRequest,
    params,
    addQuestionStatus,
    deleteQuestionStatus,
    addQuestionRadioStatus,
    addQuestionTextStatus,
    addQuestionTextAreaStatus,
    changeExamDatesStatus,
  ]);

  const addQuestionHandler = (event) => {
    event.preventDefault();
    if(i18next.language === "pl") {
    addQuestionRequest({
      courseId: params.courseId,
      examId: params.examId,
      request: {
        description: renderAddQuestionInputs()[0].props.value,
        type: questionType,
        maxPoints: renderAddQuestionInputs()[1].props.value,
      },
    });
  } else if(i18next.language === "en") {
    addQuestionRequest({
      courseId: params.courseId,
      examId: params.examId,
      request: {
        description: renderAddQuestionInputsEn()[0].props.value,
        type: questionType,
        maxPoints: renderAddQuestionInputsEn()[1].props.value,
      },
    });
  }
    setShowAddQuestionForm(!showAddQuestionForm);
  };

  const changeExamDatesHandler = (event) => {
    event.preventDefault();
    if(i18next.language === "pl") {
    changeExamDatesRequest({
      courseId: params.courseId,
      examId: params.examId,
      request: {
        startDate: renderChangeExamDatesInputs()[0].props.value,
        endDate: renderChangeExamDatesInputs()[1].props.value,
      },
    });
  } else if(i18next.language === "en") {
    changeExamDatesRequest({
      courseId: params.courseId,
      examId: params.examId,
      request: {
        startDate: renderChangeExamDatesInputsEn()[0].props.value,
        endDate: renderChangeExamDatesInputsEn()[1].props.value,
      },
    });
  }
  };

  const showAddQuestionFormHandler = () => {
    setShowAddQuestionForm(!showAddQuestionForm);
  };

  const showChangeExamDatesFormHandler = () => {
    setShowChangeDatesForm((prevState) => !prevState);
  };

  const handleQuestionTypeChange = (event) => {
    setQuestionType(event.target.value);
  };

  return (
    <div className={classes["exam-details"]}>
      <div className={classes["button-container"]}>
        <button onClick={showAddQuestionFormHandler}>
          {showAddQuestionForm ? t("Teacher__Exams_HideForm") : t("Teacher__Exams_AddQuestion")}{" "}
        </button>
      </div>
      {showAddQuestionForm && (
        <form
          className={classes["create-question__form"]}
          onSubmit={addQuestionHandler}
        >
          {i18next.language === "pl" && renderAddQuestionInputs()}
          {i18next.language === "en" && renderAddQuestionInputsEn()}
          <label htmlFor="type-select">{t("Teacher__Exams_ChooseQuestionType")}</label>
          <select
            value={questionType}
            onChange={handleQuestionTypeChange}
            name="types"
            id="type-select"
            required
          >
            <option value="radio">{t("Teacher__Exams_ClosedQuestion")}</option>
            <option value="text">{t("Teacher__Exams_OpenQuestion")}</option>
            <option value="textarea">
            {t("Teacher__Exams_LongOpenQuestion")}
            </option>
          </select>
          <br />
          {i18next.language === "pl" && <button type="submit" disabled={!isAddQuestionFormValid()}>
            Dodaj pytanie
          </button>}
          {i18next.language === "en" && <button type="submit" disabled={!isAddQuestionFormValidEn()}>
            Add question
          </button>}
        </form>
      )}
      <div className={classes["button-container"]}>
        <button onClick={showChangeExamDatesFormHandler}>
          {showChangeDatesForm ? t("Teacher__Exams_HideForm") : t("Teacher__Exams_ChangeDate")}
        </button>
      </div>
      {showChangeDatesForm && (
        <form className={classes["create-question__form"]}
        onSubmit={changeExamDatesHandler} >
          {i18next.language === "pl" && renderChangeExamDatesInputs()}
          {i18next.language === "en" && renderChangeExamDatesInputsEn()}
          {i18next.language === "pl" && <button type="submit" disabled={!isChangeExamDatesFormValid()}>
            Zmień czas
          </button>}
          {i18next.language === "en" && <button type="submit" disabled={!isChangeExamDatesFormValidEn()}>
            Change date
          </button>}
          {changeExamDatesError && <div style={{color : "red"}}>{changeExamDatesError}</div>}
          {changeExamDatesData && <div style={{color: "green"}}>{t("Teacher__Exams_DateChanged")}</div>}
        </form>
      )}
      {(!getQuestionsData || getQuestionsData.length === 0) && <div>{t("Teacher__Exams_Empty")}</div>}
      {getQuestionsData &&
        getQuestionsData
          .sort((a, b) => b.id - a.id)
          .map((item) => (
            <ExamDetailsItem
              item={item}
              addQuestionRadioRequest={addQuestionRadioRequest}
              addQuestionTextRequest={addQuestionTextRequest}
              addQuestionTextAreaRequest={addQuestionTextAreaRequest}
              deleteQuestionRequest={deleteQuestionRequest}
              key={item.id}
            />
          ))}
    </div>
  );
};

export default ExamDetails;
