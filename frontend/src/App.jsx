import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Accounts from './pages/Accounts'
import Transfer from './pages/Transfer'
import History from './pages/History'
import ProtectedRoute from './components/ProtectedRoute'

function ProtectedPage({ children }) {
  return <ProtectedRoute>{children}</ProtectedRoute>
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/dashboard" element={<ProtectedPage><Dashboard /></ProtectedPage>} />
      <Route path="/accounts" element={<ProtectedPage><Accounts /></ProtectedPage>} />
      <Route path="/transfer" element={<ProtectedPage><Transfer /></ProtectedPage>} />
      <Route path="/history" element={<ProtectedPage><History /></ProtectedPage>} />

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}