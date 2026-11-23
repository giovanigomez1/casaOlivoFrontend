import styles from './FullPageSpinner.module.css'

export default function FullPageSpinner({ children }) {
  return (
    <div className={styles.spinnerFullPage}>
      {children}
    </div>
  )
}
