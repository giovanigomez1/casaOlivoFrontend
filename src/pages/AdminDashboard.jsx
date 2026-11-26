import { useAuth } from "../context/AuthContext"
import { getReservations } from "../api/reservations"
import { useEffect, useState } from "react"
import { getTodayInMexico, addDays, formatFullDate, formatShortDate } from "../utils/date"
import styles from './AdminDashboard.module.css'
import ErrorMessage from "../components/ui/ErrorMessage"
import Spinner from "../components/ui/Spinner"
import ReservationsList from "../components/admin/ReservationsList"
import ReservationsTable from "../components/admin/ReservationsTable"

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
  const [search, setSearch] = useState('')
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

  function normalize(text) {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
  }

  const query = search.trim().toLowerCase()
  const visible = query ? reservations.filter(r => (
    normalize(r.name).includes(query) || r.code.toLowerCase().includes(query))
  ) : reservations

  const confirmed = reservations.filter(r => r.status === 'confirmed')
  const stats = {
    count: confirmed.length,
    guests: confirmed.reduce((total, r) => total + r.guests, 0),
    cancelled: reservations.filter(r => r.status === 'cancelled').length
  }

  return (
    <div className={styles.page}>
      <title>Panel · Casa Olivo</title>
      <header className={styles.header}>
        <div className={styles.title}>
          <h1>Reservaciones</h1>
          <p>{from === to ? formatFullDate(from) : `${formatShortDate(from)} – ${formatShortDate(to)}`}</p>
        </div>
        <div role="group" aria-label="Filtrar por fecha" className={styles.filter}>
          {Object.entries(RANGES).map(([key, { label }]) => (
            <button type="button" key={key} aria-pressed={range === key} onClick={() => setRange(key)}>
              {label}
            </button>
          ))}
        </div>
        <div className={styles.search}>
          <label htmlFor="search">Buscar</label>
          <input
            id="search"
            name="search"
            type="search"
            placeholder="Buscar por nombre o código"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </header>
      {loading && <Spinner label="Cargando reservaciones…" />}
      {!loading && error && <ErrorMessage title='No pudimos cargar las reservaciones' message={error} onRetry={retry} />}
      {!loading && !error && (
        <>
          <dl className={styles.stats}>
            <div className={styles.stat}>
              <dt>Reservaciones</dt>
              <dd>{stats.count}</dd>
            </div>
            <div className={styles.stat}>
              <dt>Personas <span>esperadas</span></dt>
              <dd>{stats.guests}</dd>
            </div>
            <div className={styles.stat}>
              <dt>Canceladas</dt>
              <dd className={styles.cancelled}>{stats.cancelled}</dd>
            </div>
          </dl>
          <ReservationsTable reservations={visible} showDate={from !== to} />
          <ReservationsList reservations={visible} showDate={from !== to} />
        </>
      )}
    </div>
  )
}