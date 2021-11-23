import { createCourse } from "../../lib/api/course-api";
import { createCourseForm } from "../../lib/forms/course-form";
import classes from "./CreateCourse.module.css";
import useHttp from "../../hooks/use-http";
import useForm from "../../hooks/use-form";
import LoadingSpinner from "../UI/LoadingSpinner";

const CreateCourse = () => {
  const { renderFormInputs, isFormValid } = useForm(createCourseForm);

  const { sendRequest, status, data, error } = useHttp(createCourse);

  const submitHandler = (event) => {
    event.preventDefault();
    sendRequest({
      name: renderFormInputs()[0].props.value,
      category: renderFormInputs()[1].props.value,
      password: renderFormInputs()[2].props.value,
    });
  };

  return (
    <form className={classes.createCourseForm} onSubmit={submitHandler}>
      {!data && <h1>Stwórz nowy kurs</h1>}
      {data && <h1>Utworzono kurs</h1>}
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
      {status === "pending" && !data && !error && <LoadingSpinner />}
      {!data && status !== "pending" &&(
        <button type="submit" disabled={!isFormValid()}>
          Stwórz kurs{" "}
        </button>
      )}
      {status === "completed" && data && (
        <button>Przejdź do nowo utworzonego kursu</button>
      )}
    </form>
  );
};

export default CreateCourse;
