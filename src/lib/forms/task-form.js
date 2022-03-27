import { createFormFieldConfig } from "../../utils/formConig";
import { requiredRule, requiredRuleEn } from "../../utils/inputValidationRules";

export const createAddTaskForm = {
    title: {
      ...createFormFieldConfig("Tytuł zadania", "title", "text"),
      validationRules: [
        requiredRule("Tytuł zadania"),
      ],
    },
    points : {
      ...createFormFieldConfig("Liczba punktów za zadanie", "points", "number"),
      validationRules: []
    }
  };

  export const createAddTaskFormEn = {
    title: {
      ...createFormFieldConfig("Assignment title", "title", "text"),
      validationRules: [
        requiredRuleEn("Assignment title"),
      ],
    },
    points : {
      ...createFormFieldConfig("Max points for assignment", "points", "number"),
      validationRules: []
    }
  };