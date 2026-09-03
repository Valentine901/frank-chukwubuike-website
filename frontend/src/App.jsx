import {Route, Routes} from "react-router-dom";
import ForgotPassword from "./components/ForgotPassword";
import Pages from "./components/Pages"
import Login from "./components/Login";
import VerifyOTP from "./components/VerifyOTP";
import AdminDashboard from "./admin/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import PasswordReset from "./components/PasswordReset";


const App = () => {
  return (
   <Routes>
    <Route path="/" element={<Pages />} />
    <Route path="/auth/login" element={<Login />} />
    <Route path="/auth/forgot-password" element={<ForgotPassword />} />
    <Route path="/auth/verify-otp" element={<VerifyOTP />} />
    <Route path="/auth/password-reset" element={<PasswordReset />} />
    <Route path="/auth/admin-dashboard" element={
      <ProtectedRoute>
        <AdminDashboard />
      </ProtectedRoute>
    } />
   </Routes>
  )
}

export default App