import { apiFetch } from "./client";

export async function getMenu() {
  const body = await apiFetch('/menu')
  return body.data.data
}