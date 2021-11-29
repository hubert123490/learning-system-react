import { createFormFieldConfig } from "../../utils/formConig";
import { requiredRule } from "../../utils/inputValidationRules";

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

  export const addQuestionTextForm = {
    correctAnswer : {
      ...createFormFieldConfig("Prawidłowa odpowiedź", "correctAnswer", "text"),
      validationRules: [
        requiredRule("Prawidłowa odpowiedź")
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