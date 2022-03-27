import { useParams } from "react-router-dom";
import { useState } from "react";
import Modal from "../../UI/Modal";
import classes from "./FileItem.module.css"
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
    props.deleteFileTaskRequest({
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
              {t("Teacher__Assignments_FileNotSupported")}{" "}
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
              {t("Teacher__Assignments_FileDelete")}
            </span>
          </div>
          </>
  )
}

export default FileItem;