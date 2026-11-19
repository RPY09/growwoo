import React, { useState } from 'react'
import Login from './pages/Login'
import Register from './pages/Register'

export default function App() {
  const [currentPage, setCurrentPage] = useState('login')

  return (
    <main>
      {currentPage === 'login' ? (
        <Login onNavigateToRegister={() => setCurrentPage('register')} />
      ) : (
        <Register onNavigateToLogin={() => setCurrentPage('login')} />
      )}
    </main>
  )
}
