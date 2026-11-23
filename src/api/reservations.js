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


export async function getReservations({ from, to }) {
  const params = new URLSearchParams()
  if (from === to) {
    params.set('date', from)
  } else {
    params.set('date[gte]', from)
    params.set('date[lte]', to)
  }
  const body = await apiFetch(`/reservations?${params}`)
  return body.data.data
}

export async function cancelReservation(id) {
  const body = await apiFetch(`/reservations/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ status: 'cancelled' })
  })
  return body.data.data
}