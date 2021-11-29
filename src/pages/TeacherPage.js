import TeacherPanel from "../components/Teacher/TeacherPanel";
import { Route, Routes } from "react-router-dom";
import MyCourses from "../components/Teacher/Courses/MyCourses";
import CourseDetails from "../components/Teacher/Courses/CourseDetails";
import LessonDetails from "../components/Teacher/Lessons/LessonDetails";
import ExamDetails from "../components/Teacher/Exams/ExamDetails";

const TeacherPage = () => {
  return (
    <Routes>
      <Route path="/courses/:courseId/lessons/:lessonId/*" element={<LessonDetails />} />
      <Route path="/courses/:courseId/exams/:examId/*" element={<ExamDetails />} />
      <Route path="/courses/:courseId/*" element={<CourseDetails />} />
      <Route path="/my-courses" element={<MyCourses />} />
      <Route path="/" element={<TeacherPanel />} />
      
    </Routes>
  );
};

export default TeacherPage;
