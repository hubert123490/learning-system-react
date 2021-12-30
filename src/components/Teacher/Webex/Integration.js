import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { webexIntegration } from "../../../lib/api/webex-api";
import useHttp from "../../../hooks/use-http";
import classes from "./Integration.module.css";
import AuthContext from "../../../store/auth-context";
import { useContext } from "react";

const Integration = () => {
  const location = useLocation();
  const nav = useNavigate();
  const authCtx = useContext(AuthContext);
  const queryParams = new URLSearchParams(location.search);
  const {
    sendRequest: integrationRequest,
    data: integrationData,
    error: integrationError,
  } = useHttp(webexIntegration);

  const integrationHandler = (event) => {
    event.preventDefault();
    integrationRequest({
      code: queryParams.get("code"),
    });
  };

  useEffect(() => {
    if (integrationData) {
      authCtx.webexIntegrationHandler(integrationData);
      nav("/teacher/webex");
    }
  }, [authCtx, integrationData, nav]);

  console.log(integrationData)
  console.log(integrationError)
  console.log(queryParams.get("code"))

  return (
    <div className={classes["integration"]}>
      <div className={classes["card"]}>
        <h1>Integracja</h1>
        {integrationError && <><div className={classes["error"]}>{integrationError}</div><div>Spróbuj ponownie</div></>}
        <form className={classes["form"]} onSubmit={integrationHandler}>
          <button type="submit">Przejdź do kursów</button>
        </form>
      </div>
    </div>
  );
};

export default Integration;
