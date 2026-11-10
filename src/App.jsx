import { BrowserRouter, Routes, Route } from "react-router"
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Reservations from './pages/Reservations'
import Confirmation from './pages/Confirmation'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import NotFound from './pages/NotFound'
import ScrollTop from "./components/layout/ScrollTop"



export default function App() {
  return (
    <BrowserRouter>
      <ScrollTop />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="menu" element={<Menu />} />
          <Route path="reservaciones" element={<Reservations />} />
          <Route path="reservaciones/confirmacion" element={<Confirmation />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="admin/login" element={<AdminLogin />} />
        <Route path="admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  )
}


