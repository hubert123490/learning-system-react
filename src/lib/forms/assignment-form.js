import { createFormFieldConfig } from "../../utils/formConig";
import {
  requiredRule,
  minLengthRule,
  requiredRuleEn,
  minLengthRuleEn,
} from "../../utils/inputValidationRules";

export const createAssignmentForm = {
  assignmentName: {
    ...createFormFieldConfig("Nazwa dla pracy", "assignmentName", "text"),
    validationRules: [
      requiredRule("Nazwa pracy"),
      minLengthRule("Nazwa pracy", 3),
    ],
  },
  assignmentDescription: {
    ...createFormFieldConfig("Opis pracy", "assignmentDescription", "text"),
    validationRules: [],
  },
  startDate: {
    ...createFormFieldConfig(
      "Czas od którego można składać pracę",
      "startDate",
      "datetime-local"
    ),
    validationRules: [requiredRule("Czas rozpoczęcia")],
  },
  endDate: {
    ...createFormFieldConfig(
      "Czas do którego można składać pracę",
      "endDate",
      "datetime-local"
    ),
    validationRules: [requiredRule("Czas zakończenia")],
  },
};

export const createAssignmentFormEn = {
  assignmentName: {
    ...createFormFieldConfig("Assignment name", "assignmentName", "text"),
    validationRules: [
      requiredRuleEn("Assignment name"),
      minLengthRuleEn("Assignment name", 3),
    ],
  },
  assignmentDescription: {
    ...createFormFieldConfig(
      "Assignment description",
      "assignmentDescription",
      "text"
    ),
    validationRules: [],
  },
  startDate: {
    ...createFormFieldConfig(
      "Assignment starting time",
      "startDate",
      "datetime-local"
    ),
    validationRules: [requiredRuleEn("Assignment starting time")],
  },
  endDate: {
    ...createFormFieldConfig(
      "Assignment ending time",
      "endDate",
      "datetime-local"
    ),
    validationRules: [requiredRuleEn("Assignment ending time")],
  },
};

export const changeAssignmentDatesForm = {
  startDate: {
    ...createFormFieldConfig(
      "Czas rozpoczęcia pracy",
      "startDate",
      "datetime-local"
    ),
    validationRules: [requiredRule("Czas rozpoczęcia")],
  },
  endDate: {
    ...createFormFieldConfig(
      "Czas zakończenia pracy",
      "endDate",
      "datetime-local"
    ),
    validationRules: [requiredRule("Czas zakończenia")],
  },
};

export const changeAssignmentDatesFormEn = {
  startDate: {
    ...createFormFieldConfig(
      "Assignment starting time",
      "startDate",
      "datetime-local"
    ),
    validationRules: [requiredRuleEn("Assignment starting time")],
  },
  endDate: {
    ...createFormFieldConfig(
      "Assignment ending time",
      "endDate",
      "datetime-local"
    ),
    validationRules: [requiredRuleEn("Assignment ending time")],
  },
};
