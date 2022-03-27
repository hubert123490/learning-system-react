import { createFormFieldConfig } from "../../utils/formConig";
import { requiredRule, requiredRuleEn } from "../../utils/inputValidationRules";

export const rateAnswerForm = {
  points: {
    ...createFormFieldConfig("Oceń odpowiedź", "points", "number"),
    validationRules: [requiredRule("Ocena za odpowiedź")],
  },
};

export const rateAnswerFormEn = {
  points: {
    ...createFormFieldConfig("Rate answer", "points", "number"),
    validationRules: [requiredRuleEn("Points for answer")],
  },
};
