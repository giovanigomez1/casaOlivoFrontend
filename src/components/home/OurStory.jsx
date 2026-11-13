import split from './SplitSection.module.css'
import styles from './OurStory.module.css'
import storyImg from '../../assets/cocina.webp'
import { Link } from 'react-router'


export default function OurStory() {
  return (
    <section className={`${split.section} ${styles.ourStory}`}>
      <div className={split.image}>
        <img src={storyImg} alt="Cocina del restaurante" width="1000" height="663" loading="lazy" />
      </div>
      <div className={`${split.content} ${styles.content}`}>
        <p className={split.subtitle}>Nuestra historia</p>
        <h2>Una cocina hecha para compartir</h2>
        <p>Casa Olivo nació de las comidas largas del sur de Europa: platos al centro, conversación y buen vino. Trabajamos con productores locales y cambiamos el menú con cada temporada.</p>

        <Link to='/menu' className={styles.link}>
          Conoce el menú &rarr;
        </Link>


      </div>

    </section>
  )
}
