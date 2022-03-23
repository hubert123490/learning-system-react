import { createFormFieldConfig } from "../../utils/formConig";
import { requiredRule, requiredRuleEn } from "../../utils/inputValidationRules";

export const createAddContentForm = {
  title: {
    ...createFormFieldConfig("Tytuł sekcji", "title", "text"),
    validationRules: [requiredRule("Tytuł sekcji")],
  },
};

export const createAddContentFormEn = {
  title: {
    ...createFormFieldConfig("Section title", "title", "text"),
    validationRules: [requiredRuleEn("Section title")],
  },
};
