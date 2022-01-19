import { useState } from "react";
import classes from "./GradeDetails.module.css";

const GradeDetails = (props) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showAssignmentDetails, setShowAssignmentDetails] = useState(false);

  const showDetailsHandler = () => {
    setShowDetails(!showDetails);
  };

  const showAssignmentDetailsHandler = () => {
    setShowAssignmentDetails((prevState) => !prevState);
  };

  return (
    <>
      <tr>
        <td>{props.item.lastName}</td>
        <td>{props.item.firstName}</td>
        <td>{props.item.email}</td>
        <td>{props.item.studentExamPoints}</td>
        <td>{props.item.courseExamPoints}</td>
        <td className={`${props.item.examGrade === 2 ? classes["error"] : ""}`}>
          {props.item.examGrade === -1 ? "-" : props.item.examGrade}
        </td>
        <td>{props.item.studentAssignmentPoints}</td>
        <td>{props.item.courseAssignmentPoints}</td>
        <td
          className={`${
            props.item.assignmentGrade === 2 ? classes["error"] : ""
          }`}
        >
          {props.item.assignmentGrade === -1 ? "-" : props.item.assignmentGrade}
        </td>
        <td>
          <button onClick={showDetailsHandler}>
            {showDetails ? "Zamknij" : "Szczegóły"}
          </button>
        </td>
        <td>
          <button onClick={showAssignmentDetailsHandler}>
            {showAssignmentDetails ? "Zamknij" : "Szczegóły"}
          </button>
        </td>
      </tr>
      {showDetails && (
        <tr>
          <td colSpan="11">
            <table className={classes["details"]}>
              <thead>
                <tr>
                  <th>Nazwa egzaminu</th>
                  <th>Uzyskana liczba punktów</th>
                  <th>Maksymalna liczba punktów</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {props.item.exams.map((exam) => (
                  <tr
                    key={exam.examId}
                    className={`${
                      exam.status === "NOT_SUBMITTED" ? classes["error"] : ""
                    }`}
                  >
                    <td>{exam.examName}</td>
                    <td>{exam.studentPoints}</td>
                    <td>{exam.maxPoints}</td>
                    <td>
                      {exam.status === "SUBMITTED" ? "pisano" : "nie pisano"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </td>
        </tr>
      )}
      {showAssignmentDetails && (
        <tr>
          <td colSpan="11">
            <table className={classes["details"]}>
              <thead>
                <tr>
                  <th>Nazwa pracy</th>
                  <th>Uzyskana liczba punktów</th>
                  <th>Maksymalna liczba punktów</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {props.item.assignments.map((assignment) => (
                  <tr
                    key={assignment.assignmentId}
                    className={`${
                      assignment.status === "NOT_SUBMITTED"
                        ? classes["error"]
                        : ""
                    }`}
                  >
                    <td>{assignment.assignmentName}</td>
                    <td>{assignment.studentPoints}</td>
                    <td>{assignment.maxPoints}</td>
                    <td>
                      {assignment.status === "SUBMITTED"
                        ? "pisano"
                        : "nie pisano"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </td>
        </tr>
      )}
    </>
  );
};

export default GradeDetails;
