import classes from "./Content.module.css";
import { FaTimes } from "react-icons/fa";
import { useParams } from "react-router-dom";
import examImage from "../../../assets/exam.jpg";
import { useState } from "react";
import Modal from "../../UI/Modal";
import { useTranslation } from "react-i18next";

const Exam = (props) => {
  const params = useParams();
  const [showModal, setShowModal] = useState(false);
  const { t } = useTranslation();

  const showModalHandler = () => {
    setShowModal((prevState) => {
      return !prevState;
    });
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const deleteItem = (examId) => {
    props.deleteExamRequest({
      courseId: params.courseId,
      examId: examId,
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
      <div
        className={`${classes["content-container__item"]} ${classes["exam"]}`}
      >
        <FaTimes
          size={25}
          onClick={showModalHandler}
          className={classes["delete-icon"]}
        />
        <div
          onClick={() => {
            props.examDetailsHandler(props.item.id);
          }}
        >
          <h2 className={classes["content-container__title"]}>
            {props.item.name}
          </h2>
          <div className={classes["content-container__image-container"]}>
            <img src={examImage} alt="exam" />
          </div>
          <div className={classes["content-container__description"]}>
            {props.item.description}
          </div>
          <div className={classes["content-container__date-container"]}>
            {t("Teacher__CourseDetails_From")} {" "}
            {props.item.startDate.split("T")[0].split("-")[2] +
              "-" +
              props.item.startDate.split("T")[0].split("-")[1] +
              "-" +
              props.item.startDate.split("T")[0].split("-")[0]}{" "}
            {props.item.startDate.split("T")[1]}
          </div>
          <div className={classes["content-container__date-container"]}>
          {t("Teacher__CourseDetails_To")} {" "}
            {props.item.endDate.split("T")[0].split("-")[2] +
              "-" +
              props.item.endDate.split("T")[0].split("-")[1] +
              "-" +
              props.item.endDate.split("T")[0].split("-")[0]}{" "}
            {props.item.endDate.split("T")[1]}
          </div>
        </div>
      </div>
    </>
  );
};

export default Exam;
