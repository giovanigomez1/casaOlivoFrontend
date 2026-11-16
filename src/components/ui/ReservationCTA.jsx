import styles from './ReservationCTA.module.css'
import { Link } from 'react-router'


export default function ReservationCTA({ title, text, variant = 'card' }) {
  return (
    <section className={`${styles.cta} ${styles[variant]}`}>
      <div>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.text}>{text}</p>
      </div>
      <Link to="/reservaciones" className={styles.button}>Reservar mesa</Link>
    </section>
  )
}
