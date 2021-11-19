import { Route, Routes } from "react-router";
import CreateCourse from "../components/Teacher/Courses/CreateCourse";
import TeacherPanel from "../components/Teacher/TeacherPanel";

const TeacherPage = () => {
  return (<>
    <TeacherPanel />
    <Routes>
      <Route path="/create-course" element={<CreateCourse />} />
    </Routes>
    </>
  );
};

export default TeacherPage;
