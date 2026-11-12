import styles from './ErrorMessage.module.css'
import { WifiOff, RotateCw } from 'lucide-react'
import { RESTAURANT } from '../../constants/restaurant'



export default function ErrorMessage({ message, onRetry, title }) {
  return (
    <div className={styles.errorMessage} role='alert'>
      <div className={styles.wifi}>
        <WifiOff size={30} aria-hidden="true" />
      </div>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.message}>{message}</p>
      {onRetry && (
        <button type='button' onClick={onRetry} className={styles.btn}>
          <RotateCw aria-hidden="true" />
          Reintentar
        </button>
      )}
      <p className={styles.contact}>¿Sigue sin funcionar? Llámanos al {RESTAURANT.phone}</p>
    </div>
  )
}
