import { createFormFieldConfig } from "../../utils/formConig";
import { requiredRule } from "../../utils/inputValidationRules";

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