import classes from "./StartingPage.module.css";
import useHttp from "../../hooks/use-http";
import { studentTest } from "../../lib/test-api";
import authHeader from "../../lib/auth-header";

const StartingPageContent = () => {
  const { sendRequest } = useHttp(studentTest);

  const testFunction = (event) => {
    event.preventDefault();
    sendRequest(authHeader());
  };

  return (
    <section className={classes.starting}>
      <h1>Welcome on Board!</h1>
      <form onSubmit={testFunction}>
        <button type="submit">Submit</button>
      </form>
    </section>
  );
};

export default StartingPageContent;
