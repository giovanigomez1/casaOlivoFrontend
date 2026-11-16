import styles from './VisitUs.module.css'
import { RESTAURANT } from '../../constants/restaurant'
import RestaurantMap from './RestaurantMap'


export default function VisitUs() {
  return (
    <section id='contacto' className={styles.visitUs}>
      <div className={styles.info}>
        <h2 className={styles.title}>
          Visítanos
        </h2>
        <dl className={styles.directions}>
          <div>
            <dt>Horario</dt>
            <dd>{RESTAURANT.hours}</dd>
            <dd>{RESTAURANT.closedDay}</dd>
          </div>
          <div>
            <dt>Dirección</dt>
            <dd>{RESTAURANT.address.street}</dd>
            <dd>{RESTAURANT.address.city}</dd>
          </div>
          <div>
            <dt>Teléfono</dt>
            <dd><a href={`tel:${RESTAURANT.phone}`}>{RESTAURANT.phone}</a></dd>
          </div>
          <div>
            <dt>Correo</dt>
            <dd><a href={`mailto:${RESTAURANT.email}`}>{RESTAURANT.email}</a></dd>
          </div>
        </dl>

      </div>
      <div className={styles.map}>
        <RestaurantMap />

      </div>

    </section>
  )
}
