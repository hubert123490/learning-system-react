import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import useHttp from "../../hooks/use-http";
import { checkSubmission, makeSubmission } from "../../lib/api/submission-api";
import Card from "../UI/Card";
import classes from "./Submission.module.css"

const Submission = () => {
  const navigate = useNavigate();
  const params = useParams();
  const {
    sendRequest: checkSubmissionRequest,
    data: checkSubmissionData,
    error: checkSubmissionError,
    status: checkSubmissionStatus,
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
            navigate(`/student/courses/${params.courseId}/exams/${params.examId}/submissions/${makeSubmissionData.id}`);
        }
    }
    return checkSubmissionRequest
  }, [checkSubmissionRequest, makeSubmissionStatus])

  console.log(checkSubmissionData)

  const makeSubmissionHandler = (event) => {
    event.preventDefault();
    makeSubmissionRequest({
        courseId : params.courseId,
        examId : params.examId
    })
  }

  return <div className={classes.submission}>
      <Card>
          <div>
              {<h1>Witaj!</h1>}
              {checkSubmissionData && checkSubmissionData.status === "SUCCESS" && <form onSubmit={makeSubmissionHandler}><button>Przystąp do egzaminu</button></form>}
              {checkSubmissionData && checkSubmissionData.status === "ERROR" && <div><h3>Test zakończony pomyślnie</h3><div>{checkSubmissionData.message}</div></div>}
          </div>
      </Card>
  </div>
};

export default Submission;
