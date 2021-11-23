import { useEffect, useState } from "react";
import { useParams } from "react-router";

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
    <div>
      <button onClick={showTextAreaHandler}>
        {!showTextArea ? "Edytuj tekst" : "Zamknij tekst"}
      </button>
      {showTextArea &&
      <form onSubmit={submitHandler}>
        <textarea rows={4} cols={120} value={text} onChange={handleChange} />
        <br/>
        <button type="submit">Zapisz</button>
      </form> }
    </div>
  );
};

export default Text;
