import styles from './Reservations.module.css'
import { RESTAURANT } from '../constants/restaurant'
import { Clock, Users, TriangleExclamationPoint, Plus, Minus, CalendarOff } from 'lucide-react'
import { useEffect, useState } from 'react'
import { getAvailability, createReservation } from '../api/reservations'
import { getTodayInMexico, formatShortDate } from '../utils/date'
import Spinner from '../components/ui/Spinner'
import ErrorMessage from '../components/ui/ErrorMessage'
import EmptyState from '../components/ui/EmptyState'
import { useNavigate } from 'react-router'

const MAX_REQUEST_LENGTH = 300
const MAX_GUESTS = 10
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\d{10}$/

function validatePhone(phone) {
  const cleanPhone = phone.replace(/\D/g, "")
  return phoneRegex.test(cleanPhone)
}

function validate({ name, email, phone, date, time }) {
  const errors = {}
  if (name.trim().length < 2) errors.name = 'Escribe tu nombre completo'
  if (!emailRegex.test(email)) errors.email = 'Ingresa un correo válido'
  if (!validatePhone(phone)) errors.phone = 'Ingresa un número de teléfono válido a 10 dígitos'
  if (!date) errors.date = 'Por favor selecciona una fecha'
  if (!time) errors.time = 'Por favor selecciona un horario'
  return errors
}

export default function Reservations() {
  const [specialRequest, setSpecialRequest] = useState('')
  const [date, setDate] = useState('')
  const [guests, setGuests] = useState(2)
  const [loading, setLoading] = useState(false)
  const [availability, setAvailability] = useState(null)
  const [error, setError] = useState(null)
  const [time, setTime] = useState('')
  const [reloadKey, setReloadKey] = useState(0)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)

  const navigate = useNavigate()


  useEffect(() => {
    if (!date) return
    let ignore = false
    async function loadAvailability() {
      try {
        setLoading(true)
        setError(null)
        setAvailability(null)
        const data = await getAvailability(date, guests)
        if (!ignore) {
          setAvailability(data)
          setTime(currentTime => {
            return data.slots.some(s => s.time === currentTime && s.available) ? currentTime : ''
          })
        }
      } catch (err) {
        if (!ignore) setError(err.message)
      } finally {
        if (!ignore) setLoading(false)
      }
    }
    loadAvailability()
    return () => {
      ignore = true
    }
  }, [date, guests, reloadKey])
  const retry = () => setReloadKey(key => key + 1)

  async function handleSubmit(e) {
    e.preventDefault()
    const errors = validate({ name, email, phone, date, time })
    setFieldErrors(errors)
    if (Object.keys(errors).length) return
    setSubmitting(true)
    setSubmitError(null)
    try {
      const reservation = await createReservation({ name, email, phone, date, time, guests, specialRequest })
      navigate('/reservaciones/confirmacion', { state: { reservation } })
    } catch (err) {
      if (err.status === 409) {
        setFieldErrors(prev => ({ ...prev, time: err.message }))
        setTime('')
        retry()
      } else {
        setSubmitError(err.message)
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className={styles.reservations}>
      <title>Reservaciones · Casa Olivo</title>
      <div className={styles.content}>
        <p className='eyebrow'>Reservaciones</p>
        <h1>Reserva tu mesa</h1>
        <p className={styles.subtitle}>Elige el día, la hora y el número de personas. Al confirmar recibirás un código de reservación.</p>
      </div>
      <div className={styles.info}>
        <div className={styles.block}>
          <Clock size={22} />
          <p><strong>Horario: </strong>{RESTAURANT.hours}</p>
        </div>
        <div className={styles.block}>
          <Users size={22} />
          <p><strong>Grupos de más de 10:</strong> llámanos al {RESTAURANT.phone}</p>
        </div>
        <div className={styles.block}>
          <TriangleExclamationPoint size={22} />
          <p>Mantenemos tu mesa 15 minutos después de la hora reservada.</p>
        </div>
      </div>
      <form className={styles.form} noValidate onSubmit={handleSubmit}>
        <div className={`${styles.element} ${styles.name}`}>
          <label htmlFor="name">Nombre completo</label>
          <input
            value={name}
            id='name'
            name='name'
            type="text"
            placeholder='Ana García'
            onChange={(e) => {
              setName(e.target.value)
              setFieldErrors(prev => ({ ...prev, name: undefined }))
            }}
            aria-invalid={Boolean(fieldErrors.name)}
            aria-describedby={fieldErrors.name ? 'name-error' : undefined}
          />
          {fieldErrors.name && <span id='name-error' className={styles.error}>{fieldErrors.name}</span>}
        </div>
        <div className={`${styles.element} ${styles.email}`}>
          <label htmlFor="email">Correo electrónico</label>
          <input
            id='email'
            name='email'
            type="email"
            placeholder='ana@correo.com'
            onChange={(e) => {
              setEmail(e.target.value)
              setFieldErrors(prev => ({ ...prev, email: undefined }))
            }}
            value={email}
            aria-invalid={Boolean(fieldErrors.email)}
            aria-describedby={fieldErrors.email ? 'email-error' : undefined}
          />
          {fieldErrors.email && <span id='email-error' className={styles.error}>{fieldErrors.email}</span>}
        </div>
        <div className={`${styles.element} ${styles.phone}`}>
          <label htmlFor="phone">Teléfono</label>
          <input
            id='phone'
            name='phone'
            type="tel"
            placeholder='55 1234 5678'
            onChange={(e) => {
              setPhone(e.target.value)
              setFieldErrors(prev => ({ ...prev, phone: undefined }))
            }}
            value={phone}
            aria-invalid={Boolean(fieldErrors.phone)}
            aria-describedby={fieldErrors.phone ? 'phone-error' : undefined}
          />
          {fieldErrors.phone && <span id='phone-error' className={styles.error}>{fieldErrors.phone}</span>}
        </div>
        <div className={`${styles.element} ${styles.guests}`}>
          <span>Personas</span>
          <div className={styles.numberGuests}>
            <button
              aria-label="Menos personas"
              type='button'
              onClick={() => setGuests(g => Math.max(g - 1, 1))}
              disabled={guests === 1}
            >
              <Minus />
            </button>
            <p aria-live='polite'>{guests} <span>personas</span></p>
            <button
              aria-label="Más personas"
              type='button'
              onClick={() => setGuests(g => Math.min(g + 1, MAX_GUESTS))}
              disabled={guests === MAX_GUESTS}
            >
              <Plus />
            </button>
          </div>
        </div>
        <div className={`${styles.element} ${styles.date}`}>
          <label htmlFor="date">Fecha</label>
          <input
            onChange={(e) => {
              setDate(e.target.value)
              setTime('')
              setFieldErrors(prev => ({ ...prev, date: undefined }))
            }}
            type="date"
            id='date'
            name='date'
            value={date}
            min={getTodayInMexico()}
            aria-invalid={Boolean(fieldErrors.date)}
            aria-describedby={fieldErrors.date ? 'date-error' : undefined}
          />
          {fieldErrors.date && <span id='date-error' className={styles.error}>{fieldErrors.date}</span>}
        </div>
        <fieldset className={`${styles.element} ${styles.hours}`}>
          <legend>Hora disponible</legend>
          {!date && <span className={styles.hint}>Elige una fecha para ver los horarios</span>}
          {loading && <Spinner label='Cargando horarios…' />}

          {!loading && error && (
            <ErrorMessage message={error} onRetry={retry} title="No pudimos cargar los horarios" />
          )}
          {date && !loading && !error && availability?.closed && (
            <EmptyState
              icon={CalendarOff}
              title="Cerramos los lunes"
              message="Los lunes descansamos, elige otro día"
            />
          )}
          {!loading && !error && !availability?.closed && (
            <div className={styles.slots}>
              {availability?.slots?.map(slot => (
                <button
                  type='button'
                  key={slot.time}
                  aria-pressed={slot.time === time}
                  disabled={!slot.available}
                  onClick={() => {
                    setTime(slot.time)
                    setFieldErrors(prev => ({ ...prev, time: undefined }))
                  }}
                >
                  {slot.time}
                </button>
              ))}
            </div>
          )}
          {availability?.slots?.length > 0 && <span className={styles.hint}>Los horarios tachados están llenos</span>}
          {fieldErrors.time && <span id='time-error' role='alert' className={styles.error}>{fieldErrors.time}</span>}
        </fieldset>
        <div className={`${styles.element} ${styles.request}`}>
          <label htmlFor='specialRequest'>Petición especial <span>(opcional)</span></label>
          <textarea
            onChange={(e) => setSpecialRequest(e.target.value)}
            maxLength={MAX_REQUEST_LENGTH}
            id='specialRequest'
            name='specialRequest'
            placeholder='Cumpleaños, silla para bebé, alergias...'
            aria-describedby="request-counter"
            value={specialRequest}
          >
          </textarea>
          <span id='request-counter' className={`${styles.counter} ${styles.hint}`}>{specialRequest.length} / {MAX_REQUEST_LENGTH}</span>
        </div>
        <div className={styles.action}>
          {submitError && (<p role='alert' className={styles.submitError}>{submitError}</p>)}
          {date && time && (<p className={styles.summary}>{`${formatShortDate(date)} · ${time} · ${guests} ${guests === 1 ? 'persona' : 'personas'}`}</p>)}
          <button type='submit' disabled={submitting}>{submitting ? 'Confirmando…' : 'Confirmar reservación'}</button>
        </div>
      </form>
    </div>
  )
}