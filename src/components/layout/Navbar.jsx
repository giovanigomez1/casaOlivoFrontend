import { NavLink, Link } from "react-router"
import Logo from "../ui/Logo"
import styles from './Navbar.module.css'
import { useState, useEffect } from "react"
import { Menu, X, Clock, Phone, ChevronRight } from 'lucide-react'
import { RESTAURANT } from '../../constants/restaurant'

export default function Navbar() {

  const [open, setOpen] = useState(false)


  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])


  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 64em)')
    const handleChange = (e) => {
      if (e.matches) setOpen(false)
    }
    mediaQuery.addEventListener('change', handleChange)

    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  }, [])


  return (
    <header className={styles.header}>
      <Link onClick={() => setOpen(false)} to='/' className={styles.logo}>
        <Logo />
        <span className={styles.logoTexto}>Casa Olivo</span>
      </Link>

      <div className={`${styles.menu} ${open ? styles.open : ''}`}>
        <nav className={styles.navigation} aria-label="Principal">
          <ul>
            <li>
              <NavLink
                onClick={() => setOpen(false)}
                to='/' end
                className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}>
                Inicio
                <ChevronRight aria-hidden="true" />
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={() => setOpen(false)}
                to='/menu'
                className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}>
                Menú
                <ChevronRight aria-hidden="true" />
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={() => setOpen(false)}
                to='/reservaciones'
                className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}>
                Reservaciones
                <ChevronRight aria-hidden="true" />
              </NavLink>
            </li>
            <li>
              <Link
                onClick={() => setOpen(false)}
                to='/#contacto'
                className={styles.link}>
                Contacto
                <ChevronRight aria-hidden="true" />
              </Link>
            </li>
          </ul>
        </nav>
        <Link
          onClick={() => setOpen(false)}
          to='/reservaciones'
          className={styles.cta}>
          Reservar mesa
        </Link>

        <div className={styles.info}>
          <div>
            <p><Clock aria-hidden="true" /> {RESTAURANT.hours}</p>
            <p className={styles.dayClosed}>Lunes cerrado</p>
          </div>
          <p><Phone aria-hidden="true" />{RESTAURANT.phone}</p>
        </div>
      </div>



      <button
        type="button"
        className={`${styles.menuButton} ${open ? styles.menuButtonOpened : ''}`}
        aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
      </button>

    </header>
  )
}
