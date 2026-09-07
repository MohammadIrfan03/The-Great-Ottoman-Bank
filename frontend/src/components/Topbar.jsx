import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import Seal from './Seal'

export default function Topbar({ title }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const initials = user?.fullName
    ? user.fullName
        .split(/\s+/)
        .filter(Boolean)
        .map((part) => part[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : '?'

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <header className="topbar">
      <div className="topbar-title-wrap">
        <button
          className="mobile-brand"
          onClick={() => navigate('/dashboard')}
          aria-label="Go to dashboard"
        >
          <Seal size={38} />
        </button>
        <div>
          <div className="topbar-kicker">THE GREAT OTTOMAN BANK</div>
          <h2>{title}</h2>
        </div>
      </div>

      <div className="topbar-user">
        <div className="topbar-user-copy">
          <strong>{user?.fullName || 'Account holder'}</strong>
          <span>{user?.email || ''}</span>
        </div>
        <div className="avatar" aria-label="User profile">
          {initials}
        </div>
        <button className="signout-btn" onClick={handleLogout}>
          Sign out
        </button>
      </div>
    </header>
  )
}