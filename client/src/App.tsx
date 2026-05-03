import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import VerifyOTP from "./pages/VerifyOTP";
import Dashboard from "./pages/Dashboard";
import Landing from "./pages/Landing";
import PrivacyPolicy from "./components/PrivacyPolicy";
import Feedback from "./components/Feedback";
import Help from "./components/Help";
import VoidPage from "./pages/VoidPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/help" element={<Help />} />
        <Route path="*" element={<VoidPage />} />
      </Routes>
    </>
  );
}

export default App;
