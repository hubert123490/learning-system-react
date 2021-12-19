import classes from "./StartingPage.module.css";
import useHttp from "../../hooks/use-http";
import { getAllCourses } from "../../lib/api/course-api";
import { useEffect, useState } from "react";
import LoadingSpinner from "../UI/LoadingSpinner";
import Card from "../UI/Card";
import { useNavigate } from "react-router";
import useForm from "../../hooks/use-form";
import { getCoursesForm } from "../../lib/forms/course-form";
import { useSearchParams } from "react-router-dom";
import image from "../../assets/course_image.jpg";

const StartingPageContent = () => {
  const navigate = useNavigate();
  //for timeout in useEffect
  let identifier;
  const [searchParams, setSearchParams] = useSearchParams({
    name: "",
    category: "",
    lastName: "",
  });
  const [showFilter, setShowFilter] = useState(true);
  const { renderFormInputs: renderGetCoursesInputs } = useForm(getCoursesForm);
  const { sendRequest, data } = useHttp(getAllCourses, true);

  const getTitle = (title) => {
    if (title === "Bachelor") return "inz.";
    else if (title === "Master") return "dr";
  };

  useEffect(() => {
    identifier = setTimeout(() => {
      sendRequest({
        name: searchParams.get("name"),
        category: searchParams.get("category"),
        lastName: searchParams.get("lastName"),
      });
    }, 500);
    return () => {
      clearTimeout(identifier);
      return sendRequest();
    };
  }, [sendRequest, searchParams]);

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
    let courseName = searchParams.name ? searchParams.name : "";
    let courseCategory = searchParams.category ? searchParams.category : "";
    let teacherLastName = searchParams.lastName ? searchParams.lastName : "";
    if (event.target.name == "courseName") {
      courseName = event.target.value;
    }
    if (event.target.name == "courseCategory") {
      courseCategory = event.target.value;
    }
    if (event.target.name == "teacherLastName") {
      teacherLastName = event.target.value;
    }
    setSearchParams({
      name: courseName,
      category: courseCategory,
      lastName: teacherLastName,
    });
  };

  return (
    <>
      <section className={classes["main-page-overview"]}>
        <div className={classes["main-page-overview__content"]}>
          <h1>Powodzenia!</h1>
          <div className={classes["main-page-overview__content-text"]}>
            Jest tylko jeden sposób nauki. Poprzez działanie.
          </div>
          <div className={classes["main-page-overview__content-author"]}>
            Paulo Coelho
          </div>
        </div>
      </section>
      <section className={classes["starting"]}>
        <h1>Aktualnie prowadzone kursy!</h1>
        <button onClick={showFilterHandler}>
          {showFilter ? "Zamknji filter" : "Filtruj"}
        </button>
        {showFilter && (
          <form className={classes["form"]} onChange={filterFunction}>
            {renderGetCoursesInputs()}
          </form>
        )}
        <div>
          <div className={classes["courses"]}>
            {data ? (
              data.courses.map((item) => (
                <div
                  key={item.id}
                  onClick={() => courseDetailsHandler(item.id)}
                  className={classes["course"]}
                >
                  <div>
                    <div
                      className={classes["course-description__image-container"]}
                    >
                      <img src={image} alt="image" />
                    </div>
                    <h2 className={classes["course-description__title"]}>
                      {item.name}
                    </h2>
                    <div
                      className={
                        classes["course-description__category-container"]
                      }
                    >
                      <span className={classes["category-title"]}></span>
                      <span className={classes["category-value"]}>
                        {item.category}
                      </span>
                    </div>
                    {item.person.map((person) => (
                      <div
                        className={
                          classes["course-description__teacher-container"]
                        }
                        key={person.id}
                      >
                        {getTitle(person.title)} {person.lastName}{" "}
                        {person.firstName}
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <Card>
                <div>
                  <LoadingSpinner />
                </div>
              </Card>
            )}
          </div>
        </div>
        {!data && <h3>Nic nie znaleziono</h3>}
      </section>
    </>
  );
};

export default StartingPageContent;
