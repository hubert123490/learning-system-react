import { createFormFieldConfig } from "../../utils/formConig";
import { requiredRule, minLengthRule, requiredRuleEn, minLengthRuleEn } from "../../utils/inputValidationRules";

export const createExamForm = {
  examName: {
    ...createFormFieldConfig("Nazwa egzaminu", "examName", "text"),
    validationRules: [
      requiredRule("Nazwa egzaminu"),
      minLengthRule("Nazwa egzaminu", 3),
    ],
  },
  examDescription: {
    ...createFormFieldConfig("Opis egzaminu", "examDescription", "text"),
    validationRules: [],
  },
  startDate: {
    ...createFormFieldConfig(
      "Czas rozpoczęcia egzaminu",
      "startDate",
      "datetime-local"
    ),
    validationRules: [requiredRule("Czas rozpoczęcia")],
  },
  endDate: {
    ...createFormFieldConfig(
      "Czas zakończenia egzaminu",
      "endDate",
      "datetime-local"
    ),
    validationRules: [requiredRule("Czas zakończenia")],
  },
};

export const createExamFormEn = {
  examName: {
    ...createFormFieldConfig("Exam name", "examName", "text"),
    validationRules: [
      requiredRuleEn("Exam name"),
      minLengthRuleEn("Exam name", 3),
    ],
  },
  examDescription: {
    ...createFormFieldConfig("Exam description", "examDescription", "text"),
    validationRules: [],
  },
  startDate: {
    ...createFormFieldConfig(
      "Exam starting time",
      "startDate",
      "datetime-local"
    ),
    validationRules: [requiredRule("Exam starting time")],
  },
  endDate: {
    ...createFormFieldConfig(
      "Exam ending time",
      "endDate",
      "datetime-local"
    ),
    validationRules: [requiredRule("Exam ending time")],
  },
};

export const changeExamDatesForm = {
  startDate: {
    ...createFormFieldConfig(
      "Czas rozpoczęcia egzaminu",
      "startDate",
      "datetime-local"
    ),
    validationRules: [requiredRule("Czas rozpoczęcia")],
  },
  endDate: {
    ...createFormFieldConfig(
      "Czas zakończenia egzaminu",
      "endDate",
      "datetime-local"
    ),
    validationRules: [requiredRule("Czas zakończenia")],
  },
}
