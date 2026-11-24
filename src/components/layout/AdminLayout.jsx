import { useAuth } from "../../context/AuthContext"
import styles from './AdminLayout.module.css'
import { Outlet, Link, NavLink } from "react-router"
import Logo from "../ui/Logo"
import { Calendar, ExternalLink, LogOut } from 'lucide-react'

const ROLE_LABELS = { admin: 'Administrador', clerk: 'Recepción' }

export default function AdminLayout() {
  const { user, logout } = useAuth()

  return (
    <div className={styles.layout}>
      <header className={styles.bar}>
        <Link to='/admin' className={styles.brand}>
          <Logo />
          <div className={styles.logoText}>
            <span className={styles.barTitle}>Casa Olivo</span>
            <span className={styles.barSub}>Administración</span>
          </div>
        </Link>
        <nav aria-label="Panel" className={styles.nav}>
          <NavLink to='/admin' className={`${styles.navLink} ${styles.desktopOnly}`}>
            <Calendar />
            Reservaciones
          </NavLink>
          <Link to='/' className={styles.navLink}>
            <ExternalLink />
            <span className={styles.label}>Ver sitio</span>
          </Link>
        </nav>
        <div className={styles.account}>
          <span className={styles.avatar} aria-hidden="true">
            {`${user.firstName[0]} ${user.lastName[0]}`}
          </span>
          <p className={styles.user}>
            <span className={styles.name}>{user.firstName}{user.lastName}</span>
            <span className={styles.role}>{ROLE_LABELS[user.role]}</span>
          </p>
          <button type="button" onClick={logout} className={styles.logout}>
            <LogOut aria-hidden="true" />
            <span className={styles.label}>Cerrar sesión</span>
          </button>
        </div>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  )
}
