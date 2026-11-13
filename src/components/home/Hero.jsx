import split from './SplitSection.module.css'
import styles from './Hero.module.css'
import heroImg from '../../assets/hero.webp'
import { Link } from 'react-router'

export default function Hero() {
  return (
    <section className={split.section}>
      <div className={`${split.content} ${styles.content}`}>
        <p className={split.subtitle}>Cocina Mediterránea de temporada</p>
        <h1>Sabores del Mediterráneo, en tu mesa.</h1>
        <p>Aceite de oliva, pan recién horneado y recetas para compartir sin prisa. Reserva tu mesa en menos de un minuto.</p>
        <div className={styles.actions}>
          <Link to='/reservaciones' className={styles.reservations}>Reservar mesa</Link>
          <Link to='/menu' className={styles.menu}>Ver menú</Link>
        </div>
      </div>
      <div className={split.image}>
        <img src={heroImg} alt="Mesa servida con platillos mediterráneos" width="1600" height="1067" fetchPriority='high' />
      </div>

    </section>
  )
}
