import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "../pages/Login"
import Upload from "../pages/Upload"
import Result from "../pages/Result"
import Thanks from "../pages/Thanks"
import Dashboard from "../pages/Dashboard"

function AppRoutes() {

  return (

    <BrowserRouter>

      <Routes>

      <Route path="/" element={<Navigate to="/auth/login" replace />} />
      <Route path="/auth/login" element={<Login />} />


        <Route path="/upload" element={<Upload />} />

        <Route path="/dashboard" element={<Dashboard />} />


        <Route path="/result" element={<Result />} />

        <Route path="/thanks" element={<Thanks />} />

      </Routes>

    </BrowserRouter>

  )
}

export default AppRoutes