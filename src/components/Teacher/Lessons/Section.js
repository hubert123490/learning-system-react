import Text from "./Text";
import File from "./File";
import { FaTimes } from "react-icons/fa";
import classes from "./Section.module.css";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Modal from "../../UI/Modal"
import FileItem from "./FileItem";

const Section = (props) => {
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

  const deleteItem = (contentId) => {
    props.deleteContentRequest({
      courseId: params.courseId,
      lessonId: params.lessonId,
      contentId: contentId,
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
      <div className={classes["lesson"]}>
        <div className={classes["card"]}>
          <div>
            <h3>{props.item.title}</h3>
          </div>
          <div className={classes["text"]} style={{ whiteSpace: "pre-wrap" }}>
            {props.item.value}
          </div>
          <hr/>
          {props.item.files.map((file) => (
             <div key={file.id} className={classes["lesson-content__files"]}>
                <FileItem file={file} deleteFileRequest={props.deleteFileRequest} contentId={props.item.id}/>
            </div>
          ))}
          <hr />
          <div>
            <h3>Operacje</h3>
            <Text
              updateTextRequest={props.updateTextRequest}
              value={props.item.value}
              contentId={props.item.id}
            />
            <File
              contentId={props.item.id}
              addFileRequest={props.addFileRequest}
            />
            <FaTimes
              size={20}
              onClick={showModalHandler}
              className={classes["delete-icon"]}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Section;
