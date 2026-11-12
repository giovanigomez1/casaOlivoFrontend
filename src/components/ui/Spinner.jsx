import styles from './Spinner.module.css'

export default function Spinner({ label }) {
  return (
    <div className={styles.spinner} role="status">
      <div className={styles.loader} aria-hidden="true"></div>
      <p>{label}</p>
    </div>
  )
}
