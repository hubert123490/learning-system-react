import { createFormFieldConfig } from "../../utils/formConig";
import { requiredRule, requiredRuleEn } from "../../utils/inputValidationRules";

export const addQuestionForm = {
    description: {
      ...createFormFieldConfig("Treść pytania", "description", "text"),
      validationRules: [
        requiredRule("Treść pytania"),
      ],
    },
    maxPoints: {
      ...createFormFieldConfig("Liczba punktów", "maxPoints", "number"),
      validationRules: [
        requiredRule("Liczba punktów"),
      ],
    }
  };

  export const addQuestionFormEn = {
    description: {
      ...createFormFieldConfig("Question content", "description", "text"),
      validationRules: [
        requiredRuleEn("Question content"),
      ],
    },
    maxPoints: {
      ...createFormFieldConfig("Max points", "maxPoints", "number"),
      validationRules: [
        requiredRuleEn("Max points"),
      ],
    }
  };

  export const addQuestionRadioForm = {
    option1 : {
      ...createFormFieldConfig("Opcja 1", "option1", "text"),
      validationRules: [
        requiredRule("Treść opcji 1"),
      ],
    },
    option2 : {
      ...createFormFieldConfig("Opcja 2", "option2", "text"),
      validationRules: [
        requiredRule("Treść opcji 2"),
      ],
    },
    option3 : {
      ...createFormFieldConfig("Opcja 3", "option3", "text"),
      validationRules: [
        requiredRule("Treść opcji 3"),
      ],
    },
    option4 : {
      ...createFormFieldConfig("Opcja 4", "option4", "text"),
      validationRules: [
        requiredRule("Treść opcji 4"),
      ],
    },
  }

  export const addQuestionRadioFormEn = {
    option1 : {
      ...createFormFieldConfig("Option 1", "option1", "text"),
      validationRules: [
        requiredRuleEn("Option 1 content"),
      ],
    },
    option2 : {
      ...createFormFieldConfig("Option 2", "option2", "text"),
      validationRules: [
        requiredRule("Option 2 content"),
      ],
    },
    option3 : {
      ...createFormFieldConfig("Option 3", "option3", "text"),
      validationRules: [
        requiredRule("Option 3 content"),
      ],
    },
    option4 : {
      ...createFormFieldConfig("Option 4", "option4", "text"),
      validationRules: [
        requiredRule("Option 4 content"),
      ],
    },
  }

  export const addQuestionTextForm = {
    correctAnswer : {
      ...createFormFieldConfig("Prawidłowa odpowiedź", "correctAnswer", "text"),
      validationRules: [
        requiredRule("Prawidłowa odpowiedź")
      ]
    }
  }

  export const addQuestionTextFormEn = {
    correctAnswer : {
      ...createFormFieldConfig("Correct answer", "correctAnswer", "text"),
      validationRules: [
        requiredRuleEn("Correct answer")
      ]
    }
  }

  export const addQuestionTextAreaForm = {
    correctAnswer : {
      ...createFormFieldConfig("Prawidłowa odpowiedź", "correctAnswer", "text"),
      validationRules: [
        requiredRule("Prawidłowa odpowiedź")
      ]
    }
  }