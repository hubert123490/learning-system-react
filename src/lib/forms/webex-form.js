import { createFormFieldConfig } from "../../utils/formConig";
import { requiredRule, requiredRuleEn } from "../../utils/inputValidationRules";

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

  export const createWebexMeetingFormEn = {
    start: {
      ...createFormFieldConfig(
        "Start time",
        "start",
        "datetime-local"
      ),
      validationRules: [requiredRuleEn("Start time")],
    },
    end: {
      ...createFormFieldConfig(
        "End time",
        "end",
        "datetime-local"
      ),
      validationRules: [requiredRuleEn("End time")],
    },
  };
  