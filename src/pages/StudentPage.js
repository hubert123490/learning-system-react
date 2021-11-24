import { Routes, Route } from "react-router";
import MyCourses from "../components/Teacher/Courses/MyCourses";
import CourseDetailsStudent from "../components/Student/CourseDetailsStudent"
import LessonDetailsStudent from "../components/Student/LessonDetailsStudent"

const StudentPage = () => {
    return (
    <Routes>
         <Route path="/my-courses" element={<MyCourses />} />
         <Route path="/courses/:courseId/*" element={<CourseDetailsStudent />} />
         <Route path="/courses/:courseId/lessons/:lessonId/*" element={<LessonDetailsStudent />} />
    </Routes>
    )
}

export default StudentPage;