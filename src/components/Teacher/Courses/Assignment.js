import { useState } from "react";
import { useParams } from "react-router-dom";
import assignmentImage from "../../../assets/assignment.jpg";
import classes from "./Content.module.css";
import { FaTimes } from "react-icons/fa";
import Modal from "../../UI/Modal";
import { useTranslation } from "react-i18next";

const Assignment = (props) => {
  const { t } = useTranslation();
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

  const deleteItem = (assignmentId) => {
    props.deleteAssignmentRequest({
      courseId: params.courseId,
      assignmentId: assignmentId,
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
            props.assignmentDetailsHandler(props.item.id);
          }}
        >
          <h2 className={classes["content-container__title"]}>
            {props.item.name}
          </h2>
          <div className={classes["content-container__image-container"]}>
            <img src={assignmentImage} alt="assignment" />
          </div>
          <div className={classes["content-container__description"]}>
            {props.item.description}
          </div>
          <div className={classes["content-container__date-container"]}>
          {t("Teacher__CourseDetails_From")}{" "}
            {props.item.startDate.split("T")[0].split("-")[2] +
              "-" +
              props.item.startDate.split("T")[0].split("-")[1] +
              "-" +
              props.item.startDate.split("T")[0].split("-")[0]}{" "}
            {props.item.startDate.split("T")[1]}
          </div>
          <div className={classes["content-container__date-container"]}>
          {t("Teacher__CourseDetails_To")}{" "}
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

export default Assignment;
