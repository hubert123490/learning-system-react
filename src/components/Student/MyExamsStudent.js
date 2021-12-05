import { useNavigate } from "react-router";
import { getPendingExams } from "../../lib/api/exam-api";
import useHttp from "../../hooks/use-http";
import { useEffect } from "react";
import classes from "./MyExamsStudent.module.css"
import Card from "../UI/Card";
import LoadingSpinner from "../UI/LoadingSpinner";

const MyExamsStudent = () => {
    const navigate = useNavigate();
    const { sendRequest: getPendingExamsRequest, data: getPendingExamsData, error : getPendingExamsError } = useHttp(
        getPendingExams,
        true
      );
    
      useEffect(() => {
        getPendingExamsRequest();
    
        return getPendingExamsRequest;
      }, [getPendingExamsRequest]);
    
      const examDetailsHandler = (examId,courseId ) => {
        navigate(`/student/courses/${courseId}/exams/${examId}`);
      };
    
      console.log(getPendingExamsData)

      return (
        <section className={classes.myExams}>
          <h1>Twoje kursy!</h1>
          {getPendingExamsData ? (
            getPendingExamsData.map((item) => (
              <div key={item.id} className={classes.exam}>
                <Card>
                  <div
                    onClick={() => {
                        examDetailsHandler(item.id, item.courseId);
                    }}
                  >
                    <h2>{item.name}</h2>
                    <div>{item.category}</div>
                  </div>
                </Card>
              </div>
            ))
          ) : ( getPendingExamsError ? <div className={classes.error}><h1>{getPendingExamsError}</h1></div> :
            <Card>
              <div>
                <LoadingSpinner />
              </div>
            </Card>
          )}
        </section>
      );
}

export default MyExamsStudent;