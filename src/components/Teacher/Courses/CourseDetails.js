import { courseDetails } from "../../../lib/course-api";
import useHttp from "../../../hooks/use-http";
import { useEffect, useState } from "react";
import classes from "./CourseDetails.module.css"
import Card from "../../UI/Card";
import LoadingSpinner from "../../UI/LoadingSpinner";
import { Link } from "react-router-dom";
import { deleteLesson } from "../../../lib/lesson-api";


const CourseDetails = (props) => {
  const { sendRequest, data, status } = useHttp(courseDetails, true);
  const [showCreateLesson, setShowCreateLesson] = useState(true);
  const { sendRequest : deleteRequest, data : deleteData, status : deleteStatus} = useHttp(deleteLesson);


  useEffect(() => {
    console.log("effect");
    sendRequest(props.courseId);
    return sendRequest;
  }, [sendRequest, props.courseId, deleteStatus]);

  const testFunc = () => {
      console.log("asd")
  }


  return (
    <section className={classes.courseDetails}>
      {showCreateLesson && <Link style={{ textDecoration: 'none' }} to="create-lesson" ><button onClick={() => setShowCreateLesson(false)}>Stwórz nową lekcję</button></Link>}
      {!showCreateLesson && <Link style={{ textDecoration: 'none' }} to="" ><button onClick={() => setShowCreateLesson(true)}>Zamknji formularz</button></Link>}
      <hr/>
      {data && status==="completed" && (
        data.lessons.map((item) => (
          <div key={item.id}  className={classes.course}>
            <div className={classes.card} >
              <div onClick={testFunc}>
              <h2>{item.name}</h2>
              </div>
              
              <button onClick={() => {
                if (window.confirm(`Czy napewno chcesz usunąć ${item.name}?`))
                deleteRequest({courseId : props.courseId, lessonId : item.id})
              }}>Usuń lekcję</button>
            </div>
          </div>
        ))
      )} {status !== "completed" && (
        <Card>
          <div>
            <LoadingSpinner />
          </div>
        </Card>
      )}
      {!data && status === "completed" && 
      <h2>Pusto</h2>}
    </section>
  );
};

export default CourseDetails;
