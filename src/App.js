import LandingPage from "./components/LandingPage/LandingPage";
import Layout from "./components/Layout/Layout";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <Layout>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </Layout>
  );
}

export default App;
