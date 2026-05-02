import { Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import  VerifyOTP  from "./pages/VerifyOTP"


function App() {

  return (
    <>
       <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
       </Routes>
    </>
  )
}

export default App
