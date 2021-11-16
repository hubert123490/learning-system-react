import "./App.css";
import Layout from "./components/Layout/Layout";
import { Routes, Route } from "react-router-dom";
import AuthForm from "./components/Auth/AuthForm";
import 'bootstrap/dist/css/bootstrap.min.css';
import StartingPageContent from "./components/StartingPage/StartingPage";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<StartingPageContent />} />
        <Route path="/auth" element={<AuthForm />} />
        {/* {<Route path="/*" element={<Navigate to="/" />} />} */}
      </Routes>
    </Layout>
  );
}

export default App;
