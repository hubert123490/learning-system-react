import { createFormFieldConfig } from "../../utils/formConig";
import { requiredRule, minLengthRule } from "../../utils/inputValidationRules";

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