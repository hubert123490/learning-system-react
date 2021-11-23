import { createFormFieldConfig } from "../../utils/formConig";
import { requiredRule } from "../../utils/inputValidationRules";

export const createAddContentForm = {
    title: {
      ...createFormFieldConfig("Tytuł kontentu", "title", "text"),
      validationRules: [
        requiredRule("Tytuł kontentu"),
      ],
    },
  };