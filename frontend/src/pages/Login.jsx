import React, { useState } from 'react'
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Briefcase, 
  GraduationCap, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react'
import './Login.css'

export default function Login({ onNavigateToRegister }) {
  const [role, setRole] = useState('candidate') // 'candidate' | 'college'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setSuccessMsg('')

    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password.')
      return
    }

    setIsLoading(true)

    // Simulated login flow (will connect to Spring Boot /api/auth/login)
    setTimeout(() => {
      setIsLoading(false)
      setSuccessMsg(`Welcome back! Logged in as ${role === 'candidate' ? 'Job Seeker' : 'College Placement Officer'}.`)
    }, 900)
  }

  return (
    <div className="login-wrapper">
      <div className="login-container">
        
        {/* Brand Header */}
        <div className="login-brand">
          <div className="brand-logo">
            <Briefcase size={24} className="brand-icon" />
          </div>
          <span className="brand-name">GrowWoo</span>
        </div>

        {/* Card */}
        <div className="card login-card">
          <div className="login-card-header">
            <h2>Welcome back</h2>
            <p>Log in to access your verified opportunities & applications</p>
          </div>

          {/* Role Switcher Pill */}
          <div className="role-switcher">
            <button
              type="button"
              className={`role-tab ${role === 'candidate' ? 'active' : ''}`}
              onClick={() => { setRole('candidate'); setError(''); }}
            >
              <Briefcase size={16} />
              <span>Job Seeker</span>
            </button>
            <button
              type="button"
              className={`role-tab ${role === 'college' ? 'active' : ''}`}
              onClick={() => { setRole('college'); setError(''); }}
            >
              <GraduationCap size={16} />
              <span>College Portal</span>
            </button>
          </div>

          {/* Feedback messages */}
          {error && (
            <div className="alert alert-danger">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="alert alert-success">
              <CheckCircle2 size={18} />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} noValidate>
            
            {/* Email Field */}
            <div className="form-group">
              <label className="form-label" htmlFor="login-email">
                Email Address
              </label>
              <div className="input-container">
                <span className="input-icon-left">
                  <Mail size={18} />
                </span>
                <input
                  id="login-email"
                  type="email"
                  className="form-input has-icon-left"
                  placeholder={role === 'candidate' ? 'name@example.com' : 'officer@college.edu'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="form-group">
              <div className="form-label">
                <label htmlFor="login-password">Password</label>
                <a href="#forgot" className="forgot-link" onClick={(e) => e.preventDefault()}>
                  Forgot password?
                </a>
              </div>
              <div className="input-container">
                <span className="input-icon-left">
                  <Lock size={18} />
                </span>
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  className="form-input has-icon-left has-icon-right"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  className="input-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="login-options">
              <label className="form-checkbox">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember me for 30 days</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary btn-block submit-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <span>Signing in...</span>
              ) : (
                <>
                  <span>Sign in as {role === 'candidate' ? 'Candidate' : 'College'}</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Social Sign-in Divider (for Candidates) */}
          {role === 'candidate' && (
            <>
              <div className="divider">or continue with</div>
              <div className="social-actions">
                <button type="button" className="btn btn-social">
                  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span>Google</span>
                </button>
                <button type="button" className="btn btn-social">
                  <svg width="18" height="18" fill="#0A66C2" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                  </svg>
                  <span>LinkedIn</span>
                </button>
              </div>
            </>
          )}

          {/* Footer Navigation */}
          <div className="login-card-footer">
            <p>
              Don't have an account?{' '}
              <button 
                type="button" 
                className="link-button"
                onClick={onNavigateToRegister}
              >
                Create an account
              </button>
            </p>
          </div>

        </div>

        {/* Security / Trust note */}
        <p className="login-trust-note">
          Protected by verified encryption. By continuing, you agree to GrowWoo's terms of service.
        </p>

      </div>
    </div>
  )
}
