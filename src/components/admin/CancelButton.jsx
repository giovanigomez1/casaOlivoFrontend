import styles from './CancelButton.module.css'

export default function CancelButton({ reservation, cancelling, onCancel, label = 'Cancelar' }) {
  return (
    <button
      type='button'
      onClick={() => onCancel(reservation)}
      disabled={cancelling}
      className={styles.cancel}
    >
      {cancelling ? 'Cancelando…' : label}
      <span className='visually-hidden'> la reservación de {reservation.name}</span>
    </button>
  )
}
