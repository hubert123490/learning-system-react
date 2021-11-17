import React from "react";
import Input from "../components/UI/Input";

import {
  requiredRule,
  minLengthRule,
  maxLengthRule,
  passwordMatchRule,
  emailRule
} from "./inputValidationRules";

/**
 * creates and returns object representation of form field
 *
 * @param {string} label - label to show with the form input
 * @param {string} name - input name
 * @param {string} type - input type
 * @param {string} defaultValue - default value for the input
 */
function createFormFieldConfig(label, name, type, defaultValue = "") {
  return {
    renderInput: (handleChange, value, isValid, error, key) => {
      return (
        <Input
          key={key}
          name={name}
          type={type}
          label={label}
          isValid={isValid}
          value={value}
          handleChange={handleChange}
          errorMessage={error}
        />
      );
    },
    label,
    value: defaultValue,
    valid: false,
    errorMessage: "",
    touched: false
  };
}

// object representation of auth form
export const signupForm = {
  firstName: {
    ...createFormFieldConfig("Imię", "firstName", "text"),
    validationRules : [
      requiredRule("imię"),
      minLengthRule("imię", 3),
      maxLengthRule("imię", 50)
    ]
  },
  lastName: {
    ...createFormFieldConfig("Nazwisko", "lastName", "text"),
    validationRules : [
      requiredRule("Nazwisko"),
      minLengthRule("Nazwisko", 3),
      maxLengthRule("Nazwisko", 50)
    ]
  },
  email: {
    ...createFormFieldConfig("Email", "email", "email"),
    validationRules: [
      emailRule("email"),
      requiredRule("email"),
      minLengthRule("email", 10),
      maxLengthRule("email", 50)
    ]
  },
  password: {
    ...createFormFieldConfig("Hasło", "password", "password"),
    validationRules: [
      requiredRule("Hasło"),
      minLengthRule("Hasło", 6),
      maxLengthRule("Hasło", 120)
    ]
  },
  confirmPassword: {
    ...createFormFieldConfig("Potwierdź hasło", "confirmPassword", "password"),
    validationRules: [passwordMatchRule()]
  },
};

export const signinForm = {
  email: {
    ...createFormFieldConfig("Email", "email", "email"),
    validationRules: [
      emailRule("email"),
      requiredRule("email"),
      minLengthRule("email", 10),
      maxLengthRule("email", 50)
    ]
  },
  password: {
    ...createFormFieldConfig("Hasło", "password", "password"),
    validationRules: [
      requiredRule("Hasło"),
      minLengthRule("Hasło", 6),
      maxLengthRule("Hasło", 120)
    ]
  }
}
