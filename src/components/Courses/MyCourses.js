import classes from "./MyCourses.module.css";
import useHttp from "../../hooks/use-http";
import { getMyCourses } from "../../lib/course-api";
import { useEffect } from "react";
import LoadingSpinner from "../UI/LoadingSpinner";
import Card from "../UI/Card";
import { useNavigate } from "react-router";

const MyCourses = () => {
  const navigate = useNavigate();
  const { sendRequest, data } = useHttp(getMyCourses, true);

  const courseDetailsHandler = (courseId) => {
    navigate(`/courses/${courseId}`)
  };

  useEffect(() => {
    sendRequest();
    return sendRequest
  }, [sendRequest]);


  return (
    <section className={classes.myCourses}>
      <h1>Twoje kursy!</h1>
      {data ? (
        data.courses.map((item) => (
          <div key={item.id} onClick={() => {courseDetailsHandler(item.id)}} className={classes.course}>
            <Card >
              <h2>{item.name}</h2>
              <div>{item.category}</div>
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

export default MyCourses;
