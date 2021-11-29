import { useParams } from "react-router";
import { useState } from "react";

const AnswerTextArea = (props) => {
    const params = useParams();
    const [answer, setAnswer] = useState("");

    return (
        <form>
          <p>{props.question.description}</p>
          <textarea rows={4} cols={120} value={answer} onChange={(e) => props.handleTextArea(e, props.question.id, setAnswer)} />
          <br />
        </form>
      );
}

export default AnswerTextArea