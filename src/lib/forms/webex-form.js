import { createFormFieldConfig } from "../../utils/formConig";
import { requiredRule } from "../../utils/inputValidationRules";

export const createWebexMeetingForm = {
    start: {
      ...createFormFieldConfig(
        "Czas rozpoczęcia spotkania",
        "start",
        "datetime-local"
      ),
      validationRules: [requiredRule("Czas rozpoczęcia spotkania")],
    },
    end: {
      ...createFormFieldConfig(
        "Czas zakończenia spotkania",
        "end",
        "datetime-local"
      ),
      validationRules: [requiredRule("Czas zakończenia spotkania")],
    },
  };
  