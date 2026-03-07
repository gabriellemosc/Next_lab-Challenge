import { Navigate } from "react-router-dom" // componente que redireciona rota

export default function ProtectedRoute({ children, role }) {

  // pega o usuário salvo no localStorage
  const user = JSON.parse(localStorage.getItem("user"))

  // se não existir usuário logado
  if (!user) {
    return <Navigate to="/login" /> // manda para tela de login
  }

  // se a rota exige uma role e o usuário não possui
  if (role && user.role !== role) {
    return <Navigate to="/" /> // bloqueia acesso e manda para home
  }

  // se passou pelas verificações permite acessar a página
  return children
}