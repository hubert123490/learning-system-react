import { useEffect, useState } from "react";
import { useParams } from "react-router";
import classes from "./Text.module.css"

const Text = (props) => {
  const params = useParams();
  const [text, setText] = useState(props.value);
  const [showTextArea, setShowTextArea] = useState(false)

  const handleChange = (event) => {
    setText(event.target.value);
  };

  useEffect(() => {

  }, [props.value])

  const submitHandler = (event) => {
    event.preventDefault();
    props.updateTextRequest({
      courseId: params.courseId,
      lessonId: params.lessonId,
      contentId: props.contentId,
      textArea: text,
    });
    setText((prevState) => prevState)
  };

  const showTextAreaHandler = () => {
    setShowTextArea(!showTextArea)
  }

  return (
    <div className={classes["add-text"]}>
      <button onClick={showTextAreaHandler}>
        {!showTextArea ? "Edytuj tekst" : "Zamknij tekst"}
      </button>
      {showTextArea &&
      <form className={classes["add-text__form"]} onSubmit={submitHandler}>
        <textarea className={classes["textarea"]} value={text} onChange={handleChange} />
        <button type="submit">Zapisz</button>
      </form>}
    </div>
  );
};

export default Text;
