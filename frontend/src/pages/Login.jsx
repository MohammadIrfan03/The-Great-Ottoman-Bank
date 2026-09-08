import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Seal from '../components/Seal'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(true)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(email, password)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-screen">
      <header className="login-brandbar">
        <div className="brand-left">
          <div className="brand-mini-mark">☪</div>
          <div>
            <div className="brand-name">THE GREAT OTTOMAN BANK</div>
            <div className="brand-motto">TRADITION <span>•</span> TRUST <span>•</span> PROSPERITY</div>
          </div>
        </div>

        <div className="brand-right">
          <span>A Legacy of Trust Since 1856</span>
          <span className="brand-divider" />
          <span className="language">◎ &nbsp;EN⌄</span>
        </div>
      </header>

      <main className="login-stage">
        <section className="login-card">
          <div className="login-card-inner">
            <div className="login-head">
              <Seal size={154} />
              <h1>THE GREAT OTTOMAN BANK</h1>
              <p className="login-tagline">More Than a Bank, A Legacy</p>
              <div className="ornament">
                <span />
                <b>◆</b>
                <span />
              </div>
            </div>

            {error && <div className="form-error">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="field">
                <label htmlFor="email">Username</label>
                <div className="input-wrap">
                  <span className="input-icon">♙</span>
                  <input
                    id="email"
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
                <div className="input-wrap">
                  <span className="input-icon">♙</span>
                  <input
                    id="password"
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
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? '◉' : '◌'}
                  </button>
                </div>
              </div>

              <div className="login-options">
                <label className="remember">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                  />
                  <span>Remember me</span>
                </label>
                <span className="forgot-password">Forgot password?</span>
              </div>

              <button className="btn-primary login-button" type="submit" disabled={loading}>
                <span>{loading ? 'SIGNING IN…' : 'LOGIN'}</span>
                <span className="login-arrow">→</span>
              </button>
            </form>

            <div className="login-foot">
              <span>✦</span>
              <span>Secure Banking</span>
              <b>•</b>
              <span>Your Trust, Our Priority</span>
              <span>✦</span>
            </div>

            <div className="register-prompt">
              New to Ottoman Bank? <Link to="/register">Open an account</Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="login-footer">
        <div className="footer-left">
          <span className="footer-icon">♜</span>
          <span>Istanbul</span>
          <b>•</b>
          <span>Ottoman Empire</span>
          <b>•</b>
          <span>1856</span>
        </div>
        <div className="footer-quote">
          “Commerce builds nations, and trust builds empires.”
          <div className="footer-rule">───── ◇ ─────</div>
        </div>
      </footer>
    </div>
  )
}
