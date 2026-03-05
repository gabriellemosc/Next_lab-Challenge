import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "../pages/Login"

function AppRoutes() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/auth/login" element={<Login />} /> {/* rota login */}

      </Routes>

    </BrowserRouter>

  )
}

export default AppRoutes