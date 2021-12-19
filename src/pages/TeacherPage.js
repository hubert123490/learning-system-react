import TeacherPanel from "../components/Teacher/TeacherPanel";
import { Route, Routes } from "react-router-dom";
import MyCourses from "../components/Teacher/Courses/MyCourses";
import CourseDetails from "../components/Teacher/Courses/CourseDetails";
import LessonDetails from "../components/Teacher/Lessons/LessonDetails";
import ExamDetails from "../components/Teacher/Exams/ExamDetails";
import CheckSubmissions from "../components/Teacher/Submissions/CheckSubmissions";
import CheckSubmissionDetails from "../components/Teacher/Submissions/CheckSubmissionDetails";
import CheckExams from "../components/Teacher/Exams/CheckExams";
import GradeCourses from "../components/Teacher/Grades/GradeCourses";
import GradeTable from "../components/Teacher/Grades/GradeTable";
import Meeting from "../components/Teacher/Webex/Meeting";
import MeetingCourses from "../components/Teacher/Webex/MeetingCourses";
import Integration from "../components/Teacher/Webex/Integration";

const TeacherPage = () => {
  return (
    <Routes>
      <Route path="/webex/:courseId/create-meeting/*" element={<Meeting />} />
      <Route path="/webex/*" element={<MeetingCourses />} />
      <Route path="/webex-integration" element={<Integration />} />
      <Route path="/grades/:courseId/*" element={<GradeTable />} />
      <Route path="/grades/*" element={<GradeCourses />} />
      <Route
        path="/check-exams/courses/:courseId/exams/:examId/submissions/:submissionId/*"
        element={<CheckSubmissionDetails />}
      />
      <Route
        path="/check-exams/courses/:courseId/exams/:examId/submissions/*"
        element={<CheckSubmissions />}
      />
      <Route path="/check-exams/*" element={<CheckExams />} />
      <Route
        path="/courses/:courseId/exams/:examId/submissions/*"
        element={<CheckSubmissions />}
      />
      <Route
        path="/courses/:courseId/lessons/:lessonId/*"
        element={<LessonDetails />}
      />
      <Route
        path="/courses/:courseId/exams/:examId/*"
        element={<ExamDetails />}
      />
      <Route path="/courses/:courseId/*" element={<CourseDetails />} />
      <Route path="/courses" element={<MyCourses />} />
      <Route path="/teacher-panel" element={<TeacherPanel />} />
    </Routes>
  );
};

export default TeacherPage;
