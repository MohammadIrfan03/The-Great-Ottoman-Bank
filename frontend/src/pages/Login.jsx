import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Seal from '../components/Seal'

function EyeIcon({ hidden }) {
  return hidden ? (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 3l18 18M10.6 10.6a2 2 0 002.8 2.8M9.9 5.1A10.8 10.8 0 0112 5c5.2 0 8.6 3.6 10 7-0.5 1.2-1.3 2.5-2.3 3.6M6.2 6.2C4.6 7.4 3.5 9 2 12c1.4 3.4 4.8 7 10 7 1.1 0 2.2-.2 3.1-.5" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" />
      <circle cx="12" cy="12" r="2.5" />
    </svg>
  )
}

export default function Login() {
  const [email, setEmail] = useState(() => localStorage.getItem('ottoman_remembered_email') || '')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(
    () => Boolean(localStorage.getItem('ottoman_remembered_email')),
  )
  const [showPassword, setShowPassword] = useState(false)
  const [language, setLanguage] = useState('EN')
  const [error, setError] = useState('')
  const [info, setInfo] = useState('')
  const [loading, setLoading] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (localStorage.getItem('ottoman_token')) {
      navigate('/dashboard', { replace: true })
    }
  }, [navigate])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setInfo('')
    setLoading(true)

    try {
      await login(email.trim(), password)

      if (remember) {
        localStorage.setItem('ottoman_remembered_email', email.trim())
      } else {
        localStorage.removeItem('ottoman_remembered_email')
      }

      const destination = location.state?.from || '/dashboard'
      navigate(destination, { replace: true })
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          'Invalid email or password',
      )
    } finally {
      setLoading(false)
    }
  }

  const handleForgotPassword = () => {
    setError('')
    setInfo(
      'Password recovery is not enabled by the current backend contract. Please contact the bank administrator.',
    )
  }

  return (
    <div className="auth-page">
      <header className="heritage-header">
        <Link to="/login" className="heritage-brand" aria-label="The Great Ottoman Bank home">
          <Seal size={54} />
          <div>
            <div className="heritage-title">THE GREAT OTTOMAN BANK</div>
            <div className="heritage-motto">- TRADITION&nbsp;&nbsp; • &nbsp;&nbsp;TRUST&nbsp;&nbsp; • &nbsp;&nbsp;PROSPERITY -</div>
          </div>
        </Link>

        <div className="heritage-actions">
          <span className="legacy-copy">A Legacy of Trust Since 1856</span>
          <span className="header-divider" />
          <label className="language-control">
            <span className="globe-icon">◎</span>
            <select value={language} onChange={(e) => setLanguage(e.target.value)} aria-label="Language">
              <option value="EN">EN</option>
              <option value="TR">TR</option>
              <option value="AR">AR</option>
            </select>
            <span className="chevron">⌄</span>
          </label>
        </div>
      </header>

      <section className="login-hero">
        <div className="hero-overlay" />

        <div className="login-card">
          <div className="corner corner-tl" />
          <div className="corner corner-tr" />
          <div className="corner corner-bl" />
          <div className="corner corner-br" />

          <div className="login-card-head">
            <div className="card-emblem-wrap">
              <Seal size={92} />
            </div>
            <h1>THE GREAT OTTOMAN BANK</h1>
            <p>More Than a Bank, A Legacy</p>
            <div className="ornament">
              <span />
              <b>◆</b>
              <span />
            </div>
          </div>

          {error && <div className="form-error">{error}</div>}
          {info && <div className="form-info">{info}</div>}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="field">
              <label htmlFor="email">Username</label>
              <div className="input-shell">
                <span className="input-icon user-icon" aria-hidden="true">♙</span>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your username"
                  required
                />
              </div>
            </div>

            <div className="field">
              <label htmlFor="password">Password</label>
              <div className="input-shell">
                <span className="input-icon lock-icon" aria-hidden="true">♙</span>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword((value) => !value)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  <EyeIcon hidden={showPassword} />
                </button>
              </div>
            </div>

            <div className="login-options">
              <label className="remember-control">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                <span className="custom-check">✓</span>
                <span>Remember me</span>
              </label>

              <button
                type="button"
                className="forgot-btn"
                onClick={handleForgotPassword}
              >
                Forgot password?
              </button>
            </div>

            <button className="login-submit" type="submit" disabled={loading}>
              <span>{loading ? 'AUTHENTICATING' : 'LOGIN'}</span>
              <span className="login-arrow">→</span>
            </button>
          </form>

          <div className="card-bottom">
            <div className="ornament compact">
              <span />
              <b>◆</b>
              <span />
            </div>
            <div className="secure-line">
              <span>✦</span>
              Secure Banking
              <i>•</i>
              Your Trust, Our Priority
              <span>✦</span>
            </div>
            <div className="register-line">
              New to Ottoman Bank? <Link to="/register">Open an account</Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="heritage-footer">
        <div className="footer-left">
          <span className="footer-building">▥</span>
          <span>Istanbul</span>
          <i>•</i>
          <span>Ottoman Empire</span>
          <i>•</i>
          <span>1856</span>
        </div>
        <div className="footer-quote">
          “Commerce builds nations, and trust builds empires.”
          <div className="footer-ornament">──── ◇ ────</div>
        </div>
      </footer>
    </div>
  )
}