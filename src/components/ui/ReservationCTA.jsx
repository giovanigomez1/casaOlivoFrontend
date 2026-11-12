import styles from './ReservationCTA.module.css'
import { Link } from 'react-router'


export default function ReservationCTA({ title, text }) {
  return (
    <div className={styles.ctaContainer}>
      <div className={styles.resevationCta}>
        <div>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.text}>{text}</p>
        </div>

        <Link className={styles.cta} to='/reservaciones'>Reservar mesa</Link>

      </div>


    </div>
  )
}
