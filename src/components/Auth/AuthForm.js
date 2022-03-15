import React, { useState, useContext, useEffect } from "react";
import useForm from "../../hooks/use-form";
import {
  signinForm,
  signupForm,
  signupFormEn,
  signinFormEn,
} from "../../lib/forms/auth-form";
import useHttp from "../../hooks/use-http";
import { signUp, signIn } from "../../lib/api/auth-api";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./AuthForm.module.css";
import AuthContext from "../../store/auth-context";
import { useNavigate } from "react-router";
import { Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

export default function AuthForm() {
  const nav = useNavigate();
  const authCtx = useContext(AuthContext);
  const [degree, setDegree] = useState("");
  const [systemRole, setSystemRole] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const { t } = useTranslation();
  const {
    renderFormInputs: renderSignupFormInputs,
    isFormValid: isSignupFormValid,
  } = useForm(signupForm);
  const {
    renderFormInputs: renderSignupFormInputsEn,
    isFormValid: isSignupFormValidEn,
  } = useForm(signupFormEn);
  const {
    renderFormInputs: renderSigninFormInputs,
    isFormValid: isSigninFormValid,
  } = useForm(signinForm);
  const {
    renderFormInputs: renderSigninFormInputsEn,
    isFormValid: isSigninFormValidEn,
  } = useForm(signinFormEn);

  const {
    sendRequest: signUpRequest,
    status: signUpStatus,
    data: signUpData,
    error: signUpError,
  } = useHttp(signUp);

  const {
    sendRequest: signInRequest,
    status: signInStatus,
    data: signInData,
    error: signInError,
  } = useHttp(signIn);

  useEffect(() => {
    if (signInData) {
      authCtx.login(signInData);
      if (authCtx.isTeacher) nav("teacher/courses");
      else if (authCtx.isStudent) nav("/");
    }
  }, [authCtx, signInData, nav]);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (i18next.language === "pl") {
      if (isLogin) {
        if (!isSigninFormValid) {
          return;
        }

        signInRequest({
          email: renderSigninFormInputs()[0].props.value,
          password: renderSigninFormInputs()[1].props.value,
          error: t("Auth__ErrorSignIn")
        });
        if (signInData) {
          authCtx.login(signInData.token);
        }
      } else {
        if (!isSignupFormValid) {
          return;
        }
        let role = systemRole === "student" ? "student" : systemRole;
        signUpRequest({
          firstName: renderSignupFormInputs()[0].props.value,
          lastName: renderSignupFormInputs()[1].props.value,
          email: renderSignupFormInputs()[2].props.value,
          password: renderSignupFormInputs()[4].props.value,
          title: role === "student" ? "Student" : degree,
          role: [role],
          error: t("Auth__ErrorSignUp")
        });
      }
    } else if (i18next.language === "en") {
      if (isLogin) {
        if (!isSigninFormValidEn) {
          return;
        }

        signInRequest({
          email: renderSigninFormInputsEn()[0].props.value,
          password: renderSigninFormInputsEn()[1].props.value,
          error: t("Auth__ErrorSignIn")
        });
        if (signInData) {
          authCtx.login(signInData.token);
        }
      } else {
        if (!isSignupFormValidEn) {
          return;
        }
        let role = systemRole === "student" ? "student" : systemRole;
        signUpRequest({
          firstName: renderSignupFormInputsEn()[0].props.value,
          lastName: renderSignupFormInputsEn()[1].props.value,
          email: renderSignupFormInputsEn()[2].props.value,
          password: renderSignupFormInputsEn()[4].props.value,
          title: role === "student" ? "Student" : degree,
          role: [role],
          error: t("Auth__ErrorSignUp")
        });
      }
    }
  };

  const handleDegreeChange = (event) => {
    setDegree(event.target.value);
  };

  const handleSystemRoleChange = (event) => {
    setSystemRole(event.target.value);
  };

  const signupFormValidation = () => {
    if (systemRole === "student" && isSignupFormValid()) return true;
    else if (systemRole !== "" && degree !== "" && isSignupFormValid())
      return true;
    else return false;
  };

  const signupFormValidationEn = () => {
    if (systemRole === "student" && isSignupFormValidEn()) return true;
    else if (systemRole !== "" && degree !== "" && isSignupFormValidEn())
      return true;
    else return false;
  };

  return (
    <>
      <form className={classes.signupForm} onSubmit={submitHandler}>
        <h1>{isLogin ? t("Auth__SignInTitle") : t("Auth__SignUpTitle")}</h1>
        {!isLogin && signUpData ? (
          <h3 className={classes.success}>{t("Auth__AccountCreated")}</h3>
        ) : (
          <>
            {isLogin && i18next.language === "pl" && renderSigninFormInputs()}
            {isLogin && i18next.language === "en" && renderSigninFormInputsEn()}
            {!isLogin && i18next.language === "pl" && renderSignupFormInputs()}
            {!isLogin &&
              i18next.language === "en" &&
              renderSignupFormInputsEn()}
            {!isLogin && (
              <div>
                <label htmlFor="role-select">
                  {t("Auth__ChooseSystemRole")}
                </label>
                <Form.Select
                  value={systemRole}
                  onChange={handleSystemRoleChange}
                  name="roles"
                  id="role-select"
                  required
                >
                  <option value="">{t("Auth__ChooseSystemRole")}</option>
                  <option value="student">{t("Auth__Student")}</option>
                  <option value="teacher">{t("Auth__Teacher")}</option>
                </Form.Select>
                <br />
                {systemRole === "teacher" && (
                  <>
                    <label htmlFor="degree-select">
                      {t("Auth__ChooseAcademicTitle")}
                    </label>
                    <Form.Select
                      value={degree}
                      onChange={handleDegreeChange}
                      name="degrees"
                      id="degree-select"
                      required
                    >
                      <option value="">{t("Auth__ChooseAcademicTitle")}</option>
                      {/* <option value="Student">Student</option> */}
                      <option value="Bachelor">{t("Auth__Master")}</option>
                      <option value="Master">{t("Auth__PHD")}</option>
                      <option value="Professor">{t("Auth__Professor")}</option>
                    </Form.Select>
                  </>
                )}
                <br />
              </div>
            )}
            {isLogin && signInError && (
              <div className={classes.error}>{signInError}</div>
            )}
            {!isLogin && signUpError && (
              <div className={classes.error}>{signUpError}</div>
            )}

            {signInStatus !== "pending" && isLogin && (
              i18next.language === "pl" ? <button type="submit" disabled={!isSigninFormValid()}>
                {isLogin ? t("Auth__SignInTitle") : t("Auth__SignUpTitle")}
              </button> : <button type="submit" disabled={!isSigninFormValidEn()}>
                {isLogin ? t("Auth__SignInTitle") : t("Auth__SignUpTitle")}
              </button>
            )}
            {signUpStatus !== "pending" && !isLogin && (
              i18next.language === "pl" ? <button type="submit" disabled={!signupFormValidation()}>
                {isLogin ? t("Auth__SignInTitle") : t("Auth__SignUpTitle")}
              </button> : <button type="submit" disabled={!signupFormValidationEn()}>
                {isLogin ? t("Auth__SignInTitle") : t("Auth__SignUpTitle")}
              </button>
            )}

            {signUpStatus === "pending" || signInStatus === "pending" ? (
              <LoadingSpinner />
            ) : (
              ""
            )}
          </>
        )}
        <div className={classes.actions}>
          <button
            type="button"
            onClick={switchAuthModeHandler}
            style={{ width: "100%", marginTop: "1em" }}
          >
            {isLogin ? t("Auth__CreateNewAccount") : t("Auth__ReturnToSignIn")}
          </button>
        </div>
      </form>
    </>
  );
}
