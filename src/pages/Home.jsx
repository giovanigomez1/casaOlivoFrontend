import Hero from '../components/home/Hero'
import OurStory from '../components/home/OurStory'
import FeaturedDishes from '../components/home/FeaturedDishes'
import VisitUs from '../components/home/VisitUs'
import { useLocation } from 'react-router'
import { useEffect } from 'react'
import ReservationCTA from '../components/ui/ReservationCTA'


export default function Home() {
  const { hash } = useLocation()

  useEffect(() => {
    if (!hash) return
    const element = document.querySelector(hash)
    element?.scrollIntoView({ behavior: 'smooth' })
  }, [hash])

  return (
    <>
      <title>Casa Olivo · Cocina mediterránea</title>
      <Hero />
      <OurStory />
      <FeaturedDishes />
      <VisitUs />
      <ReservationCTA
        title='¿Planeando una cena especial?'
        text='Reserva en línea para grupos de 1 a 10 personas.'
        variant='band'
      />
    </>
  )
} 