import { useState } from "react";
import classes from "./GradeDetails.module.css"

const GradeDetails = (props) => {
  const [showDetails, setShowDetails] = useState(false);

  const showDetailsHandler = () => {
    setShowDetails(!showDetails);
  };


  return (
    <>
      <tr>
        <td>{props.item.lastName}</td>
        <td>{props.item.firstName}</td>
        <td>{props.item.email}</td>
        <td>{props.item.studentPoints}</td>
        <td>{props.item.coursePoints}</td>
        <td className={`${props.item.grade === 2 ? classes["error"] : ""}`}>{props.item.grade === -1 ? "-" : props.item.grade}</td>
        <td>
          <button onClick={showDetailsHandler}>
            {showDetails ? "Zamknij" : "Szczegóły"}
          </button>
        </td>
      </tr>
      {showDetails && (
        <tr>
          <td colSpan="7">
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
                  <tr key={exam.examId} className={`${exam.status === "NOT_SUBMITTED" ? classes["error"] : ""}`}>
                    <td>{exam.examName}</td>
                    <td>{exam.studentPoints}</td>
                    <td>{exam.maxPoints}</td>
                    <td>{exam.status === "SUBMITTED" ? "pisano" : "nie pisano"}</td>
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
