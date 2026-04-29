import React from 'react'

const Dashboard = () => {

    const handleLogout = async () => {
  // Call backend to clear cookie
  await fetch('http://localhost:3000/auth/logout', {
    method: 'POST',
    credentials: 'include'
  })

  localStorage.removeItem('token')
  localStorage.removeItem('refreshToken')

  window.location.href = '/login'
}


  return (
    <div><button onClick={handleLogout}>Logout</button></div>
  )
}

export default Dashboard