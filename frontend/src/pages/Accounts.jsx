import { useEffect, useState } from 'react'
import client from '../api/client'
import AppShell from '../components/AppShell'

export default function Accounts() {
  const [account, setAccount] = useState(null)
  const [accountType, setAccountType] = useState('SAVINGS')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [creating, setCreating] = useState(false)

  const loadAccount = async () => {
    setLoading(true)
    setError('')

    try {
      const response = await client.get('/api/accounts/me')
      setAccount(response.data)
    } catch (err) {
      if (err.response?.status === 404) {
        setAccount(null)
      } else {
        setError(err.response?.data?.message || 'Could not load account details.')
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadAccount()
  }, [])

  const handleCreate = async (event) => {
    event.preventDefault()
    setError('')
    setCreating(true)

    try {
      const response = await client.post('/api/accounts', { accountType })
      setAccount(response.data)
    } catch (err) {
      setError(err.response?.data?.message || 'Could not open account')
    } finally {
      setCreating(false)
    }
  }

  return (
    <AppShell title="Accounts">
      {loading && <div className="loading-state">Loading account details…</div>}

      {!loading && account && (
        <section className="card account-card">
          <div className="account-card-head">
            <div>
              <span className="section-kicker">ACCOUNT CERTIFICATE</span>
              <h3>Account Details</h3>
            </div>
            <span className="status-seal">ACTIVE</span>
          </div>

          <div className="account-grid">
            <div><span>Account number</span><strong>{account.accountNumber}</strong></div>
            <div><span>Type</span><strong>{account.accountType}</strong></div>
            <div><span>Balance</span><strong>₹ {Number(account.balance || 0).toLocaleString('en-IN')}</strong></div>
            <div><span>Status</span><strong>{account.active ? 'Active' : 'Inactive'}</strong></div>
            <div><span>Opened</span><strong>{new Date(account.createdAt).toLocaleDateString()}</strong></div>
          </div>
        </section>
      )}

      {!loading && !account && (
        <section className="card open-account-card">
          <span className="section-kicker">BEGIN YOUR LEGACY</span>
          <h3>Open a New Account</h3>
          <p>Select an account type and open it through the live banking API.</p>

          {error && <div className="form-error">{error}</div>}

          <form onSubmit={handleCreate}>
            <div className="field">
              <label htmlFor="type">Account type</label>
              <select
                id="type"
                value={accountType}
                onChange={(e) => setAccountType(e.target.value)}
              >
                <option value="SAVINGS">Savings</option>
                <option value="CURRENT">Current</option>
              </select>
            </div>

            <button className="heritage-action full" type="submit" disabled={creating}>
              {creating ? 'Opening…' : 'Open account →'}
            </button>
          </form>
        </section>
      )}
    </AppShell>
  )
}