import { useParams } from "react-router-dom";
import classes from "./ExamDetailsItem.module.css";
import QuestionRadio from "./QuestionRadio";
import QuestionText from "./QuestionText";
import QuestionTextArea from "./QuestionTextArea";
import { FaTimes } from "react-icons/fa";
import { useState } from "react";
import Modal from "../../UI/Modal"

const ExamDetailsItem = (props) => {
  const params = useParams();
  const [notFilled, setNotFilled] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const onUnfilledQuestion = () => {
    setNotFilled(true);
  };

  const showModalHandler = () => {
    setShowModal((prevState) => {
      return !prevState;
    });
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const deleteItem = (questionId) => {
    props.deleteQuestionRequest({
      courseId: params.courseId,
      examId: params.examId,
      questionId: questionId,
    });
    setShowModal(false);
  };

  return (
    <>
     {showModal && (
        <Modal
          item={props.item}
          closeModal={closeModal}
          deleteItem={deleteItem}
        />
      )}
      <div key={props.item.id}>
        <div
          className={`${classes["question"]} ${
            notFilled ? classes["not-filled"] : ""
          }`}
        >
          <h3>{props.item.description}</h3>
          {props.item.type === "radio" && (
            <QuestionRadio
              question={props.item}
              addQuestionRadioRequest={props.addQuestionRadioRequest}
              unfilledQuestionHandler={onUnfilledQuestion}
            />
          )}
          {props.item.type === "text" && (
            <QuestionText
              question={props.item}
              addQuestionTextRequest={props.addQuestionTextRequest}
              unfilledQuestionHandler={onUnfilledQuestion}
            />
          )}
          {props.item.type === "textarea" && (
            <QuestionTextArea
              question={props.item}
              addQuestionTextAreaRequest={props.addQuestionTextAreaRequest}
            />
          )}
          <FaTimes
            size={20}
            onClick={showModalHandler}
            className={classes["delete-icon"]}
          />
        </div>
      </div>
    </>
  );
};

export default ExamDetailsItem;
