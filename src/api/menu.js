import { apiFetch } from "./client";

export async function getMenu() {
  const body = await apiFetch('/menu')
  return body.data.data
}


export async function getFeaturedDishes() {
  const body = await apiFetch('/menu?featured=true&limit=4')
  return body.data.data
}