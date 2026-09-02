import {Route, Routes} from "react-router-dom";
import ForgotPassword from "./components/ForgotPassword";
import Pages from "./components/Pages"
import Login from "./components/Login";
import VerifyOTP from "./components/VerifyOTP";



const App = () => {
  return (
   <Routes>
    <Route path="/" element={<Pages />} />
    <Route path="/auth/login" element={<Login />} />
    <Route path="/auth/forgot-password" element={<ForgotPassword />} />
    <Route path="/auth/verify-otp" element={<VerifyOTP />} />
   </Routes>
  )
}

export default App