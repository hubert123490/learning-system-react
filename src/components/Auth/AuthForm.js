import React, { useState, useContext, useEffect } from "react";
import useForm from "../../hooks/use-form";
import { signinForm, signupForm } from "../../lib/forms/auth-form";
import useHttp from "../../hooks/use-http";
import { signUp, signIn } from "../../lib/api/auth-api";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./AuthForm.module.css";
import AuthContext from "../../store/auth-context";
import { useNavigate } from "react-router";
import { Form } from "react-bootstrap";

export default function AuthForm() {
  const nav = useNavigate();
  const authCtx = useContext(AuthContext);
  const [degree, setDegree] = useState("");
  const [systemRole, setSystemRole] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const {
    renderFormInputs: renderSignupFormInputs,
    isFormValid: isSignupFormValid,
  } = useForm(signupForm);
  const {
    renderFormInputs: renderSigninFormInputs,
    isFormValid: isSigninFormValid,
  } = useForm(signinForm);

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
      if (authCtx.isTeacher)
        nav("teacher/courses")
      else if (authCtx.isStudent)
        nav("/")
      
    }
  }, [authCtx, signInData, nav]);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (isLogin) {
      if (!isSigninFormValid) {
        return;
      }

      signInRequest({
        email: renderSigninFormInputs()[0].props.value,
        password: renderSigninFormInputs()[1].props.value,
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
      });
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

  return (
    <>
      <form className={classes.signupForm} onSubmit={submitHandler}>
        <h1>{isLogin ? "Logowanie" : "Rejestracja"}</h1>
        {!isLogin && signUpData ? (
          <h3 className={classes.success}>Pomyślnie stworzono nowe konto</h3>
        ) : (
          <>
            {isLogin && renderSigninFormInputs()}
            {!isLogin && renderSignupFormInputs()}
            {!isLogin && (
              <div>
                <label htmlFor="role-select">Wybierz rolę w systemie:</label>
                <Form.Select
                  value={systemRole}
                  onChange={handleSystemRoleChange}
                  name="roles"
                  id="role-select"
                  required
                >
                  <option value="">Wybierz rolę w systemie</option>
                  <option value="student">STUDENT</option>
                  <option value="teacher">NAUCZYCIEL</option>
                </Form.Select>
                <br />
                {systemRole === "teacher" && (
                  <>
                    <label htmlFor="degree-select">
                      Wybierz tytuł naukowy:
                    </label>
                    <Form.Select
                      value={degree}
                      onChange={handleDegreeChange}
                      name="degrees"
                      id="degree-select"
                      required
                    >
                      <option value="">Wybierz tytuł naukowy:</option>
                      {/* <option value="Student">Student</option> */}
                      <option value="Bachelor">Magister</option>
                      <option value="Master">Doktor</option>
                      <option value="Professor">Profesor</option>
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
              <button type="submit" disabled={!isSigninFormValid()}>
                {isLogin ? "Zaloguj się" : "Stwórz konto"}
              </button>
            )}
            {signUpStatus !== "pending" && !isLogin && (
              <button type="submit" disabled={!signupFormValidation()}>
                {isLogin ? "Zaloguj się" : "Stwórz konto"}
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
            {isLogin ? "Stwórz nowe konto" : "Powrót do logowania"}
          </button>
        </div>
      </form>
    </>
  );
}
