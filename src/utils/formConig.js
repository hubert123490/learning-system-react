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
    ...createFormFieldConfig("First name", "firstName", "text"),
    validationRules : [
      requiredRule("firstName"),
      minLengthRule("firstName", 3),
      maxLengthRule("firstName", 50)
    ]
  },
  lastName: {
    ...createFormFieldConfig("Last name", "lastName", "text"),
    validationRules : [
      requiredRule("lastName"),
      minLengthRule("lastName", 3),
      maxLengthRule("lastName", 50)
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
    ...createFormFieldConfig("Password", "password", "password"),
    validationRules: [
      requiredRule("password"),
      minLengthRule("password", 6),
      maxLengthRule("password", 120)
    ]
  },
  confirmPassword: {
    ...createFormFieldConfig("Confirm Password", "confirmPassword", "password"),
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
    ...createFormFieldConfig("Password", "password", "password"),
    validationRules: [
      requiredRule("password"),
      minLengthRule("password", 6),
      maxLengthRule("password", 120)
    ]
  }
}
