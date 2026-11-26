import { Outlet } from "react-router";
import { AuthProvider } from "../../context/AuthProvider";

export default function AdminRoot() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  )
}
