import { API_URL } from './api'
import { getToken } from './token'

export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  const token = getToken()

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
      ...options.headers,
    }
  })

  if (res.status === 401) {
    // Token expired → redirect to login
    window.location.href = '/login'
    return
  }

  const data = await res.json()
  if (!res.ok) throw new Error(data.message)
  return data
}