import TeacherPanel from "../components/Teacher/TeacherPanel";
import { Route, Routes } from "react-router-dom";
import MyCourses from "../components/Teacher/Courses/MyCourses";
import CourseDetails from "../components/Teacher/Courses/CourseDetails";
import LessonDetails from "../components/Teacher/Lessons/LessonDetails";
import ExamDetails from "../components/Teacher/Exams/ExamDetails";
import CheckSubmissions from "../components/Teacher/Submissions/CheckSubmissions";
import CheckSubmissionDetails from "../components/Teacher/Submissions/CheckSubmissionDetails";
import CheckExams from "../components/Teacher/Exams/CheckExams";
import CheckCourses from "../components/Teacher/Courses/CheckCourses";
import GradeCourses from "../components/Teacher/Grades/GradeCourses";
import GradeTable from "../components/Teacher/Grades/GradeTable";

const TeacherPage = () => {
  return (
    <Routes>
       <Route path="/grades/:courseId/*" element={<GradeTable />} />
      <Route path="/grades/*" element={<GradeCourses />} />
      <Route path="/check-courses/:courseId/exams/:examId/submissions/:submissionId/*" element={<CheckSubmissionDetails />} />
      <Route path="/check-courses/:courseId/exams/:examId/submissions/*" element={<CheckSubmissions />} />
      <Route path="/check-courses/:courseId/exams/*" element={<CheckExams />} />
      <Route path="/check-courses/*" element={<CheckCourses />} />
      <Route path="/courses/:courseId/exams/:examId/submissions/*" element={<CheckSubmissions />} />
      <Route path="/courses/:courseId/lessons/:lessonId/*" element={<LessonDetails />} />
      <Route path="/courses/:courseId/exams/:examId/*" element={<ExamDetails />} />
      <Route path="/courses/:courseId/*" element={<CourseDetails />} />
      <Route path="/my-courses" element={<MyCourses />} />
      <Route path="/" element={<TeacherPanel />} />
    </Routes>
  );
};

export default TeacherPage;
