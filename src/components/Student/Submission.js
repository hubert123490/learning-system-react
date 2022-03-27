import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router";
import useHttp from "../../hooks/use-http";
import { checkSubmission, makeSubmission } from "../../lib/api/submission-api";
import Card from "../UI/Card";
import classes from "./Submission.module.css"

const Submission = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const params = useParams();
  const {
    sendRequest: checkSubmissionRequest,
    data: checkSubmissionData,
    error: checkSubmissionError,
  } = useHttp(checkSubmission, true);
  const {
      sendRequest: makeSubmissionRequest,
      data: makeSubmissionData,
      error: makeSubmissionError,
      status: makeSubmissionStatus
  } = useHttp(makeSubmission);

  useEffect(() => {
    checkSubmissionRequest({
        courseId : params.courseId,
        examId : params.examId
    })
    if(makeSubmissionData){
        if(makeSubmissionData.status === "SUCCESS"){
            navigate(`submissions/${makeSubmissionData.id}`);
        }
    }
    return checkSubmissionRequest
  }, [checkSubmissionRequest, makeSubmissionStatus, makeSubmissionData, params, navigate])

  const makeSubmissionHandler = (event) => {
    event.preventDefault();
    makeSubmissionRequest({
        courseId : params.courseId,
        examId : params.examId
    })
  }


  console.log(checkSubmissionData)

  const redirectToPendingExam = (id) => {
    if(checkSubmissionData.submissionId)
    navigate(`submissions/${checkSubmissionData.submissionId}`);
  }

  const redirectHandler = (event, id) => {
    event.preventDefault();
    redirectToPendingExam()
  }

  return <div className={classes["submission"]}>
      <Card>
          <div>
              {<h1>{t("Student__Submission_Welcome")}</h1>}
              {checkSubmissionData && checkSubmissionData.status === "SUCCESS" && <div>{t("Student__Submission_Start")} {checkSubmissionData.startDate.split("T")[0]} {t("Student__Submission_At")} {checkSubmissionData.startDate.split("T")[1]}</div>}<br/>
              {/* {makeSubmissionData && makeSubmissionData.status === "ERROR" && <div className={classes["error"]}><h3>{makeSubmissionData.message}</h3></div>} */}
              {checkSubmissionData && checkSubmissionData.status === "SUCCESS"  && <form onSubmit={makeSubmissionHandler}><button>{t("Student__Submission_Proceed")}</button></form>}
              {checkSubmissionData && checkSubmissionData.status === "ERROR" && <div><h3>{t("Student__Submission_Ended")}</h3></div>}
              {checkSubmissionData && checkSubmissionData.status === "PENDING" && <div><h3>{t("Student__Submission_Check")}</h3></div>}
              {checkSubmissionData && checkSubmissionData.status === "CHECKING" && <div><h3>{t("Student__Submission_Check")}</h3></div>}
              {checkSubmissionData && checkSubmissionData.status === "NOT_STARTED" && <div>{t("Student__Submission_Start")} {checkSubmissionData.startDate.split("T")[0]} {t("Student__Submission_At")} {checkSubmissionData.startDate.split("T")[1]}</div>}
              {checkSubmissionData && checkSubmissionData.status === "ENDED" && <div><h3>{t("Student__Submission_CannotProceed")}</h3></div>}
              {checkSubmissionData && checkSubmissionData.status === "PENDING"  && <form onSubmit={(event) => redirectHandler(event, checkSubmissionData.submissionId)}><button>{t("Student__Submission_GoBack")}</button></form>}
              {checkSubmissionError && <div className={classes["error"]}><h3>Error</h3></div>}
              {makeSubmissionError && <div className={classes["error"]}><h3>Error</h3></div>}
          </div>
      </Card>
  </div>
};

export default Submission;
