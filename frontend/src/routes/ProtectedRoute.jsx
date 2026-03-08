import { Navigate } from "react-router-dom" 

export default function ProtectedRoute({ children, role }) {

  // take user localStorage
  const user = JSON.parse(localStorage.getItem("user"))

  if (!user) {
    return <Navigate to="/login" /> // send to login
  }

  if (role && user.role !== role) {
    return <Navigate to="/" /> 
  }

  return children
}