import { useAuth } from "../context/AuthContext"
import { getReservations, cancelReservation } from "../api/reservations"
import { useEffect } from "react"
import { getTodayInMexico, addDays } from "../utils/date"

export default function AdminDashboard() {
  const { logout } = useAuth()

  useEffect(() => {
    const today = getTodayInMexico()
    async function getAll() {
      const body = await getReservations({ from: today, to: addDays(today, 1) })
      console.log(body)
    }
    getAll()

  }, [])

  async function cancel() {
    const res = await cancelReservation("6b048ec4f8e40bfe65d92c94")
    console.log(res)
  }

  return (
    <div>
      <title>Panel · Casa Olivo</title>
      <h1 className="container">AdminDashboard</h1>
      <button type="button" onClick={logout}>Logout</button>
      <button type="button" onClick={cancel}>cancel</button>
    </div>
  )
}