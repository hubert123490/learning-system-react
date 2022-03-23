import { createFormFieldConfig } from "../../utils/formConig";
import { requiredRule, minLengthRule, requiredRuleEn, minLengthRuleEn } from "../../utils/inputValidationRules";

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

  export const createLessonFormEn = {
    lessonName: {
      ...createFormFieldConfig("Lesson name", "lessonName", "text"),
      validationRules: [
        requiredRuleEn("Lesson name"),
        minLengthRuleEn("Lesson name", 3),
      ],
    },
    lessonDescription: {
      ...createFormFieldConfig("Lesson description", "lessonDescription", "text"),
      validationRules: [
        requiredRuleEn("Lesson description"),
        minLengthRuleEn("Lesson description", 3)
      ]
    }
  };