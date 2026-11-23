import { useAuth } from "../context/AuthContext"


export default function AdminDashboard() {

  const { logout } = useAuth()


  return (
    <div>
      <h1 className="container">AdminDashboard</h1>
      <button type="button" onClick={logout}>Logout</button>
    </div>
  )
}