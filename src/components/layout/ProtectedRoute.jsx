import { useAuth } from "../../context/AuthContext"
import { Outlet, useLocation, Navigate } from "react-router"
import Spinner from "../ui/Spinner"
import FullPageSpinner from "../ui/FullPageSpinner"

export default function ProtectedRoute() {
  const { status } = useAuth()
  const location = useLocation()

  if (status === 'checking') {
    return (
      <FullPageSpinner>
        <Spinner label='Verificando sesión…' />
      </FullPageSpinner>
    )
  }

  if (status === 'guest') {
    return <Navigate to='/admin/login' replace state={{ from: location }} />
  }

  return (
    <Outlet />
  )
}
