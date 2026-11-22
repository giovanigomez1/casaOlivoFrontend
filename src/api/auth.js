import { apiFetch } from "./client";

export async function login(identifier, password) {
  const data = identifier.includes('@') ?
    { email: identifier, password }
    :
    { nickName: identifier, password }

  const body = await apiFetch('/users/login', {
    method: 'POST',
    body: JSON.stringify(data)
  })
  return body.data.data.user
}

export async function getMe() {
  try {
    const body = await apiFetch('/users/me')
    return body.data.data.user
  } catch (err) {
    if (err.status === 401) return null
    throw err
  }
}


export async function logout() {
  await apiFetch('/users/logout', {
    method: 'POST'
  })
}

