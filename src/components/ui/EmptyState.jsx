import styles from './EmptyState.module.css'

export default function EmptyState({ icon: Icon, title, message, children }) {
  return (
    <div className={styles.empty}>
      {Icon && (
        <div className={styles.iconWrapper}>
          <Icon size={26} aria-hidden="true" />
        </div>
      )}
      <h2 className={styles.title}>{title}</h2>
      {message && <p className={styles.message}>{message}</p>}
      {children}
    </div>
  )
}
