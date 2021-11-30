import { createFormFieldConfig } from "../../utils/formConig";
import {
  requiredRule,
} from "../../utils/inputValidationRules";

export const rateAnswerForm = {
    points: {
      ...createFormFieldConfig("Oceń odpowiedź", "points", "number"),
      validationRules: [
        requiredRule("Ocena za odpowiedź"),
      ],
    },
  };