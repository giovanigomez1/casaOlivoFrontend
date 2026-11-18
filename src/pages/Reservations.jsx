import styles from './Reservations.module.css'
import { RESTAURANT } from '../constants/restaurant'
import { Clock, Users, TriangleExclamationPoint, Plus, Minus } from 'lucide-react'



export default function Reservations() {
  return (
    <div className={styles.reservations}>
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
      <form className={styles.form}>
        <div className={`${styles.element} ${styles.name}`}>
          <label htmlFor="name">Nombre completo</label>
          <input id='name' name='name' type="text" placeholder='Ana García' />
        </div>
        <div className={`${styles.element} ${styles.email}`}>
          <label htmlFor="email">Correo electrónico</label>
          <input id='email' name='email' type="email" placeholder='ana@correo.com' />
        </div>
        <div className={`${styles.element} ${styles.phone}`}>
          <label htmlFor="phone">Teléfono</label>
          <input id='phone' name='phone' type="tel" placeholder='55 1234 5678' />
        </div>
        <div className={`${styles.element} ${styles.guests}`}>
          <span>Personas</span>
          <div className={styles.numberGuests}>
            <button aria-hidden="Menos personas" type='button'><Minus /></button>
            <p>2 <span>personas</span></p>
            <button aria-hidden="Más personas" type='button'><Plus /></button>
          </div>
        </div>
        <div className={`${styles.element} ${styles.date}`}>
          <label htmlFor="date">Fecha</label>
          <input type="date" id='date' name='date' />
        </div>
        <div className={`${styles.element} ${styles.hours}`}>
          <fieldset><legend>Hora disponible</legend></fieldset>
          <div className={styles.slots}>
          </div>
          <span>Los horarios tachados están llenos</span>
        </div>
        <div className={`${styles.element} ${styles.request}`}>
          <label htmlFor='specialRequest'>Petición especial <span>(opcional)</span></label>
          <textarea id='specialRequest' name='specialRequest' placeholder='Cumpleaños, silla para bebé, alergias... '></textarea>
        </div>
        <div className={styles.action}>
          <p>Sab 3 Oct - 19:30 - 2 personas</p>
          <button type='submit'>Confirmar reservación</button>
        </div>
      </form>

    </div>
  )
}