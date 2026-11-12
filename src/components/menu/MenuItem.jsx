import styles from './MenuItem.module.css'
import { formatPrice } from '../../utils/format'


export default function MenuItem({ item }) {

  return (
    <div className={styles.item}>
      <div>
        <p className={styles.name}>{item.name}</p>
        <p className={styles.description}>{item.description}</p>
      </div>
      <div>
        <p className={styles.price}>{formatPrice(item.price)}</p>
      </div>
    </div>
  )
}
