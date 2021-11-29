import { createFormFieldConfig } from "../../utils/formConig";
import { requiredRule, minLengthRule } from "../../utils/inputValidationRules";

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
        validationRules: []
    }
  };