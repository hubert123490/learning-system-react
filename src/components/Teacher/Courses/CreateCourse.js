import { createCourse } from "../../../lib/course-api";
import { createCourseForm } from "../../../utils/formConig";
import classes from "./CreateCourse.module.css";
import useHttp from "../../../hooks/use-http";
import useForm from "../../../hooks/use-form";
import authHeader from "../../../lib/auth-header";
import LoadingSpinner from "../../UI/LoadingSpinner";
import { useEffect } from "react";

const CreateCourse = () => {
  const { renderFormInputs, isFormValid } = useForm(createCourseForm);

  const { sendRequest, status, data, error } = useHttp(createCourse);

  const submitHandler = (event) => {
    event.preventDefault();
    sendRequest({
      name: renderFormInputs()[0].props.value,
      category: renderFormInputs()[1].props.value,
      password: renderFormInputs()[3].props.value,
    });
  };

  console.log(error);

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
      {status === "pending" && !data && <LoadingSpinner />}
      {!data && (
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
