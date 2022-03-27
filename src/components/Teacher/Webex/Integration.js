import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { webexIntegration } from "../../../lib/api/webex-api";
import useHttp from "../../../hooks/use-http";
import classes from "./Integration.module.css";
import AuthContext from "../../../store/auth-context";
import { useContext } from "react";
import { useTranslation } from "react-i18next";

const Integration = () => {
  const { t } = useTranslation();
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

  return (
    <div className={classes["integration"]}>
      <div className={classes["card"]}>
        <h1>{t("Teacher__Webex_Integration")}</h1>
        {integrationError && (
          <>
            <div className={classes["error"]}>{integrationError}</div>
            <div>{t("Teacher__Webex_TryAgain")}</div>
          </>
        )}
        <form className={classes["form"]} onSubmit={integrationHandler}>
          <button type="submit">{t("Teacher__Webex_GoToCourses")}</button>
        </form>
      </div>
    </div>
  );
};

export default Integration;
