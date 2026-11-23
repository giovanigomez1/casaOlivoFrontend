import { useAuth } from "../context/AuthContext"
import { Navigate, useNavigate, useLocation } from "react-router"



export default function AdminLogin() {

  const { status, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  async function loginUser() {
    await login('robertg@example.com', 'test123')
    navigate(location.state?.from?.pathname ?? '/admin', { replace: true })
  }

  if (status === 'authenticated') return <Navigate to='/admin' replace />

  return (
    <>
      <p>{status}</p>
      <button onClick={loginUser}>login</button>
    </>
  )
}