import classes from "./StartingPage.module.css";
import useHttp from "../../hooks/use-http";
import { getAllCourses } from "../../lib/api/course-api";
import { useEffect, useState } from "react";
import LoadingSpinner from "../UI/LoadingSpinner";
import Card from "../UI/Card";
import { useLocation, useNavigate } from "react-router";
import useForm from "../../hooks/use-form";
import { getCoursesForm } from "../../lib/forms/course-form";
import { useSearchParams } from "react-router-dom";

const StartingPageContent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let identifier;
  const [searchParams, setSearchParams] = useSearchParams({
    name: "",
    category: "",
    lastName: "",
  });
  const [showFilter, setShowFilter] = useState(false);
  const { renderFormInputs: renderGetCoursesInputs } = useForm(getCoursesForm);
  const { sendRequest, data, status } = useHttp(getAllCourses, true);

  const getTitle = (title) => {
    if (title === "Bachelor") return "Inżynier";
    else if (title === "Master") return "Doktor";
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
    setShowFilter(!showFilter);
  };

  const testFunc = (event) => {
    event.preventDefault();
    setSearchParams({
      name: renderGetCoursesInputs()[0].props.value,
      category: renderGetCoursesInputs()[1].props.value,
      lastName: renderGetCoursesInputs()[2].props.value,
    });
  };

  return (
    <section className={classes.starting}>
      <h1>Aktualnie prowadzone kursy!</h1>
      <button onClick={showFilterHandler}>
        {showFilter ? "Zamknji filter" : "Filtruj"}
      </button>
      {showFilter && (
        <form className={classes.form} onChange={testFunc}>
          {renderGetCoursesInputs()}
        </form>
      )}
      <hr />
      {data ? (
        data.courses.map((item) => (
          <div
            key={item.id}
            onClick={() => courseDetailsHandler(item.id)}
            className={classes.course}
          >
            <Card>
              <h2>{item.name}</h2>
              <div>Kategoria kursu:</div>
              <div>{item.category}</div>
              <div>Prowadzony przez: </div>
              {item.person.map((person) => (
                <div key={person.id}>
                  {getTitle(person.title)} {person.firstName} {person.lastName}
                </div>
              ))}
            </Card>
          </div>
        ))
      ) : (
        <Card>
          <div>
            <LoadingSpinner />
          </div>
        </Card>
      )}
      {!data && <h3>Nic nie znaleziono</h3>}
    </section>
  );
};

export default StartingPageContent;
