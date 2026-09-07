import { NavLink } from 'react-router-dom'
import Seal from './Seal'
import { useAuth } from '../context/AuthContext'

const items = [
  { to: '/dashboard', label: 'Dashboard', icon: '⌂' },
  { to: '/accounts', label: 'Accounts', icon: '▣' },
  { to: '/transfer', label: 'Transfer Funds', icon: '↗' },
  { to: '/history', label: 'Transaction History', icon: '≡' },
]

export default function Sidebar() {
  const { user } = useAuth()

  return (
    <aside className="sidebar">
      <NavLink to="/dashboard" className="sidebar-brand">
        <Seal size={62} />
        <span className="sidebar-brand-name">THE GREAT<br />OTTOMAN BANK</span>
        <span className="sidebar-brand-sub">TRADITION • TRUST • PROSPERITY</span>
      </NavLink>

      <div className="sidebar-rule" />

      <nav className="sidebar-nav" aria-label="Primary navigation">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `sidebar-link${isActive ? ' active' : ''}`
            }
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <div className="sidebar-legacy">A LEGACY OF TRUST SINCE 1856</div>
        <div className="sidebar-user">
          <span className="sidebar-user-name">{user?.fullName}</span>
          <span className="sidebar-user-role">{user?.role || 'CUSTOMER'}</span>
        </div>
      </div>
    </aside>
  )
}