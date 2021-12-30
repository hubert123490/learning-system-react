import { Routes, Route } from "react-router";
import CourseDetailsStudent from "../components/Student/CourseDetailsStudent";
import LessonDetailsStudent from "../components/Student/LessonDetailsStudent";
import MyCoursesStudent from "../components/Student/MyCoursesStudent";
import ExamDetailsStudent from "../components/Student/ExamDetailsStudent";
import Submission from "../components/Student/Submission";
import MyExamsStudent from "../components/Student/MyExamsStudent";
import GradeStudent from "../components/Student/Grades/GradeStudent"
import AssignmentDetailsStudent from "../components/Student/Assignments/AssignmentDetailsStudent";

const StudentPage = () => {
  return (
    <Routes>
      <Route path="/grades" element={<GradeStudent />} />
      <Route path="/my-courses" element={<MyCoursesStudent />} />
      <Route path="/courses/:courseId/*" element={<CourseDetailsStudent />} />
      <Route
        path="/courses/:courseId/lessons/:lessonId/*"
        element={<LessonDetailsStudent />}
      />
      <Route
        path="/courses/:courseId/exams/:examId/*"
        element={<Submission />}
      />
       <Route
        path="/courses/:courseId/assignments/:assignmentId/*"
        element={<AssignmentDetailsStudent />}
      />
      <Route
      path="/courses/:courseId/exams/:examId/submissions/:submissionId/*"
      element={<ExamDetailsStudent />}
      />
      <Route
      path="/pending-exams/*"
      element={<MyExamsStudent />}
      />
    </Routes>
  );
};

export default StudentPage;
