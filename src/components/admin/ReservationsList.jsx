import styles from './ReservationsList.module.css'
import StatusBadge from './StatusBadge'


export default function ReservationsList({ reservations, showDate }) {
  return (
    <ul className={styles.wrapper}>
      {reservations.map(r => (
        <li key={r._id}>
          {r.time}
          <StatusBadge status={r.status} />
        </li>
      ))}
    </ul>
  )
}