import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home/Home";
import FindDonor from "./pages/FindDonor/FindDonor";
import RegisterDonor from "./pages/RegisterDonor/RegisterDonor";
import EmergencyRequest from "./pages/EmergencyRequest/EmergencyRequest";
import ChatAssistant from "./pages/ChatAssistant/ChatAssistant";
import Admin from "./pages/AdminDashboard/Admin";
import DonorDashboard from "./pages/DonorDashboard/DonorDashboard";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout><Home /></MainLayout>} />
      <Route path="/find-donor" element={<MainLayout><FindDonor /></MainLayout>} />
      <Route path="/register" element={<MainLayout><RegisterDonor /></MainLayout>} />
      <Route path="/emergency" element={<MainLayout><EmergencyRequest /></MainLayout>} />
      <Route path="/ai-chat" element={<MainLayout><ChatAssistant /></MainLayout>} />
      <Route path="/admin" element={<MainLayout><Admin /></MainLayout>} />
      <Route 
  path="/donor-dashboard" 
  element={<MainLayout><DonorDashboard /></MainLayout>} 
/>
      <Route path="/login" element={<MainLayout><Login /></MainLayout>} />
      <Route path="/signup" element={<MainLayout><Signup /></MainLayout>} />
    </Routes>
      
  );
}

export default App;