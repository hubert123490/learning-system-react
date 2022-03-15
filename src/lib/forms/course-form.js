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

export const enrollInCourseForm = {
  coursePassword: {
    ...createFormFieldConfig("Hasło", "coursePassword", "text"),
    validationRules: []
  }
}

export const getCoursesForm = {
  courseName : {
    ...createFormFieldConfig("Nazwa kursu", "courseName", "text"),
    validationRules: []
  },
  courseCategory : {
    ...createFormFieldConfig("Kategoria kursu", "courseCategory", "text"),
    validationRules: []
  },
  teacherLastName : {
    ...createFormFieldConfig("Nazwisko prowadzącego", "teacherLastName", "text"),
    validationRules: []
  }
}

export const getCoursesFormEn = {
  courseName : {
    ...createFormFieldConfig("Course name", "courseName", "text"),
    validationRules: []
  },
  courseCategory : {
    ...createFormFieldConfig("Course category", "courseCategory", "text"),
    validationRules: []
  },
  teacherLastName : {
    ...createFormFieldConfig("Course teacher surname", "teacherLastName", "text"),
    validationRules: []
  }
}