import { useEffect, useState } from 'react'
import client from '../api/client'
import Topbar from '../components/Topbar'

export default function Accounts() {
  const [account, setAccount] = useState(null)
  const [accountType, setAccountType] = useState('SAVINGS')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [creating, setCreating] = useState(false)

  const loadAccount = async () => {
    try {
      const res = await client.get('/api/accounts/me')
      setAccount(res.data)
    } catch {
      setAccount(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadAccount()
  }, [])

  const handleCreate = async (e) => {
    e.preventDefault()
    setError('')
    setCreating(true)
    try {
      const res = await client.post('/api/accounts', { accountType })
      setAccount(res.data)
    } catch (err) {
      setError(err.response?.data?.message || 'Could not open account')
    } finally {
      setCreating(false)
    }
  }

  return (
    <>
      <Topbar title="Accounts" />
      <div className="content">
        {loading && <p>Loading…</p>}

        {!loading && account && (
          <div className="card">
            <div className="section-title">Account Details</div>
            <table>
              <tbody>
                <tr><td style={{ opacity: 0.6 }}>Account number</td><td>{account.accountNumber}</td></tr>
                <tr><td style={{ opacity: 0.6 }}>Type</td><td>{account.accountType}</td></tr>
                <tr><td style={{ opacity: 0.6 }}>Balance</td><td>{account.balance}</td></tr>
                <tr><td style={{ opacity: 0.6 }}>Status</td><td>{account.active ? 'Active' : 'Inactive'}</td></tr>
                <tr><td style={{ opacity: 0.6 }}>Opened</td><td>{new Date(account.createdAt).toLocaleDateString()}</td></tr>
              </tbody>
            </table>
          </div>
        )}

        {!loading && !account && (
          <div className="card" style={{ maxWidth: 420 }}>
            <div className="section-title">Open a New Account</div>
            {error && <div className="form-error">{error}</div>}
            <form onSubmit={handleCreate}>
              <div className="field">
                <label htmlFor="type">Account type</label>
                <select
                  id="type"
                  value={accountType}
                  onChange={(e) => setAccountType(e.target.value)}
                  style={{ width: '100%', padding: 11, border: '1px solid rgba(58,46,34,0.25)', fontSize: 14 }}
                >
                  <option value="SAVINGS">Savings</option>
                  <option value="CURRENT">Current</option>
                </select>
              </div>
              <button className="btn-primary" type="submit" disabled={creating}>
                {creating ? 'Opening…' : 'Open account'}
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  )
}