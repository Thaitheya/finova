import { API_URL } from '../lib/api'

export const sendOTP = async (email: string) => {
  const res = await fetch(`${API_URL}/send-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message)
  return data
}

export const verifyOTP = async (otpToken: string, otp: string) => {
  const res = await fetch(`${API_URL}/verify-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ otpToken, otp })
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message)
  return data
}

export const googleLogin = () => {
  window.location.href = `${API_URL}/google`
}

export const logout = async () => {
  await fetch(`${API_URL}/logout`, {
    method: 'POST',
    credentials: 'include'
  })
  localStorage.removeItem('token')
  localStorage.removeItem('refreshToken')
  window.location.href = '/login'
}