import { useState } from "react";
import { useParams } from "react-router-dom";
import Modal from "../../UI/Modal";
import classes from "./Section.module.css"
import { FaTimes } from "react-icons/fa";
import Description from "./Description"
import File from "./File"
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
  
    const deleteItem = (taskId) => {
      props.deleteTaskRequest({
        courseId: params.courseId,
        assignmentId: params.assignmentId,
        taskId: taskId,
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
      <div className={classes["assignment"]}>
        <div className={classes["card"]}>
          <div>
            <h3>{props.item.title}</h3>
          </div>
          <div className={classes["text"]} style={{ whiteSpace: "pre-wrap" }}>
            {props.item.description}
          </div>
          <hr/>
         {props.item.files.map((file) => (
             <div key={file.id} className={classes["lesson-content__files"]}>
                <FileItem file={file} deleteFileTaskRequest={props.deleteFileTaskRequest} taskId={props.item.id}/>
            </div>
          ))} 
          <hr />
          <div>
            <h3>Operacje</h3>
            <Description
              updateTaskDescriptionRequest={props.updateTaskDescriptionRequest}
              description={props.item.description}
              taskId={props.item.id}
            />
            <File
              taskId={props.item.id}
              addFileTaskRequest={props.addFileTaskRequest}
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
    )
}

export default Section