import { useAuth } from "../context/AuthContext"
import { getReservations } from "../api/reservations"
import { useEffect, useState } from "react"
import { getTodayInMexico, addDays, formatFullDate, formatShortDate } from "../utils/date"
import styles from './AdminDashboard.module.css'
import ErrorMessage from "../components/ui/ErrorMessage"
import Spinner from "../components/ui/Spinner"

const RANGES = {
  today: { label: 'Hoy', days: 0 },
  tomorrow: { label: 'Mañana', start: 1, days: 0 },
  week: { label: 'Esta semana', days: 6 }
}

function getDates(key) {
  const { start = 0, days } = RANGES[key]
  const from = addDays(getTodayInMexico(), start)
  return { from, to: addDays(from, days) }
}

export default function AdminDashboard() {

  const [range, setRange] = useState('today')
  const [reservations, setReservations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reloadKey, setReloadKey] = useState(0)
  const { expireSession } = useAuth()

  useEffect(() => {
    let ignore = false

    async function loadReservations() {
      try {
        setLoading(true)
        setError(null)
        const data = await getReservations(getDates(range))
        if (!ignore) {
          setReservations(data)
        }
      } catch (err) {
        if (!ignore) {
          if (err.status === 401) {
            expireSession()
          } else {
            setError(err.message)
          }
        }
      } finally {
        if (!ignore) setLoading(false)
      }
    }
    loadReservations()
    return () => {
      ignore = true
    }
  }, [reloadKey, expireSession, range])

  const retry = () => setReloadKey(key => key + 1)
  const { from, to } = getDates(range)

  return (
    <>
      <title>Panel · Casa Olivo</title>
      <header className={styles.header}>
        <div className={styles.title}>
          <h1>Reservaciones</h1>
          <p>{from === to ? formatFullDate(from) : `${formatShortDate(from)} - ${formatShortDate(to)}`}</p>
        </div>
        <div role="group" aria-label="Filtrar por fecha" className={styles.filter}>
          {Object.entries(RANGES).map(([key, { label }]) => (
            <button type="button" key={key} aria-pressed={range === key} onClick={() => setRange(key)}>
              {label}
            </button>
          )
          )}
        </div>
        <div className={styles.search}>
          <label htmlFor="search">Buscar</label>
          <input id="search" name="search" type="search" placeholder="Buscar por nombre o código" />
        </div>
      </header>
      {loading && <Spinner label="Cargando reservaciones…" />}
      {!loading && error && <ErrorMessage title='No pudimos cargar las reservaciones' message={error} onRetry={retry} />}
      {!loading && !error && (
        <ul>{reservations.map(r => <li key={r._id}>{r.date} {r.time} {r.name}</li>)}</ul>
      )}
    </>
  )
}