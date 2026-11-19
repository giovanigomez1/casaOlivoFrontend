import { apiFetch } from "./client";


export async function getAvailability(date, guests) {
  const params = new URLSearchParams({ date, guests });

  const body = await apiFetch(`/reservations/availability?${params}`)
  return body.data
}




export function createReservation(data) {

}