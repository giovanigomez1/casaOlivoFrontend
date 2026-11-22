import { Outlet } from "react-router";
import { AuthProvider } from "../../context/AuthContext";

export default function AdminRoot() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  )
}
