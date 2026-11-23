import { useAuth } from "../../context/AuthContext"
import { Outlet, useLocation, Navigate } from "react-router"
import Spinner from "../ui/Spinner"
import styles from './ProtectedRoute.module.css'

export default function ProtectedRoute() {
  const { status } = useAuth()
  const location = useLocation()

  if (status === 'checking') {
    return (
      <div className={styles.protected}>
        <Spinner label='Verificando sesión…' />
      </div>
    )
  }

  if (status === 'guest') {
    return <Navigate to='/admin/login' replace state={{ from: location }} />
  }

  return (
    <Outlet />
  )
}
