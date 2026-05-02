export const getToken = () => localStorage.getItem('token')
export const getRefreshToken = () => localStorage.getItem('refreshToken')
export const setTokens = (token: string, refreshToken: string) => {
  localStorage.setItem('token', token)
  localStorage.setItem('refreshToken', refreshToken)
}
export const clearTokens = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('refreshToken')
}
export const isLoggedIn = () => !!localStorage.getItem('token')