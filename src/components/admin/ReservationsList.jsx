import styles from './ReservationsList.module.css'
import StatusBadge from './StatusBadge'
import { formatShortDate } from '../../utils/date'
import CancelButton from './CancelButton'

export default function ReservationsList({ reservations, showDate, canCancel, cancellingId, onCancel }) {
  return (
    <ul className={styles.wrapper}>
      {reservations.map(r => {
        const isActive = r.status === 'confirmed'

        return <li key={r._id} className={`${r.status === 'cancelled' ? styles.cancelled : ''} ${styles.card}`}>
          <div className={styles.top}>
            <p className={styles.when}>
              {showDate && <span className={styles.date}>{formatShortDate(r.date)}</span>}
              <time className={styles.time} dateTime={r.time}>{r.time}</time>
            </p>
            <StatusBadge status={r.status} />
          </div>
          <div className={styles.who}>
            <h2 className={styles.name}>{r.name}</h2>
            <span className={styles.code}>{r.code}</span>
            <span className={styles.guests}>{r.guests} {r.guests === 1 ? 'persona' : 'personas'}</span>
          </div>
          {isActive && (
            <div className={styles.contact}>
              <a href={`mailto:${r.email}`}>{r.email}</a>
              <a href={`tel:${r.phone.replace(/\D/g, '')}`}>{r.phone}</a>
            </div>
          )}
          {r.specialRequest && isActive && (
            <p className={styles.request}><strong>Petición: </strong>{r.specialRequest}</p>
          )}
          {canCancel && isActive && (
            <CancelButton
              reservation={r}
              cancelling={cancellingId === r._id}
              onCancel={onCancel}
              label="Cancelar reservación"
            />
          )}
        </li>
      })}
    </ul>
  )
}