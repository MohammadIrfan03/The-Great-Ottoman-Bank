import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import client from '../api/client'
import AppShell from '../components/AppShell'

export default function Dashboard() {
  const [account, setAccount] = useState(null)
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [notice, setNotice] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true

    const load = async () => {
      try {
        const accRes = await client.get('/api/accounts/me')

        if (!mounted) return
        setAccount(accRes.data)

        try {
          const txnRes = await client.get(
            `/api/transactions/history/${accRes.data.accountNumber}`,
          )
          if (mounted) {
            setTransactions(Array.isArray(txnRes.data) ? txnRes.data.slice(0, 5) : [])
          }
        } catch {
          if (mounted) setTransactions([])
        }
      } catch (err) {
        if (!mounted) return

        if (err.response?.status === 404) {
          setNotice('You do not have an account yet.')
        } else {
          setError(err.response?.data?.message || 'Could not load your banking dashboard.')
        }
      } finally {
        if (mounted) setLoading(false)
      }
    }

    load()
    return () => { mounted = false }
  }, [])

  return (
    <AppShell title="Dashboard">
      {loading && <div className="loading-state">Loading your banking details…</div>}
      {error && <div className="form-error">{error}</div>}

      {!loading && notice && (
        <div className="empty-state card">
          <span className="empty-seal">◆</span>
          <h3>{notice}</h3>
          <p>Open your first Ottoman Bank account to begin banking.</p>
          <Link to="/accounts" className="heritage-action">Open an account →</Link>
        </div>
      )}

      {!loading && account && (
        <>
          <section className="dashboard-hero">
            <div>
              <span className="eyebrow">TOTAL BALANCE · {account.accountType}</span>
              <div className="balance-amount">
                {new Intl.NumberFormat('en-IN', {
                  style: 'currency',
                  currency: 'INR',
                }).format(Number(account.balance || 0))}
              </div>
              <div className="balance-sub">Account {account.accountNumber}</div>
            </div>
            <div className="dashboard-emblem">
              <span>1856</span>
              <small>EST.</small>
            </div>
          </section>

          <section className="quick-actions">
            <Link to="/transfer" className="quick-card">
              <span>↗</span>
              <div><strong>Transfer funds</strong><small>Send money securely</small></div>
            </Link>
            <Link to="/accounts" className="quick-card">
              <span>▣</span>
              <div><strong>Account details</strong><small>View your account</small></div>
            </Link>
            <Link to="/history" className="quick-card">
              <span>≡</span>
              <div><strong>Full history</strong><small>Review transactions</small></div>
            </Link>
          </section>

          <section className="card table-card">
            <div className="section-title">
              <div>
                <span className="section-kicker">ACCOUNT LEDGER</span>
                <h3>Recent Transactions</h3>
              </div>
              <Link to="/history" className="text-link">View all →</Link>
            </div>

            {transactions.length === 0 ? (
              <p className="muted">No transactions yet.</p>
            ) : (
              <div className="table-scroll">
                <table>
                  <thead>
                    <tr>
                      <th>Reference</th>
                      <th>Type</th>
                      <th>Status</th>
                      <th className="right">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((transaction) => {
                      const isCredit = transaction.toAccount === account.accountNumber
                      return (
                        <tr key={transaction.id}>
                          <td className="reference">{transaction.referenceNumber}</td>
                          <td>{transaction.type}</td>
                          <td>
                            <span className={`badge ${transaction.status === 'SUCCESS' ? 'success' : 'failed'}`}>
                              {transaction.status}
                            </span>
                          </td>
                          <td className={`right amount ${isCredit ? 'credit' : 'debit'}`}>
                            {isCredit ? '+' : '−'} {transaction.amount}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </>
      )}
    </AppShell>
  )
}