import "./App.css";
import Layout from "./components/Layout/Layout";
import { Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import StartingPageContent from "./components/StartingPage/StartingPage";
import ProfilePage from "./pages/ProfilePage";
import { useContext, useState, useEffect } from "react";
import AuthContext from "./store/auth-context";
import AuthFormPage from "./pages/AuthFormPage";
import TeacherPage from "./pages/TeacherPage";
import MyCoursesPage from "./pages/MyCoursesPage";
import CourseDetailsPage from "./pages/CourseDetailsPage";

function App() {
  const authCtx = useContext(AuthContext)

  const [user] = useState(JSON.parse(localStorage.getItem("user")));
  const [showStudentContent, setShowStudentContent] = useState(false);
  const [showTeacherContent, setShowTeacherContent] = useState(false);

  const isLoggedIn = authCtx.isLoggedIn;

  useEffect(() => {
    if(user) {
    if(user.roles.includes("ROLE_STUDENT")) {
      setShowStudentContent(true);
    }
  
    if(user.roles.includes("ROLE_TEACHER")) {
      setShowTeacherContent(true);
    }
  }
  }, [user])

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<StartingPageContent />} />
        <Route path="/auth" element={<AuthFormPage />} />
        {isLoggedIn && <Route path="/profile" element={<ProfilePage />} />}
        {isLoggedIn  && showTeacherContent && <Route path="/teacher/*" element={<TeacherPage />} />}
        {isLoggedIn && (showTeacherContent || showStudentContent) && <Route path="/my-courses" element={<MyCoursesPage />} />}
        {isLoggedIn && (showTeacherContent || showStudentContent) && <Route path="/courses/:courseId/*" element={<CourseDetailsPage />} />}  
        <Route path="*" element={<StartingPageContent />} />
      </Routes>
    </Layout>
  );
}

export default App;
