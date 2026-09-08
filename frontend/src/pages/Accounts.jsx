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

  useEffect(() => { loadAccount() }, [])

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
            <table className="data-table">
              <tbody>
                <tr><td className="muted-label">Account number</td><td className="financial-number">{account.accountNumber}</td></tr>
                <tr><td className="muted-label">Type</td><td>{account.accountType}</td></tr>
                <tr><td className="muted-label">Balance</td><td className="financial-number">{account.balance}</td></tr>
                <tr><td className="muted-label">Status</td><td>{account.active ? 'Active' : 'Inactive'}</td></tr>
                <tr><td className="muted-label">Opened</td><td className="financial-number">{new Date(account.createdAt).toLocaleDateString()}</td></tr>
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
                <select id="type" value={accountType} onChange={(e) => setAccountType(e.target.value)}>
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
