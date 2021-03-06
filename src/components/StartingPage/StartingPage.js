import classes from "./StartingPage.module.css";
import useHttp from "../../hooks/use-http";
import { getAllCourses } from "../../lib/api/course-api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useForm from "../../hooks/use-form";
import { getCoursesForm, getCoursesFormEn } from "../../lib/forms/course-form";
import { useSearchParams } from "react-router-dom";
import Courses from "./Courses";
import Pagination from "../Pagination/Pagination";
import LoadingSpinner from "../UI/LoadingSpinner";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

const StartingPageContent = () => {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams({
    name: "",
    category: "",
    lastName: "",
  });
  const [showFilter, setShowFilter] = useState(true);
  const { renderFormInputs: renderGetCoursesInputsPl } = useForm(getCoursesForm);
  const { renderFormInputs: renderGetCoursesInputsEn } = useForm(getCoursesFormEn);
  const { sendRequest, data, status, error } = useHttp(getAllCourses, true);
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage] = useState(4);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  console.log(t)

  const getTitle = (title) => {
    if (title === "Bachelor") return "mgr";
    else if (title === "Master") return "dr";
    else if (title === "Professor") return "prof.";
  };

  useEffect(() => {
    let identifier = setTimeout(() => {
      setLoading(false);
      sendRequest({
        name: searchParams.get("name"),
        category: searchParams.get("category"),
        lastName: searchParams.get("lastName"),
        error: t("StartingPage__Error")
      });
    }, 500);
    return () => {
      clearTimeout(identifier);
      return sendRequest();
    };
  }, [sendRequest, searchParams, t]);

  const courseDetailsHandler = (courseId) => {
    navigate(`/student/courses/${courseId}`);
  };

  const showFilterHandler = () => {
    setShowFilter((prevState) => {
      return !prevState;
    });
  };

  const filterFunction = (event) => {
    event.preventDefault();
    let courseName = searchParams.get("name") ? searchParams.get("name") : "";
    let courseCategory = searchParams.get("category")
      ? searchParams.get("category")
      : "";
    let teacherLastName = searchParams.get("lastName")
      ? searchParams.get("lastName")
      : "";
    if (event.target.name === "courseName") {
      courseName = event.target.value;
    }
    if (event.target.name === "courseCategory") {
      courseCategory = event.target.value;
    }
    if (event.target.name === "teacherLastName") {
      teacherLastName = event.target.value;
    }
    setSearchParams({
      name: courseName,
      category: courseCategory,
      lastName: teacherLastName,
    });
    setLoading(true);
  };

  // Get current course
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  let currentCourses = [];
  if (data) {
    currentCourses = data.courses
      .sort((a, b) => {
        var textA = a.name.toUpperCase();
        var textB = b.name.toUpperCase();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      })
      .slice(indexOfFirstCourse, indexOfLastCourse);
  }

  //Change page (pagination)
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <section className={classes["main-page-overview"]}>
        <div className={classes["main-page-overview__content"]}>
          <h1>{t("StartingPage__GoodLuck")}</h1>
          <div className={classes["main-page-overview__content-text"]}>
            {t("StartingPage__Text")}
          </div>
          <div className={classes["main-page-overview__content-author"]}>
            {t("StartingPage__Author")}
          </div>
        </div>
      </section>

      <section className={classes["starting"]}>
        <h1>{t("StartingPage__ActualCourses")}</h1>
        <button onClick={showFilterHandler}>
          {showFilter
            ? t("StartingPage__CloseFilter")
            : t("StartingPage__Filter")}
        </button>
        {showFilter && (
          <form className={classes["form"]} onChange={filterFunction}>
           {i18next.language === "en" && renderGetCoursesInputsEn()}
           {i18next.language === "pl" && renderGetCoursesInputsPl()}
          </form>
        )}
        <div>
          {status === "pending" && <LoadingSpinner />}
          <Courses
            data={currentCourses}
            courseDetailsHandler={courseDetailsHandler}
            getTitle={getTitle}
            status={status}
            loading={loading}
            error={error}
          />
          {data && (
            <Pagination
              postsPerPage={coursesPerPage}
              totalPosts={data ? data.courses.length : 1}
              paginate={paginate}
              currentPage={currentPage}
            />
          )}
        </div>
      </section>
    </>
  );
};

export default StartingPageContent;
