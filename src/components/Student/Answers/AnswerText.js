import { useState } from "react";
import { useTranslation } from "react-i18next";

const AnswerText = (props) => {
  const { t } = useTranslation();
  const [answer, setAnswer] = useState("");

  return (
    <form>
      <label htmlFor="answer">{t("Student__Exam_Answer")}</label>
      <br />
      <input
        type="text"
        id="answer"
        name="answer"
        value={answer}
        onChange={(e) => props.handleText(e, props.item.id, setAnswer)}
      />
    </form>
  );
};

export default AnswerText;
