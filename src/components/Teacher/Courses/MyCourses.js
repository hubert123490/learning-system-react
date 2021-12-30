import classes from "./MyCourses.module.css";
import useHttp from "../../../hooks/use-http";
import {
  deleteCourse,
  getMyCourses,
  createCourse,
} from "../../../lib/api/course-api";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../UI/LoadingSpinner";
import Card from "../../UI/Card";
import { useNavigate } from "react-router";
import useForm from "../../../hooks/use-form";
import { createCourseForm } from "../../../lib/forms/course-form";
import MyCourse from "./MyCourse";

const MyCourses = () => {
  const navigate = useNavigate();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const {
    renderFormInputs: renderCreateFormInputs
  } = useForm(createCourseForm);
  const {
    sendRequest: getAllCourses,
    data: coursesData,
    error: courseError,
  } = useHttp(getMyCourses, true);
  const {
    sendRequest: deleteCourseRequest,
    // data: deleteData,
    // error: deleteError,
    status: deleteStatus,
  } = useHttp(deleteCourse);
  const {
    sendRequest: createCourseRequest,
    data: createdData,
    error: createdError,
    status: createdStatus,
  } = useHttp(createCourse);

  useEffect(() => {
    getAllCourses();
  }, [getAllCourses, deleteStatus, createdStatus]);

  const courseDetailsHandler = (courseId) => {
    navigate(`/teacher/courses/${courseId}`);
  };

  const submitCreateFormHandler = (event) => {
    event.preventDefault();
    createCourseRequest({
      name: renderCreateFormInputs()[0].props.value,
      category: renderCreateFormInputs()[1].props.value,
      password: renderCreateFormInputs()[2].props.value,
    });
  };

  const createCourseRedirectHandler = () => {
    navigate(`/teacher/courses/${createdData.id}`);
  };

  const showCreateFormHandler = () => {
    setShowCreateForm(!showCreateForm);
  };

  const createForm = (
    <form
      className={classes["create-course__form"]}
      onSubmit={submitCreateFormHandler}
    >
      {!createdData && <h1>Stwórz nowy kurs</h1>}
      {createdData && <h1>Utworzono kurs</h1>}
      {!createdData && renderCreateFormInputs()}
      {createdStatus === "completed" && createdError ? (
        <div className={classes.error}>{createdError}</div>
      ) : (
        ""
      )}
      {createdStatus === "completed" && createdData ? (
        <div className={classes.success}>{createdData.message}</div>
      ) : (
        ""
      )}
      {createdStatus === "pending" && !createdData && <LoadingSpinner />}
      {!createdData && createdStatus !== "pending" && (
        <button
          type="submit"
          disabled={
            !(
              renderCreateFormInputs()[0].props.isValid &&
              renderCreateFormInputs()[1].props.isValid
            )
          }
        >
          Stwórz kurs{" "}
        </button>
      )}
      {createdStatus === "completed" && createdData && (
        <button onClick={createCourseRedirectHandler}>
          Przejdź do nowo utworzonego kursu
        </button>
      )}
    </form>
  );

  return (
    <>
      {/* <SideNavigation /> */}
     
      <section className={classes["my-courses"]}>
        <h1>Twoje kursy!</h1>
        <button onClick={showCreateFormHandler}>
          {showCreateForm ? "Zamknij" : "Dodaj kurs"}
        </button>
        {showCreateForm && createForm}
        <div className={classes["courses"]}>
          {coursesData ? (
            coursesData.courses.map((item) => (
              <MyCourse key={item.id} item={item} deleteCourseRequest={deleteCourseRequest} courseDetailsHandler={courseDetailsHandler} />
            ))
          ) : courseError ? (
            <div className={classes["error"]}>
              <h1>{courseError}</h1>
            </div>
          ) : (
            <Card>
              <div>
                <LoadingSpinner />
              </div>
            </Card>
          )}
        </div>
      </section>
    </>
  );
};

export default MyCourses;
