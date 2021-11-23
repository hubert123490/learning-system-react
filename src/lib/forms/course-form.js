import { createFormFieldConfig } from "../../utils/formConig";

import { requiredRule, minLengthRule } from "../../utils/inputValidationRules";

export const createCourseForm = {
    courseName: {
      ...createFormFieldConfig("Nazwa kursu", "courseName", "text"),
      validationRules: [
        requiredRule("Nazwa kursu"),
        minLengthRule("Nazwa kursu", 3),
      ],
    },
    courseCategory: {
      ...createFormFieldConfig("Kategoria kursu", "courseCategory", "text"),
      validationRules: [
        requiredRule("Kategoria kursu"),
        minLengthRule("Kategoria kursu", 3),
      ],
    },
    password: {
      ...createFormFieldConfig("Hasło do kursu", "password", "password"),
      validationRules: [],
    }
  };