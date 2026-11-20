import { useLocation, Link } from "react-router"
import styles from './Confirmation.module.css'
import EmptyState from "../components/ui/EmptyState"
import { Check, CalendarCheck } from 'lucide-react'
import { formatLongDate } from "../utils/date"
import { RESTAURANT } from "../constants/restaurant"


export default function Confirmation() {

  const reservation = useLocation().state?.reservation

  if (!reservation) {
    return (
      <>
        <title>Reservación · Casa Olivo</title>
        <EmptyState
          icon={CalendarCheck}
          title="No hay detalles para mostrar"
          message={`Si ya hiciste tu reservación, sigue registrada. ¿Necesitas confirmarla? Llámanos al ${RESTAURANT.phone}`}
        >
          <Link className={`${styles.button} ${styles.home}`} to='/reservaciones'>Hacer una reservación</Link>
        </EmptyState>
      </>
    )
  }

  return (
    <div className={styles.container}>
      <title>Reserva confirmada · Casa Olivo</title>
      <div className={styles.confirmation}>
        <div className={styles.check}>
          <Check aria-hidden="true" size={30} />
        </div>
        <h1>¡Reservación confirmada!</h1>
        <p>Guarda tu código de reservación</p>
        <dl className={styles.details}>
          <dt>Nombre</dt>
          <dd>{reservation.name}</dd>
          <dt>Fecha</dt>
          <dd>{formatLongDate(reservation.date)}</dd>
          <dt>Hora</dt>
          <dd>{reservation.time}</dd>
          <dt>Personas</dt>
          <dd>{reservation.guests}</dd>
          <dt>Código</dt>
          <dd className={styles.code}>{reservation.code}</dd>
        </dl>
        <div className={styles.actions}>
          <Link to='/' className={`${styles.button} ${styles.home}`}>Volver al inicio</Link>
          <Link to='/menu' className={`${styles.button} ${styles.menu}`}>Ver menú</Link>
        </div>
      </div>
    </div>
  )
}