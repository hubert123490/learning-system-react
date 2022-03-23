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
import {
  createCourseForm,
  createCourseFormEn,
} from "../../../lib/forms/course-form";
import MyCourse from "./MyCourse";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

const MyCourses = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const { renderFormInputs: renderCreateFormInputs } =
    useForm(createCourseForm);
  const { renderFormInputs: renderCreateFormInputsEn } =
    useForm(createCourseFormEn);
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
    if (i18next.language === "pl") {
      createCourseRequest({
        name: renderCreateFormInputs()[0].props.value,
        category: renderCreateFormInputs()[1].props.value,
        password: renderCreateFormInputs()[2].props.value,
      });
    } else if (i18next.language === "en") {
      createCourseRequest({
        name: renderCreateFormInputsEn()[0].props.value,
        category: renderCreateFormInputsEn()[1].props.value,
        password: renderCreateFormInputsEn()[2].props.value,
      });
    }
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
      {!createdData && <h1>{t("Teacher__MyCourses_CreateCourse")}</h1>}
      {createdData && <h1>{t("Teacher__MyCourses_CourseCreated")}</h1>}
      {!createdData && i18next.language === "pl" && renderCreateFormInputs()}
      {!createdData && i18next.language === "en" && renderCreateFormInputsEn()}
      {createdStatus === "completed" && createdError ? (
        <div className={classes.error}>{createdError}</div>
      ) : (
        ""
      )}
      {createdStatus === "completed" && createdData ? (
        <div className={classes.success}>{t("Teacher__MyCourses_Success")}</div>
      ) : (
        ""
      )}
      {createdStatus === "pending" && !createdData && <LoadingSpinner />}
      {!createdData &&
        createdStatus !== "pending" &&
        (i18next.language === "pl" ? (
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
        ) : (
          i18next.language === "en" && (
            <button
              type="submit"
              disabled={
                !(
                  renderCreateFormInputsEn()[0].props.isValid &&
                  renderCreateFormInputsEn()[1].props.isValid
                )
              }
            >
              Create course{" "}
            </button>
          )
        ))}
      {createdStatus === "completed" &&
        createdData &&
        (i18next.language === "pl" ? (
          <button onClick={createCourseRedirectHandler}>
            Przejdź do nowo utworzonego kursu
          </button>
        ) : (
          i18next.language === "en" && (
            <button onClick={createCourseRedirectHandler}>
              Move to created course
            </button>
          )
        ))}
    </form>
  );

  return (
    <>
      {/* <SideNavigation /> */}

      <section className={classes["my-courses"]}>
        <h1>{t("Teacher__MyCourses_Title")}</h1>
        <button onClick={showCreateFormHandler}>
          {showCreateForm
            ? t("Teacher__MyCourses_HideForm")
            : t("Teacher__MyCourses_ShowForm")}
        </button>
        {showCreateForm && createForm}
        <div className={classes["courses"]}>
          {coursesData ? (
            coursesData.courses.map((item) => (
              <MyCourse
                key={item.id}
                item={item}
                deleteCourseRequest={deleteCourseRequest}
                courseDetailsHandler={courseDetailsHandler}
              />
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
