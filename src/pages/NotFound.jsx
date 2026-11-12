import { Link } from "react-router"
import { FileQuestionMark } from 'lucide-react'
import styles from './NotFound.module.css'


export default function NotFound() {
  return (
    <div className={styles.notFound}>
      <div className={styles.iconWrapper}>
        <FileQuestionMark size={30} aria-hidden="true" />
      </div>
      <h1 className={styles.title}>No encontramos esta página</h1>
      <Link className={styles.btn} to='/'>Regresar a Inicio</Link>
    </div>
  )
}