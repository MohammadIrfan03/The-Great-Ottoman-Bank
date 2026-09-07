import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Seal from '../components/Seal'

export default function Register() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      await register(fullName.trim(), email.trim(), password)
      navigate('/dashboard', { replace: true })
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          'Could not create account',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <header className="heritage-header">
        <Link to="/login" className="heritage-brand">
          <Seal size={54} />
          <div>
            <div className="heritage-title">THE GREAT OTTOMAN BANK</div>
            <div className="heritage-motto">- TRADITION • TRUST • PROSPERITY -</div>
          </div>
        </Link>
        <div className="heritage-actions">
          <span className="legacy-copy">A Legacy of Trust Since 1856</span>
          <span className="header-divider" />
          <span className="language-static">◎ &nbsp;EN⌄</span>
        </div>
      </header>

      <section className="login-hero">
        <div className="hero-overlay" />

        <div className="login-card register-card">
          <div className="corner corner-tl" />
          <div className="corner corner-tr" />
          <div className="corner corner-bl" />
          <div className="corner corner-br" />

          <div className="login-card-head">
            <Seal size={86} />
            <h1>OPEN AN ACCOUNT</h1>
            <p>THE GREAT OTTOMAN BANK</p>
            <div className="ornament"><span /><b>◆</b><span /></div>
          </div>

          {error && <div className="form-error">{error}</div>}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="field">
              <label htmlFor="fullName">Full name</label>
              <div className="input-shell">
                <input
                  id="fullName"
                  type="text"
                  autoComplete="name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Suleyman Kanuni"
                  required
                />
              </div>
            </div>

            <div className="field">
              <label htmlFor="register-email">Email</label>
              <div className="input-shell">
                <input
                  id="register-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  required
                />
              </div>
            </div>

            <div className="field">
              <label htmlFor="register-password">Password</label>
              <div className="input-shell">
                <input
                  id="register-password"
                  type="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  minLength={8}
                  required
                />
              </div>
            </div>

            <button className="login-submit" type="submit" disabled={loading}>
              <span>{loading ? 'CREATING ACCOUNT' : 'CREATE ACCOUNT'}</span>
              <span className="login-arrow">→</span>
            </button>
          </form>

          <div className="card-bottom">
            <div className="secure-line">
              <span>✦</span> Secure Banking <i>•</i> Your Trust, Our Priority <span>✦</span>
            </div>
            <div className="register-line">
              Already banking with us? <Link to="/login">Sign in</Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="heritage-footer">
        <div className="footer-left">
          <span className="footer-building">▥</span>
          <span>Istanbul</span><i>•</i><span>Ottoman Empire</span><i>•</i><span>1856</span>
        </div>
        <div className="footer-quote">
          “Commerce builds nations, and trust builds empires.”
        </div>
      </footer>
    </div>
  )
}