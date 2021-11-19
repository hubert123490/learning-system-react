import { createLesson } from "../../../lib/lesson-api";
import { createLessonForm } from "../../../utils/formConig";
import classes from "./CreateLesson.module.css";
import useForm from "../../../hooks/use-form";
import useHttp from "../../../hooks/use-http";
import LoadingSpinner from "../../UI/LoadingSpinner";

const CreateLesson = (props) => {
  const { renderFormInputs, isFormValid } = useForm(createLessonForm);
  const { sendRequest, status, data, error } = useHttp(createLesson);

  const submitHandler = (event) => {
    event.preventDefault();
    
    sendRequest({
      name: renderFormInputs()[0].props.value,
      courseId : props.courseId
    });
  };


  return (
    <form className={classes.createLessonForm} onSubmit={submitHandler}>
      {!data && <h1>Stwórz nową lekcję</h1>}
      {data && <h1>Utworzono lekcję</h1>}
      {!data && renderFormInputs()}
      {status === "completed" && error ? (
        <div className={classes.error}>{error}</div>
      ) : (
        ""
      )}
      {status === "completed" && data ? (
        <div className={classes.success}>{data.message}</div>
      ) : (
        ""
      )}
      {status === "pending" && !data && <LoadingSpinner />}
      {!data && (
        <button type="submit" disabled={!isFormValid()}>
          Stwórz lekcję{" "}
        </button>
      )}
    </form>
  );
};

export default CreateLesson;
