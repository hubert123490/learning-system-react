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


  const redirectToPendingExam = (id) => {
    console.log(id)
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
              {<h1>Witaj!</h1>}
              {checkSubmissionData && checkSubmissionData.status === "SUCCESS" && <div>Egzamin zaczyna się: {checkSubmissionData.startDate.split("T")[0]} o godzinie {checkSubmissionData.startDate.split("T")[1]}</div>}<br/>
              {makeSubmissionData && makeSubmissionData.status === "ERROR" && <div className={classes["error"]}><h3>{makeSubmissionData.message}</h3></div>}
              {checkSubmissionData && checkSubmissionData.status === "SUCCESS"  && <form onSubmit={makeSubmissionHandler}><button>Przystąp do egzaminu</button></form>}
              {checkSubmissionData && checkSubmissionData.status === "ERROR" && <div><h3>Test zakończony pomyślnie</h3><div>{checkSubmissionData.message}</div></div>}
              {checkSubmissionData && checkSubmissionData.status === "PENDING" && <div><h3>Test jest w trakcie sprawdzania</h3><div>{checkSubmissionData.message}</div></div>}
              {checkSubmissionData && checkSubmissionData.status === "CHECKING" && <div><h3>Test jest w trakcie sprawdzania</h3><div>{checkSubmissionData.message}</div></div>}
              {checkSubmissionData && checkSubmissionData.status === "NOT_STARTED" && <div>Egzamin zaczyna się: {checkSubmissionData.startDate.split("T")[0]} o godzinie {checkSubmissionData.startDate.split("T")[1]}</div>}
              {checkSubmissionData && checkSubmissionData.status === "ENDED" && <div><h3>Egzamin zakończył się</h3><div>{checkSubmissionData.message}</div></div>}
              {checkSubmissionData && checkSubmissionData.status === "PENDING"  && <form onSubmit={(event) => redirectHandler(event, checkSubmissionData.submissionId)}><button>Powrót do egzaminu</button></form>}
              {checkSubmissionError && <div className={classes["error"]}><h3>{checkSubmissionError}</h3></div>}
              {makeSubmissionError && <div className={classes["error"]}><h3>{makeSubmissionError}</h3></div>}
          </div>
      </Card>
  </div>
};

export default Submission;
