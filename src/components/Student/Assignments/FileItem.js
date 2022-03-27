import { useState } from "react";
import { useParams } from "react-router-dom";
import classes from "./FileItem.module.css";
import Modal from "../../UI/Modal";
import { useTranslation } from "react-i18next";

const FileItem = (props) => {
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

  const deleteItem = (fileId) => {
    props.deleteTaskAnswerFile({
      courseId: params.courseId,
      assignmentId: params.assignmentId,
      taskId: props.taskId,
      fileId: fileId,
    });
    setShowModal(false);
  };

  return (
    <>
      {showModal && (
        <Modal
          item={props.file}
          closeModal={closeModal}
          deleteItem={deleteItem}
        />
      )}
      {props.file.fileType.split("/")[0] === "video" && (
        <video className={classes["task-content__files-video"]} controls>
          <source src={props.file.downloadUrl} type={props.file.type} />
          Twoja przeglądarka nie wspiera odtwarzacza video.{" "}
        </video>
      )}
      <div className={classes["task-content__file"]}>
        <a
          href={props.file.downloadUrl}
          target="_blank"
          rel="noreferrer"
          className={classes["task-content__file_a"]}
        >
          {props.file.fileName}
        </a>{" "}
        <span
          onClick={showModalHandler}
          className={classes["task-content__file-delete"]}
        >
          {" "}
          {t("Student__Assignment_Delete")}
        </span>
      </div>
    </>
  );
};

export default FileItem;
