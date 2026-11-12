import MenuItem from "./MenuItem"
import styles from './MenuCategory.module.css'

export default function MenuCategory({ id, title, items }) {


  return (
    <section className={styles.categoryItems}>
      <h2 className={styles.title} id={id}>{title}</h2>
      <div className={styles.items}>
        {
          items.map(item => (
            < MenuItem key={item._id} item={item} />
          ))
        }
      </div>
    </section>
  )
}