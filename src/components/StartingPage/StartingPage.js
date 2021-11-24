import classes from "./StartingPage.module.css";
import useHttp from "../../hooks/use-http";
import { getAllCourses } from "../../lib/api/course-api";
import { useEffect } from "react";
import LoadingSpinner from "../UI/LoadingSpinner";
import Card from "../UI/Card";
import { useNavigate } from "react-router";

const StartingPageContent = () => {
  const navigate = useNavigate();
  const { sendRequest, data, } = useHttp(getAllCourses, true);

  const getTitle = title => {
    if(title === "Bachelor")
      return "Inżynier";
    else if (title === "Master")
      return "Doktor"
  }

  useEffect(() => {
    sendRequest();
    return sendRequest
  }, [sendRequest]);

  const courseDetailsHandler = (courseId) => {
    navigate(`/student/courses/${courseId}`);
  };

  return (
    <section className={classes.starting}>
      <h1>Aktualnie prowadzone kursy!</h1>
      {data ? (
        data.courses.map((item) => (
          <div key={item.id} onClick={() => courseDetailsHandler(item.id)} className={classes.course}>
            <Card >
              <h2>{item.name}</h2>
              <div>Kategoria kursu:</div>
              <div>{item.category}</div>
              <div>Prowadzony przez: </div>
              {item.person.map((person) => (
                <div key={person.id}>{getTitle(person.title)} {person.firstName} {person.lastName}</div>
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
    </section>
  );
};

export default StartingPageContent;
