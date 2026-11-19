import React, { useState } from 'react'
import Login from './pages/Login'

export default function App() {
  const [currentPage, setCurrentPage] = useState('login')

  return (
    <main>
      {currentPage === 'login' ? (
        <Login onNavigateToRegister={() => setCurrentPage('register')} />
      ) : (
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <h2>Register Page (Coming Next)</h2>
          <p style={{ marginTop: '0.5rem', marginBottom: '1.5rem' }}>
            We'll build this according to your exact requirements next.
          </p>
          <button 
            type="button" 
            className="btn btn-secondary" 
            onClick={() => setCurrentPage('login')}
          >
            Back to Login
          </button>
        </div>
      )}
    </main>
  )
}
