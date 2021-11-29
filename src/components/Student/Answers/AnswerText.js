import { useState } from "react";

const AnswerText = (props) => {
  const [answer, setAnswer] = useState("");

  return (
    <form>
      <label htmlFor="answer">Podaj odpowiedź </label>
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
