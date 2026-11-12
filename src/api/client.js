const API_URL = import.meta.env.VITE_API_URL

export async function apiFetch(path, options = {}) {
  let res
  try {
    res = await fetch(`${API_URL}${path}`, {
      credentials: 'include',
      headers: { 'Content-Type': 'application/json', ...options.headers },
      ...options,
    })
  } catch {
    throw new Error('No pudimos conectar con el servidor. Revisa tu conexión e intenta de nuevo.')
  }
  const body = await res.json().catch(() => null)

  if (!res.ok) {
    const error = new Error(body?.message ?? 'Ocurrió un error, intenta de nuevo')
    error.status = res.status
    throw error
  }
  return body
}