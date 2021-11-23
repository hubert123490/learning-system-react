import { createFormFieldConfig } from "../../utils/formConig";
import {
  requiredRule,
  minLengthRule,
  maxLengthRule,
  emailRule,
  passwordMatchRule,
} from "../../utils/inputValidationRules";

export const signupForm = {
  firstName: {
    ...createFormFieldConfig("Imię", "firstName", "text"),
    validationRules: [
      requiredRule("imię"),
      minLengthRule("imię", 3),
      maxLengthRule("imię", 50),
    ],
  },
  lastName: {
    ...createFormFieldConfig("Nazwisko", "lastName", "text"),
    validationRules: [
      requiredRule("Nazwisko"),
      minLengthRule("Nazwisko", 3),
      maxLengthRule("Nazwisko", 50),
    ],
  },
  email: {
    ...createFormFieldConfig("Email", "email", "email"),
    validationRules: [
      emailRule("email"),
      requiredRule("email"),
      minLengthRule("email", 10),
      maxLengthRule("email", 50),
    ],
  },
  password: {
    ...createFormFieldConfig("Hasło", "password", "password"),
    validationRules: [
      requiredRule("Hasło"),
      minLengthRule("Hasło", 6),
      maxLengthRule("Hasło", 120),
    ],
  },
  confirmPassword: {
    ...createFormFieldConfig("Potwierdź hasło", "confirmPassword", "password"),
    validationRules: [passwordMatchRule()],
  },
};

export const signinForm = {
  email: {
    ...createFormFieldConfig("Email", "email", "email"),
    validationRules: [
      emailRule("email"),
      requiredRule("email"),
      minLengthRule("email", 10),
      maxLengthRule("email", 50),
    ],
  },
  password: {
    ...createFormFieldConfig("Hasło", "password", "password"),
    validationRules: [
      requiredRule("Hasło"),
      minLengthRule("Hasło", 6),
      maxLengthRule("Hasło", 120),
    ],
  },
};
