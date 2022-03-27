import { useParams } from "react-router-dom";
import { useState } from "react";
import classes from "./Description.module.css"
import { useTranslation } from "react-i18next";

const Description = (props) => {
    const params = useParams();
    const [description, setDescription] = useState(props.description);
    const [showDescription, setShowDescription] = useState(false)
    const { t } = useTranslation();
    const handleChange = (event) => {
      setDescription(event.target.value);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        props.updateTaskDescriptionRequest({
          courseId: params.courseId,
          assignmentId: params.assignmentId,
          taskId: props.taskId,
          description: description,
        });
        setDescription((prevState) => prevState)
      };
    
      const showDescriptionHandler = () => {
        setShowDescription(prevState => {
            return !prevState
        })
      }

    return (
        <div className={classes["add-description"]}>
      <button onClick={showDescriptionHandler}>
        {!showDescription ? t( "Teacher__Assignments_EditDescription") : t( "Teacher__Assignments_CloseDescription")}
      </button>
      {showDescription &&
      <form className={classes["add-description__form"]} onSubmit={submitHandler}>
        <textarea className={classes["description"]} value={description} onChange={handleChange} />
        <button type="submit">{t( "Teacher__Assignments_Save")}</button>
      </form>}
    </div>
    )
}

export default Description