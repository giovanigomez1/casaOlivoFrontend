import { useAuth } from "../context/AuthContext"
import { cancelReservation, getReservations } from "../api/reservations"
import { useEffect, useState } from "react"
import { getTodayInMexico, addDays, formatFullDate, formatShortDate } from "../utils/date"
import styles from './AdminDashboard.module.css'
import ErrorMessage from "../components/ui/ErrorMessage"
import Spinner from "../components/ui/Spinner"
import ReservationsList from "../components/admin/ReservationsList"
import ReservationsTable from "../components/admin/ReservationsTable"
import { CalendarX, SearchX } from 'lucide-react'
import EmptyState from "../components/ui/EmptyState"


const RANGES = {
  today: { label: 'Hoy', days: 0, empty: 'para hoy' },
  tomorrow: { label: 'Mañana', start: 1, days: 0, empty: 'para mañana' },
  week: { label: 'Esta semana', days: 6, empty: 'para esta semana' }
}

function getDates(key) {
  const { start = 0, days } = RANGES[key]
  const from = addDays(getTodayInMexico(), start)
  return { from, to: addDays(from, days) }
}

function normalize(text) {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
}

export default function AdminDashboard() {
  const [range, setRange] = useState('today')
  const [reservations, setReservations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reloadKey, setReloadKey] = useState(0)
  const [search, setSearch] = useState('')
  const { user, expireSession } = useAuth()

  const canCancel = user.role === 'admin'
  const [cancellingId, setCancellingId] = useState(null)
  const [actionMessage, setActionMessage] = useState(null)

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

  const query = normalize(search.trim()).toLowerCase()
  const visible = query ? reservations.filter(r => (
    normalize(r.name).includes(query) || r.code.toLowerCase().includes(query))
  ) : reservations

  const confirmed = reservations.filter(r => r.status === 'confirmed')
  const stats = {
    count: confirmed.length,
    guests: confirmed.reduce((total, r) => total + r.guests, 0),
    cancelled: reservations.filter(r => r.status === 'cancelled').length
  }

  async function handleCancel(reservation) {
    const ok = window.confirm(`¿Cancelar la reservación de ${reservation.name} a las ${reservation.time}?`)
    if (!ok) return

    setCancellingId(reservation._id)
    setActionMessage(null)
    try {
      const updated = await cancelReservation(reservation._id)
      setReservations(prev => prev.map(r => r._id === updated._id ? updated : r))
      setActionMessage({ type: 'success', text: `Se canceló la reservación de ${reservation.name}.` })

    } catch (err) {
      if (err.status === 401) {
        expireSession()
      } else {
        setActionMessage({ type: 'error', text: err.message })
      }
    } finally {
      setCancellingId(null)
    }
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
            <button type="button" key={key} aria-pressed={range === key} onClick={() => {
              setRange(key)
              setActionMessage(null)
            }}>
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
      <p className="visually-hidden" aria-live="polite">
        {query && `${visible.length} ${visible.length === 1 ? 'resultado' : 'resultados'}`}
      </p>
      {loading && <Spinner label="Cargando reservaciones…" />}
      {!loading && error && <ErrorMessage title='No pudimos cargar las reservaciones' message={error} onRetry={retry} />}
      {!loading && !error && (
        <>
          <p role="status" className={actionMessage?.type === 'success' ? styles.success : 'visually-hidden'}>
            {actionMessage?.type === 'success' && actionMessage.text}
          </p>
          {actionMessage?.type === 'error' && (
            <p role='alert' className={styles.error}>{actionMessage.text}</p>
          )}
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
          {reservations.length === 0 ? (
            <EmptyState icon={CalendarX} title={`No hay reservaciones ${RANGES[range].empty}`} message='Las nuevas reservaciones aparecerán aquí' />
          ) : visible.length === 0 ? (
            <EmptyState icon={SearchX} title={`Ninguna reservación coincide con «${search.trim()}»`} message="Revisa el nombre o código">
              <button type="button" onClick={() => setSearch('')} className={styles.clear}>Limpiar búsqueda</button>
            </EmptyState>
          ) : (
            <>
              <ReservationsTable
                reservations={visible}
                showDate={from !== to}
                canCancel={canCancel}
                cancellingId={cancellingId}
                onCancel={handleCancel}
              />
              <ReservationsList
                reservations={visible}
                showDate={from !== to}
                canCancel={canCancel}
                cancellingId={cancellingId}
                onCancel={handleCancel}
              />
            </>
          )}
        </>
      )}
    </div>
  )
}