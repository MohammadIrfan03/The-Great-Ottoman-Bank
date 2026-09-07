import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Seal from './Seal'

const navItems = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/accounts', label: 'Accounts' },
  { to: '/transfer', label: 'Transfer Funds' },
  { to: '/history', label: 'Transaction History' },
]

export default function Sidebar() {
  const { user } = useAuth()

  return (
    <aside
      className="sidebar"
      style={{
        width: 236,
        flexShrink: 0,
        background: 'var(--espresso)',
        color: 'var(--gold-soft)',
        display: 'flex',
        flexDirection: 'column',
        padding: '22px 0',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '0 20px 22px',
          borderBottom: '1px solid rgba(201,162,75,0.2)',
          marginBottom: 14,
        }}
      >
        <Seal size={40} />
        <div style={{ fontFamily: "'Cormorant Garamond', serif", lineHeight: 1.15 }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--parchment)' }}>Ottoman Bank</div>
          <div style={{ fontSize: 10.5, letterSpacing: '0.06em', color: 'var(--gold)', opacity: 0.85 }}>
            SANCAK ONLINE
          </div>
        </div>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: 2, padding: '0 12px' }}>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              padding: '10px 12px',
              fontSize: 13.5,
              fontWeight: 500,
              color: isActive ? 'var(--parchment)' : '#C9BBA1',
              textDecoration: 'none',
              borderLeft: isActive ? '2px solid var(--gold)' : '2px solid transparent',
              background: isActive ? 'rgba(201,162,75,0.12)' : 'transparent',
            })}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div
        style={{
          marginTop: 'auto',
          padding: '16px 20px 0',
          borderTop: '1px solid rgba(201,162,75,0.15)',
          fontSize: 11.5,
          color: '#8a7d68',
        }}
      >
        Logged in as
        <br />
        <strong style={{ color: '#C9BBA1' }}>{user?.fullName}</strong>
      </div>
    </aside>
  )
}