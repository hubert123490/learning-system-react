import { createFormFieldConfig } from "../../utils/formConig";
import { requiredRule, minLengthRule } from "../../utils/inputValidationRules";

export const createLessonForm = {
    lessonName: {
      ...createFormFieldConfig("Nazwa lekcji", "lessonName", "text"),
      validationRules: [
        requiredRule("Nazwa lekcji"),
        minLengthRule("Nazwa lekcji", 3),
      ],
    },
    lessonDescription: {
      ...createFormFieldConfig("Opis lekcji", "lessonDescription", "text"),
      validationRules: [
        requiredRule("Opis lekcji"),
        minLengthRule("Opis lekcji", 3)
      ]
    }
  };