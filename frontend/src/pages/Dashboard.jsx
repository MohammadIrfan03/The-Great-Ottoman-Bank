import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import client from '../api/client'
import Topbar from '../components/Topbar'

export default function Dashboard() {
  const [account, setAccount] = useState(null)
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [notice, setNotice] = useState('')

  useEffect(() => {
    const load = async () => {
      try {
        const accRes = await client.get('/api/accounts/me')
        setAccount(accRes.data)

        try {
          const txnRes = await client.get(`/api/transactions/history/${accRes.data.accountNumber}`)
          setTransactions(txnRes.data.slice(0, 5))
        } catch {
          setTransactions([])
        }
      } catch (err) {
        if (err.response?.status === 404) {
          setNotice('You do not have an account yet.')
        }
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <>
      <Topbar title="Dashboard" />
      <div className="content">
        {loading && <p>Loading…</p>}

        {!loading && notice && (
          <div className="card" style={{ textAlign: 'center', padding: 40 }}>
            <p style={{ marginBottom: 16 }}>{notice}</p>
            <Link to="/accounts" className="btn-primary" style={{ display: 'inline-block', width: 'auto', padding: '10px 20px', textDecoration: 'none' }}>
              Open an account
            </Link>
          </div>
        )}

        {!loading && account && (
          <>
            <div className="card balance-card" style={{ marginBottom: 24 }}>
              <div className="balance-label">TOTAL BALANCE &middot; {account.accountType}</div>
              <div className="balance-amount">
                {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(account.balance)}
              </div>
              <div className="balance-sub">Account {account.accountNumber}</div>
            </div>

            <div className="card">
              <div className="section-title">
                Recent Transactions
                <Link to="/history" style={{ fontSize: 12.5, fontWeight: 500, color: 'var(--navy)', textDecoration: 'none' }}>
                  View all
                </Link>
              </div>
              {transactions.length === 0 ? (
                <p style={{ fontSize: 13.5, opacity: 0.6 }}>No transactions yet.</p>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>Reference</th>
                      <th>Type</th>
                      <th>Status</th>
                      <th style={{ textAlign: 'right' }}>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((t) => {
                      const isCredit = t.toAccount === account.accountNumber
                      return (
                        <tr key={t.id}>
                          <td>{t.referenceNumber}</td>
                          <td>{t.type}</td>
                          <td>
                            <span className={`badge ${t.status === 'SUCCESS' ? 'success' : 'failed'}`}>
                              {t.status}
                            </span>
                          </td>
                          <td style={{ textAlign: 'right' }} className={isCredit ? 'amt-credit' : 'amt-debit'}>
                            {isCredit ? '+' : '−'} {t.amount}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}
      </div>
    </>
  )
}