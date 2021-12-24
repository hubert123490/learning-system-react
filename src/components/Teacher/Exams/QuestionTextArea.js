import { useState } from "react";
import classes from "./QuestionTextArea.module.css"

const QuestionTextArea = (props) => {
  const [text, setText] = useState("");


  const handleChange = (event) => {
    setText(event.target.value);
  };

  const textAreaForm = () => {
    return (
      <form className={classes["text-area-preview__form"]}>
        <textarea value={text} onChange={handleChange} />
      </form>
    );
  };

  return (
    <>
      {props.question.type === "textarea" &&
        props.question.correctAnswer === null &&
        textAreaForm(props.question)}
    </>
  );
};

export default QuestionTextArea;
