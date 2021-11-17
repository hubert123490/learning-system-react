import classes from "./StartingPage.module.css";
import useHttp from "../../hooks/use-http";
import { getAllCourses } from "../../lib/course-api";
import { useEffect } from "react";
import LoadingSpinner from "../UI/LoadingSpinner";
import Card from "../UI/Card";

const StartingPageContent = () => {
  const { sendRequest, data, error, status } = useHttp(getAllCourses, true);

  const testFunc = () => {
    console.log("test");
  };

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  console.log(data);

  return (
    <section className={classes.starting}>
      <h1>Welcome on Board!</h1>
      {data ? (
        data.courses.map((item) => (
          <div key={item.id} onClick={testFunc} className={classes.course}>
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

export default StartingPageContent;
