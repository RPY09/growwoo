import React, { useState } from 'react'
import { 
  Eye, 
  EyeOff, 
  Briefcase, 
  Clock, 
  CheckCircle2, 
  Sparkles,
  AlertCircle,
  ArrowLeft
} from 'lucide-react'
import './Login.css'

export default function Login({ onNavigateToRegister }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  
  // Forgot password mode
  const [isForgotPassword, setIsForgotPassword] = useState(false)
  const [resetEmail, setResetEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setSuccessMsg('')

    if (!email.trim() || !password.trim()) {
      setError('Please enter both your email address and password.')
      return
    }

    setIsLoading(true)

    // Simulated login flow (will connect to Spring Boot /api/auth/login)
    setTimeout(() => {
      setIsLoading(false)
      setSuccessMsg('Welcome back! You have successfully signed in.')
    }, 700)
  }

  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault()
    setError('')
    setSuccessMsg('')

    if (!resetEmail.trim()) {
      setError('Please enter your email address to receive recovery instructions.')
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setSuccessMsg(`Recovery instructions have been sent to ${resetEmail}.`)
    }, 800)
  }

  return (
    <div className="auth-viewport">
      {/* Outer Device/Canvas Frame */}
      <div className="auth-frame">
        
        {/* Left Side: Modern Workspace Illustration Scene */}
        <div className="auth-illustration-side">
          <div className="scene-container">
            
            {/* Wall Clock */}
            <div className="scene-clock">
              <Clock size={20} className="clock-icon" />
              <div className="clock-hand hour-hand"></div>
              <div className="clock-hand minute-hand"></div>
            </div>

            {/* Floating Feature Badges */}
            <div className="scene-badge badge-top">
              <CheckCircle2 size={16} className="badge-icon-verified" />
              <span>Verified Jobs Only</span>
            </div>

            <div className="scene-badge badge-bottom">
              <Sparkles size={16} className="badge-icon-sparkle" />
              <span>98% Candidate Match</span>
            </div>

            {/* 3D-styled SVG Workspace Illustration */}
            <svg 
              className="workspace-svg" 
              viewBox="0 0 480 420" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              {/* Floor Shadow */}
              <ellipse cx="240" cy="385" rx="190" ry="22" fill="rgba(15, 23, 42, 0.08)" />

              {/* Plant Pot on Floor */}
              <ellipse cx="380" cy="365" rx="28" ry="10" fill="rgba(15, 23, 42, 0.12)" />
              <path d="M360 330 L365 375 Q380 380 395 375 L400 330 Z" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="2" />
              {/* Plant Leaves */}
              <path d="M380 330 Q370 280 375 220 Q388 280 380 330 Z" fill="#10b981" />
              <path d="M375 330 Q360 270 350 240 Q370 290 375 330 Z" fill="#059669" />
              <path d="M385 330 Q405 275 410 235 Q395 290 385 330 Z" fill="#34d399" />

              {/* Office Chair Base */}
              <ellipse cx="240" cy="355" rx="42" ry="10" fill="rgba(15, 23, 42, 0.15)" />
              <path d="M236 310 L236 345 M244 310 L244 345" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
              <path d="M240 345 L210 355 M240 345 L270 355 M240 345 L240 360" stroke="#64748b" strokeWidth="4" strokeLinecap="round" />
              {/* Chair Backrest */}
              <rect x="205" y="200" width="70" height="95" rx="16" fill="#64748b" />
              <rect x="212" y="208" width="56" height="80" rx="10" fill="#475569" />

              {/* Character: Torso & Sweater */}
              <path d="M210 265 Q240 250 270 265 L275 330 L205 330 Z" fill="#4f46e5" />
              
              {/* Character: Arms typing */}
              <path d="M210 275 Q190 295 205 315 L230 310" stroke="#4338ca" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <path d="M270 275 Q290 295 275 315 L250 310" stroke="#4338ca" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              
              {/* Character: Head & Hair */}
              <circle cx="240" cy="180" r="26" fill="#fcd34d" />
              {/* Hair */}
              <path d="M216 178 Q222 152 240 152 Q258 152 264 178 Q252 165 240 166 Q228 165 216 178 Z" fill="#78350f" />
              {/* Glasses */}
              <rect x="224" y="174" width="13" height="9" rx="2" stroke="#1e293b" strokeWidth="2.2" fill="none" />
              <rect x="243" y="174" width="13" height="9" rx="2" stroke="#1e293b" strokeWidth="2.2" fill="none" />
              <line x1="237" y1="178" x2="243" y2="178" stroke="#1e293b" strokeWidth="2.2" />
              {/* Beard/Smile */}
              <path d="M232 192 Q240 200 248 192" stroke="#78350f" strokeWidth="3" strokeLinecap="round" fill="none" />

              {/* Modern Desk */}
              {/* Desk Legs */}
              <path d="M120 300 L120 380 M350 300 L350 380" stroke="#ffffff" strokeWidth="8" strokeLinecap="round" />
              <path d="M115 380 L140 380 M335 380 L360 380" stroke="#cbd5e1" strokeWidth="6" strokeLinecap="round" />
              {/* Desk Top */}
              <path d="M90 295 Q90 285 105 285 L375 285 Q390 285 390 295 L380 305 Q375 310 365 310 L105 310 Q95 310 90 305 Z" fill="#0f172a" />
              <path d="M98 285 L372 285 L365 292 L105 292 Z" fill="#1e293b" />

              {/* Laptop on Desk */}
              <path d="M190 302 L280 302 L275 298 L195 298 Z" fill="#cbd5e1" />
              <rect x="200" y="240" width="70" height="58" rx="4" fill="#334155" />
              <rect x="204" y="244" width="62" height="50" rx="2" fill="#0284c7" />
              {/* Laptop Screen Content Lines */}
              <line x1="210" y1="252" x2="235" y2="252" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
              <line x1="210" y1="259" x2="256" y2="259" stroke="#93c5fd" strokeWidth="2" strokeLinecap="round" />
              <line x1="210" y1="266" x2="248" y2="266" stroke="#93c5fd" strokeWidth="2" strokeLinecap="round" />
              <line x1="210" y1="273" x2="230" y2="273" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />

              {/* Coffee Mug on Desk */}
              <rect x="310" y="280" width="16" height="18" rx="3" fill="#6366f1" />
              <path d="M326 284 Q333 289 326 294" stroke="#6366f1" strokeWidth="2.5" fill="none" />
              {/* Steam */}
              <path d="M315 275 Q318 270 315 265" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
              <path d="M320 274 Q323 268 320 263" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            </svg>

          </div>
        </div>

        {/* Right Side: Floating Rounded Card */}
        <div className="auth-card-side">
          <div className="auth-card">
            
            {/* Brand Logo & Name */}
            <div className="auth-brand">
              <div className="auth-brand-badge">
                <Briefcase size={20} className="auth-brand-icon" />
              </div>
              <span className="auth-brand-text">GrowWoo</span>
            </div>

            {/* Error & Success Alerts */}
            {error && (
              <div className="alert alert-danger">
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            {successMsg && (
              <div className="alert alert-success">
                <CheckCircle2 size={16} />
                <span>{successMsg}</span>
              </div>
            )}

            {isForgotPassword ? (
              /* ================= FORGOT PASSWORD VIEW ================= */
              <div>
                <div className="auth-header">
                  <h1 className="auth-title">Reset password</h1>
                  <p className="auth-subtitle">
                    Enter your registered email and we'll send you recovery instructions.
                  </p>
                </div>

                <form onSubmit={handleForgotPasswordSubmit} noValidate className="auth-form">
                  <div className="form-group-pill">
                    <input
                      type="email"
                      className="input-pill"
                      placeholder="Email address"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      autoComplete="email"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-pill-submit"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Sending...' : 'Send reset link'}
                  </button>
                </form>

                <div className="auth-bottom-nav back-to-login-row">
                  <button 
                    type="button" 
                    className="back-link-btn"
                    onClick={() => {
                      setIsForgotPassword(false)
                      setError('')
                      setSuccessMsg('')
                    }}
                  >
                    <ArrowLeft size={14} />
                    <span>Back to Sign in</span>
                  </button>
                </div>
              </div>
            ) : (
              /* ================= STANDARD LOGIN VIEW ================= */
              <div>
                {/* Big Heading */}
                <div className="auth-header">
                  <h1 className="auth-title">Welcome back</h1>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit} noValidate className="auth-form">
                  
                  {/* Email Address Input */}
                  <div className="form-group-pill">
                    <input
                      type="email"
                      className="input-pill"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      required
                    />
                  </div>

                  {/* Password Input with Eye Toggle */}
                  <div className="form-group-pill password-wrapper">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="input-pill"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="current-password"
                      required
                    />
                    <button
                      type="button"
                      className="password-toggle-btn"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>

                  {/* Forgot Password Row */}
                  <div className="forgot-password-row">
                    <button
                      type="button"
                      className="forgot-password-link"
                      onClick={() => {
                        setIsForgotPassword(true)
                        setError('')
                        setSuccessMsg('')
                        setResetEmail(email)
                      }}
                    >
                      Forgot password?
                    </button>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="btn-pill-submit"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Signing in...' : 'Sign in'}
                  </button>
                </form>

                {/* Social Divider */}
                <div className="auth-social-divider">
                  <span>or sign in with</span>
                </div>

                {/* 3 Rounded Social Icons */}
                <div className="auth-social-row">
                  {/* Google */}
                  <button type="button" className="social-icon-btn" title="Sign in with Google">
                    <svg width="20" height="20" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </svg>
                  </button>

                  {/* LinkedIn */}
                  <button type="button" className="social-icon-btn" title="Sign in with LinkedIn">
                    <svg width="20" height="20" fill="#0A66C2" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                    </svg>
                  </button>

                  {/* GitHub */}
                  <button type="button" className="social-icon-btn" title="Sign in with GitHub">
                    <svg width="20" height="20" fill="#0f172a" viewBox="0 0 24 24">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                    </svg>
                  </button>
                </div>

                {/* Disclaimer */}
                <p className="auth-disclaimer">
                  By signing in you agree to GrowWoo's{' '}
                  <a href="#terms" onClick={(e) => e.preventDefault()}>Terms of Services</a> and{' '}
                  <a href="#privacy" onClick={(e) => e.preventDefault()}>Privacy Policy</a>.
                </p>

                {/* Bottom Navigation */}
                <div className="auth-bottom-nav">
                  <span>Don't have an account? </span>
                  <button 
                    type="button" 
                    className="auth-link-btn"
                    onClick={onNavigateToRegister}
                  >
                    Sign up
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  )
}
