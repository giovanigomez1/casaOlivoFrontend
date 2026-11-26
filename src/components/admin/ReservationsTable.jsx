import styles from './ReservationsTable.module.css'
import StatusBadge from './StatusBadge'
import { formatShortDate } from '../../utils/date'
import CancelButton from './CancelButton'

export default function ReservationsTable({ reservations, showDate, canCancel, cancellingId, onCancel }) {
  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <caption className='visually-hidden'>Reservaciones</caption>
        <thead>
          <tr>
            <th scope='col'>{showDate ? 'Día y hora' : 'Hora'}</th>
            <th scope='col'>Nombre</th>
            <th scope='col'>Personas</th>
            <th scope='col'>Contacto</th>
            <th scope='col'>Petición</th>
            <th scope='col'>Estado</th>
            <th scope='col'><span className='visually-hidden'>Acciones</span></th>
          </tr>
        </thead>
        <tbody>
          {reservations.map(r => (
            <tr key={r._id} className={r.status === 'cancelled' ? styles.cancelled : undefined}>
              <td className={styles.when}>
                {showDate && <span className={styles.date}>{formatShortDate(r.date)}</span>}
                <span className={styles.time}>{r.time}</span>
              </td>
              <td className={styles.nameCode}>
                <span className={styles.name}>{r.name}</span>
                <span className={styles.code}>{r.code}</span>
              </td>
              <td>{r.guests}</td>
              <td className={styles.contact}>
                <a href={`mailto:${r.email}`}>{r.email}</a>
                <a href={`tel:${r.phone.replace(/\D/g, '')}`}>{r.phone}</a>
              </td>
              <td>{r.specialRequest ? <span>{r.specialRequest}</span> : (<><span aria-hidden="true">—</span><span className='visually-hidden'>Sin petición</span></>)}</td>
              <td><StatusBadge status={r.status} /></td>
              <td>
                {canCancel && r.status === 'confirmed' && (
                  <CancelButton
                    reservation={r}
                    cancelling={cancellingId === r._id}
                    onCancel={onCancel}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
