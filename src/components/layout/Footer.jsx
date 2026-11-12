import styles from './Footer.module.css'
import { Link } from 'react-router'


export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div >
        <span className={styles.name}>Casa Olivo</span>
        <p>Cocina mediterránea de temporada</p>
      </div>
      <nav aria-label="Pie de página">
        <Link to="/menu">
          Menú
        </Link>
        <Link to="/reservaciones">
          Reservaciones
        </Link>
        <Link to="/#contacto">
          Contacto
        </Link>

      </nav>
      <span>© {new Date().getFullYear()} Casa Olivo</span>
    </footer>
  )
}
