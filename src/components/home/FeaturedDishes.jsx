import styles from './FeaturedDishes.module.css'
import { useState, useEffect } from 'react'
import { getFeaturedDishes } from '../../api/menu'
import { Link } from 'react-router'
import FeaturedCard from './FeaturedCard'
import { CATEGORIES } from '../../constants/menu'
import Spinner from "../../components/ui/Spinner"

export default function FeaturedDishes() {

  const [featuredDishes, setFeaturedDishes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)


  useEffect(() => {
    let ignore = false

    async function load() {
      try {
        setLoading(true)
        setError(null)
        const data = await getFeaturedDishes()
        if (!ignore) setFeaturedDishes(data)
      } catch (err) {
        if (!ignore) setError(err.message)
      } finally {
        if (!ignore) setLoading(false)
      }
    }
    load()
    return () => {
      ignore = true
    }
  }, [])


  const categoryOrder = CATEGORIES.map(category => category.key)
  const sortDishes = [...featuredDishes].sort(
    (a, b) => categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category)
  )

  if (!loading && (error || sortDishes.length === 0)) return null

  return (
    <section className={styles.featured}>
      <div className={styles.title}>
        <p className='eyebrow'>Favoritos de la casa</p>
        <h2>Platillos destacados</h2>
      </div>
      <Link className={styles.link} to='/menu'>Ver menú completo<span aria-hidden="true"> &rarr;</span></Link>
      <div className={styles.dishes}>
        {loading && <Spinner label='Cargando platillos...' />}
        {!loading && !error && sortDishes.length > 0 && (
          <>
            {sortDishes.map(dish => (
              <FeaturedCard dish={dish} key={dish._id} />
            ))}
          </>
        )}

      </div>



    </section>
  )
}
