import { useState } from "react";

const AnswerTextArea = (props) => {
    const [answer, setAnswer] = useState("");

    return (
        <form>
          <p>{props.question.description}</p>
          <textarea style={{width : "100%", height: "5rem"}} value={answer} onChange={(e) => props.handleTextArea(e, props.question.id, setAnswer)} />
          <br />
        </form>
      );
}

export default AnswerTextArea