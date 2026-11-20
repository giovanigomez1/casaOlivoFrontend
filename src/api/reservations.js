import { apiFetch } from "./client";

export async function getAvailability(date, guests) {
  const params = new URLSearchParams({ date, guests });

  const body = await apiFetch(`/reservations/availability?${params}`)
  return body.data
}

export async function createReservation(data) {
  const body = await apiFetch('/reservations', {
    method: 'POST',
    body: JSON.stringify(data)
  })
  return body.data.data
}

