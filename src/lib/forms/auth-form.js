import { createFormFieldConfig } from "../../utils/formConig";
import {
  requiredRule,
  minLengthRule,
  maxLengthRule,
  emailRule,
  passwordMatchRule,
  requiredRuleEn,
  minLengthRuleEn,
  maxLengthRuleEn,
  emailRuleEn,
  passwordMatchRuleEn,
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
      minLengthRule("email", 3),
      maxLengthRule("email", 50),
    ],
  },
  password: {
    ...createFormFieldConfig("Hasło", "password", "password"),
    validationRules: [
      requiredRule("Hasło"),
      minLengthRule("Hasło", 8),
      maxLengthRule("Hasło", 120),
    ],
  },
  confirmPassword: {
    ...createFormFieldConfig("Potwierdź hasło", "confirmPassword", "password"),
    validationRules: [passwordMatchRule()],
  },
};

export const signupFormEn = {
  firstName: {
    ...createFormFieldConfig("First name", "firstName", "text"),
    validationRules: [
      requiredRuleEn("first name"),
      minLengthRuleEn("first name", 3),
      maxLengthRuleEn("first name", 50),
    ],
  },
  lastName: {
    ...createFormFieldConfig("Last name", "lastName", "text"),
    validationRules: [
      requiredRuleEn("last name"),
      minLengthRuleEn("last name", 3),
      maxLengthRuleEn("last name", 50),
    ],
  },
  email: {
    ...createFormFieldConfig("Email", "email", "email"),
    validationRules: [
      emailRuleEn("email"),
      requiredRuleEn("email"),
      minLengthRuleEn("email", 3),
      maxLengthRuleEn("email", 50),
    ],
  },
  password: {
    ...createFormFieldConfig("Password", "password", "password"),
    validationRules: [
      requiredRuleEn("Password"),
      minLengthRuleEn("Password", 8),
      maxLengthRuleEn("Password", 120),
    ],
  },
  confirmPassword: {
    ...createFormFieldConfig("Confirm password", "confirmPassword", "password"),
    validationRules: [passwordMatchRuleEn()],
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

export const signinFormEn = {
  email: {
    ...createFormFieldConfig("Email", "email", "email"),
    validationRules: [
      emailRuleEn("email"),
      requiredRuleEn("email"),
      minLengthRuleEn("email", 10),
      maxLengthRuleEn("email", 50),
    ],
  },
  password: {
    ...createFormFieldConfig("Password", "password", "password"),
    validationRules: [
      requiredRuleEn("Password"),
      minLengthRuleEn("Password", 6),
      maxLengthRuleEn("Password", 120),
    ],
  },
};
