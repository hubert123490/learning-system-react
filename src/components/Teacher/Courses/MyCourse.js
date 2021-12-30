import image from "../../../assets/course_image.jpg";
import classes from "./MyCourse.module.css";
import { FaTimes } from "react-icons/fa";
import { useState } from "react";
import Modal from "../../UI/Modal";

const MyCourse = (props) => {
  const [showModal, setShowModal] = useState(false);

  const showModalHandler = () => {
      setShowModal(prevState => {
          return !prevState
      })
  }

  const closeModal = () => {
      setShowModal(false)
  }

  const deleteItem = (courseId) => {
      props.deleteCourseRequest(courseId);
      setShowModal(false)
  }

  return (
    <>
      {showModal && <Modal item={props.item} closeModal={closeModal} deleteItem={deleteItem}/>}
      <div className={classes["course"]}>
        <div>
          <FaTimes
            size={25}
            onClick={showModalHandler}
            className={classes["delete-icon"]}
          />
          <div
            onClick={() => {
              props.courseDetailsHandler(props.item.id);
            }}
          >
            <div className={classes["course__image-container"]}>
              <img src={image} alt="course" />
            </div>
            <h2 className={classes["course-description__title"]}>
              {props.item.name}
            </h2>
            <div className={classes["course-description__category-container"]}>
              <span className={classes["category-title"]}></span>
              <span className={classes["category-value"]}>
                {props.item.category}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyCourse;
