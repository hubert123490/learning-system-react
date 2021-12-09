import { createFormFieldConfig } from "../../utils/formConig";
import { requiredRule } from "../../utils/inputValidationRules";

export const createWebexMeetingForm = {
    title: {
      ...createFormFieldConfig("Tytuł spotkania", "title", "text"),
      validationRules: [
        requiredRule("Tytuł spotkania"),
      ],
    },
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
  