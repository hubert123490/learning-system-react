import { useState } from "react";
import classes from "./GradeDetailsStudent.module.css"

const GradeDetailsStudent = (props) => {
    const [showDetails, setShowDetails] = useState(false);

    const showDetailsHandler = () => {
      setShowDetails(!showDetails);
    };
  
    return (
      <>
        <tr>
          <td>{props.item.courseName}</td>
          <td>{props.item.studentPoints}</td>
          <td>{props.item.coursePoints}</td>
          <td>{props.item.grade}</td>
          <td>
            <button onClick={showDetailsHandler}>
              {showDetails ? "Zamknji" : "Szczegóły"}
            </button>
          </td>
        </tr>
        {showDetails && (
          <tr>
            <td colSpan="7">
              <table className={classes.details}>
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
                    <tr key={exam.examId} className={`${exam.status == "NOT_SUBMITTED" ? classes.error : ""}`}>
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
}

export default GradeDetailsStudent;