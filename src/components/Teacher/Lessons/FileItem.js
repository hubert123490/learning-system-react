import classes from "./FileItem.module.css"
import { useParams } from "react-router-dom";
import { useState } from "react";
import Modal from "../../UI/Modal";

const FileItem = (props) => {
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
    props.deleteFileRequest({
      courseId: params.courseId,
      lessonId: params.lessonId,
      contentId: props.contentId,
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
                <video className={classes["lesson-content__files-video"]} controls>
                  <source src={props.file.downloadUrl} type={props.file.type} />
                  Twoja przeglądarka nie wspiera odtwarzacza video.{" "}
                </video>
              )}
              <div className={classes["lesson-content__file"]}>
                <a
                  href={props.file.downloadUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={classes["lesson-content__file_a"]}
                >
                  {props.file.fileName}
                </a>{" "}
                <span
                  onClick={showModalHandler}
                  className={classes["lesson-content__file-delete"]}
                >
                  {" "}
                  usuń
                </span>
              </div>
              </>
    )
}

export default FileItem