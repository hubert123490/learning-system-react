import classes from "./Content.module.css";
import { FaTimes } from "react-icons/fa";
import lessonImage from "../../../assets/lesson.jpg";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Modal from "../../UI/Modal"

const Lesson = (props) => {
  const params = useParams();
  const [showModal, setShowModal] = useState(false);

  const showModalHandler = () => {
    setShowModal((prevState) => {
      return !prevState;
    });
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const deleteItem = (lessonId) => {
    props.deleteLessonRequest({
      courseId: params.courseId,
      lessonId: lessonId,
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
      <div className={classes["content-container__item"]}>
        <FaTimes
          size={25}
          onClick={showModalHandler}
          className={classes["delete-icon"]}
        />

        <div
          onClick={() => {
            props.lessonDetailsHandler(props.item.id);
          }}
        >
          <h2 className={classes["content-container__title"]}>
            {props.item.name}
          </h2>
          <div className={classes["content-container__image-container"]}>
            <img src={lessonImage} alt="lesson" />
          </div>
          <div className={classes["content-container__description"]}>
            {props.item.description}
          </div>
        </div>
      </div>
    </>
  );
};

export default Lesson;
