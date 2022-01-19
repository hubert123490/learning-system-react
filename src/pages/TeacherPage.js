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
import AssignmentDetails from "../components/Teacher/Assignments/AssignmentDetails";
import ExamsPreviewCourses from "../components/Teacher/ExamsPreview/ExamsPreviewCourses";
import ExamsPreviewExams from "../components/Teacher/ExamsPreview/ExamsPreviewExams";
import ExamsPreviewSubmissions from "../components/Teacher/ExamsPreview/ExamsPreviewSubmissions";
import ExamsPreviewSubmissionDetails from "../components/Teacher/ExamsPreview/ExamsPreviewSubmissionDetails";
import AssignmentsPreviewCourses from "../components/Teacher/AssignmentsPreview/AssignmentsPreviewCourses";
import AssignmentsPreviewAssignments from "../components/Teacher/AssignmentsPreview/AssignmentsPreviewAssignments";
import AssignmentsPreviewSubmissions from "../components/Teacher/AssignmentsPreview/AssignmentsPreviewSubmissions";
import AssignmentsPreviewSubmissionDetails from "../components/Teacher/AssignmentsPreview/AssignmentsPreviewSubmissionDetails";
import CheckAssignments from "../components/Teacher/Assignments/CheckAssignments";
import CheckTaskSubmissions from "../components/Teacher/TaskSubmissions/CheckTaskSubmissions";
import CheckTaskSubmissionDetails from "../components/Teacher/TaskSubmissions/CheckTaskSubmissionDetails";

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
      <Route
        path="/courses/:courseId/assignments/:assignmentId/*"
        element={<AssignmentDetails />}
      />
      <Route
        path="/exams-preview/courses/*"
        element={<ExamsPreviewCourses />}
      />
      <Route
        path="/exams-preview/courses/:courseId/exams/*"
        element={<ExamsPreviewExams />}
      />
      <Route
        path="/exams-preview/courses/:courseId/exams/:examId/submissions/*"
        element={<ExamsPreviewSubmissions />}
      />
      <Route
        path="/exams-preview/courses/:courseId/exams/:examId/submissions/:submissionId/*"
        element={<ExamsPreviewSubmissionDetails />}
      />
      <Route
        path="/assignments-preview/courses/*"
        element={<AssignmentsPreviewCourses />}
      />
      <Route
        path="/assignments-preview/courses/:courseId/assignments/*"
        element={<AssignmentsPreviewAssignments />}
      />
      <Route
        path="/assignments-preview/courses/:courseId/assignments/:assignmentId/submissions/*"
        element={<AssignmentsPreviewSubmissions />}
      />
      <Route
        path="/assignments-preview/courses/:courseId/assignments/:assignmentId/submissions/:taskSubmissionId/*"
        element={<AssignmentsPreviewSubmissionDetails />}
      />
       <Route path="/check-assignments/*" element={<CheckAssignments />} />
       <Route
        path="/check-assignments/courses/:courseId/assignments/:assignmentId/submissions/*"
        element={<CheckTaskSubmissions />}
      />
       <Route
        path="/check-assignments/courses/:courseId/assignments/:assignmentId/submissions/:taskSubmissionId/*"
        element={<CheckTaskSubmissionDetails />}
      />
      <Route path="/courses/:courseId/*" element={<CourseDetails />} />
      <Route path="/courses" element={<MyCourses />} />
      <Route path="/teacher-panel" element={<TeacherPanel />} />
    </Routes>
  );
};

export default TeacherPage;
