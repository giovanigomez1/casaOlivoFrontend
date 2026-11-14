import styles from './FeaturedCard.module.css'
import { formatPrice } from '../../utils/format'

export default function FeaturedCard({ dish }) {
  return (
    <article className={styles.card}>
      <div className={styles.image}>
        {dish.image && <img src={dish.image} alt="" width="1200" height="800" loading='lazy' />}
      </div>
      <div className={styles.content}>
        <div className={styles.title}>
          <h3 className={styles.name}>{dish.name}</h3>
          <p className={styles.price}>{formatPrice(dish.price)}</p>
        </div>
        <p className={styles.description}>{dish.description}</p>
      </div>
    </article>
  )
}
