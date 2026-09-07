import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Topbar({ title }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const initials = user?.fullName
    ? user.fullName.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase()
    : '?'

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div
      style={{
        height: 64,
        flexShrink: 0,
        background: 'var(--parchment)',
        borderBottom: '1px solid rgba(58,46,34,0.12)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 28px',
      }}
    >
      <h2 style={{ fontSize: 19, fontWeight: 600, color: 'var(--ink)' }}>{title}</h2>
      <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
        <button
          onClick={handleLogout}
          style={{
            background: 'none',
            border: '1px solid rgba(58,46,34,0.2)',
            padding: '7px 14px',
            fontSize: 12.5,
            color: 'var(--ink)',
          }}
        >
          Sign out
        </button>
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: '50%',
            background: 'var(--burgundy)',
            color: 'var(--parchment)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 13,
            fontWeight: 600,
            fontFamily: "'Cormorant Garamond', serif",
          }}
        >
          {initials}
        </div>
      </div>
    </div>
  )
}