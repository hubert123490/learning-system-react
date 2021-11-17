import "./App.css";
import Layout from "./components/Layout/Layout";
import { Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import StartingPageContent from "./components/StartingPage/StartingPage";
import ProfilePage from "./pages/ProfilePage";
import { useContext } from "react";
import AuthContext from "./store/auth-context";
import AuthFormPage from "./pages/AuthFormPage";

function App() {
  const authCtx = useContext(AuthContext)
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<StartingPageContent />} />
        <Route path="/auth" element={<AuthFormPage />} />
        {authCtx.isLoggedIn && <Route path="/profile" element={<ProfilePage />} />}
        {/* {<Route path="/*" element={<Navigate to="/" />} />} */}
        <Route path="*" element={<StartingPageContent />} />
      </Routes>
    </Layout>
  );
}

export default App;
