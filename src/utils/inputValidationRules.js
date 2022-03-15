/**
 * creates and returns a validation rule object that
 * is used by useForm hook to validate the form inputs
 *
 * @param {string} ruleName - name of the validation rule
 * @param {string} errorMessage - message to display
 * @param {function} validateFunc - validation function
 */
function createValidationRule(ruleName, errorMessage, validateFunc) {
  return {
    name: ruleName,
    message: errorMessage,
    validate: validateFunc,
  };
}

export function requiredRule(inputName) {
  return createValidationRule(
    "required",
    `Pole ${inputName} wymagane`,
    (inputValue, formObj) => inputValue.length !== 0
  );
}

export function minLengthRule(inputName, minCharacters) {
  return createValidationRule(
    "minLength",
    `Pole ${inputName} powinno zawierać przynajmniej ${minCharacters} znaków`,
    (inputValue, formObj) => inputValue.length >= minCharacters
  );
}

export function maxLengthRule(inputName, maxCharacters) {
  return createValidationRule(
    "minLength",
    `Pole ${inputName} nie może zawierać więcej niż ${maxCharacters} znaków`,
    (inputValue, formObj) => inputValue.length <= maxCharacters
  );
}

export function passwordMatchRule() {
  return createValidationRule(
    "passwordMatch",
    `Hasło nie jest takie samo`,
    (inputValue, formObj) => inputValue === formObj.password.value
  );
}

export function emailRule(inputName) {
  return createValidationRule(
    "email",
    `${inputName} jest niepoprawny`,
    (inputValue) => {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(inputValue).toLowerCase());
    }
  );
}

export function requiredRuleEn(inputName) {
  return createValidationRule(
    "required",
    `Field ${inputName} is required`,
    (inputValue, formObj) => inputValue.length !== 0
  );
}

export function minLengthRuleEn(inputName, minCharacters) {
  return createValidationRule(
    "minLength",
    `Field ${inputName} should contain atleast ${minCharacters} signs`,
    (inputValue, formObj) => inputValue.length >= minCharacters
  );
}

export function maxLengthRuleEn(inputName, maxCharacters) {
  return createValidationRule(
    "minLength",
    `Field ${inputName} should contain no more than ${maxCharacters} signs`,
    (inputValue, formObj) => inputValue.length <= maxCharacters
  );
}

export function passwordMatchRuleEn() {
  return createValidationRule(
    "passwordMatch",
    `Password is not the same`,
    (inputValue, formObj) => inputValue === formObj.password.value
  );
}

export function emailRuleEn(inputName) {
  return createValidationRule(
    "email",
    `${inputName} is invalid`,
    (inputValue) => {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(inputValue).toLowerCase());
    }
  );
}
