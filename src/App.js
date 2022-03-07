import "./App.css";
import Layout from "./components/Layout/Layout";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import StartingPageContent from "./components/StartingPage/StartingPage";
import ProfilePage from "./pages/ProfilePage";
import { useContext } from "react";
import AuthContext from "./store/auth-context";
import AuthFormPage from "./pages/AuthFormPage";
import TeacherPage from "./pages/TeacherPage";
import StudentPage from "./pages/StudentPage";
// import { useTranslation } from "react-i18next";

function App() {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  // const { t } = useTranslation();

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<StartingPageContent />} />
        <Route path="/auth" element={<AuthFormPage />} />
        {isLoggedIn && <Route path="/profile" element={<ProfilePage />} />}
        {isLoggedIn && authCtx.isTeacher && (
          <Route path="/teacher/*" element={<TeacherPage />} />
        )}
        {isLoggedIn && (authCtx.isTeacher || authCtx.isStudent) && (
          <Route path="/student/*" element={<StudentPage />} />
        )}
        <Route path="*" element={<AuthFormPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
