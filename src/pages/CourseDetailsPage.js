import CourseDetails from "../components/Teacher/Courses/CourseDetails";
import { useParams } from "react-router";
import { Route, Routes } from "react-router-dom";
import classes from "./CourseDetailsPage.module.css";
import CreateLesson from "../components/Teacher/Lessons/CreateLesson";

const CourseDetailsPage = () => {
  const params = useParams();
  return (
    <div className={classes.courseDetails}>
      <h1 style={{ fontSize: "3rem" }}>Twoje lekcje!</h1>
      <Routes>
        <Route
          path="/create-lesson"
          element={<CreateLesson courseId={params.courseId} />}
        />
      </Routes>
      <CourseDetails courseId={params.courseId} />
    </div>
  );
};

export default CourseDetailsPage;
