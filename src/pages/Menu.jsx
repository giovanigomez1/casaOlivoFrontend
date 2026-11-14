import { getMenu } from "../api/menu"
import { useState, useEffect } from "react"
import style from './Menu.module.css'
import MenuCategory from "../components/menu/MenuCategory"
import ReservationCTA from "../components/ui/ReservationCTA"
import ErrorMessage from "../components/ui/ErrorMessage"
import Spinner from "../components/ui/Spinner"
import { UtensilsCrossed } from 'lucide-react'
import EmptyState from "../components/ui/EmptyState"
import { CATEGORIES } from "../constants/menu"


export default function Menu() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    let ignore = false

    async function load() {
      try {
        setLoading(true)
        setError(null)
        const data = await getMenu()
        if (!ignore) setItems(data)
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
  }, [reloadKey])

  const retry = () => setReloadKey(key => key + 1)

  const sections = CATEGORIES.map(category => ({
    ...category,
    items: items.filter(item => item.category === category.key)
  }))
  const visibleSections = sections.filter(section => section.items.length > 0)



  return (

    <div className={style.menu}>
      <title>Menú · Casa Olivo</title>
      <section className={style.banner}>
        <span className="eyebrow">Menú de otoño</span>
        <h1 className={style.title}>Nuestro menú</h1>
        <p className={style.message}>Ingredientes de temporada y recetas para compartir. Pregunta a tu mesero por opciones sin gluten o veganas. </p>
      </section>


      {loading && <Spinner label='Cargando menú...' />}

      {!loading && error && (
        <ErrorMessage message={error} onRetry={retry} title="No pudimos cargar el menú" />
      )}

      {!loading && !error && visibleSections.length === 0 && (
        <EmptyState
          icon={UtensilsCrossed}
          title='Estamos preparando el menú'
          message='Por ahora no hay platillos disponibles. Vuelve pronto o llámanos para conocer la carta del día.'
        />
      )}

      {!loading && !error && visibleSections.length > 0 && (
        <>
          <div className={style.pastillas}>
            {visibleSections.map(section => (
              <a key={section.key} href={`#${section.id}`}>{section.label}</a>
            ))}
          </div>
          <section className={style.categories}>
            {visibleSections.map(section => (
              <MenuCategory
                key={section.key}
                id={section.id}
                title={section.label}
                items={section.items}
              />
            ))}
          </section>
        </>
      )}
      {!loading && !error && (
        <ReservationCTA title='¿Se te antojó algo?' text='Reserva tu mesa en menos de 1 minuto' />
      )}
    </div>
  )
}