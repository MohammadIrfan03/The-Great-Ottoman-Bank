import { useEffect, useState } from 'react'
import client from '../api/client'
import Topbar from '../components/Topbar'

export default function History() {
  const [account, setAccount] = useState(null)
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const accRes = await client.get('/api/accounts/me')
        setAccount(accRes.data)
        const txnRes = await client.get(`/api/transactions/history/${accRes.data.accountNumber}`)
        setTransactions(txnRes.data)
      } catch {
        setTransactions([])
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <>
      <Topbar title="Transaction History" />
      <div className="content">
        <div className="card">
          {loading && <p>Loading…</p>}
          {!loading && transactions.length === 0 && (
            <p style={{ fontSize: 13.5, opacity: 0.6 }}>No transactions found.</p>
          )}
          {!loading && transactions.length > 0 && (
            <table>
              <thead>
                <tr>
                  <th>Reference</th>
                  <th>Type</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th style={{ textAlign: 'right' }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((t) => {
                  const isCredit = t.toAccount === account?.accountNumber
                  return (
                    <tr key={t.id}>
                      <td>{t.referenceNumber}</td>
                      <td>{t.type}</td>
                      <td>{t.fromAccount || '—'}</td>
                      <td>{t.toAccount || '—'}</td>
                      <td>
                        <span className={`badge ${t.status === 'SUCCESS' ? 'success' : 'failed'}`}>
                          {t.status}
                        </span>
                      </td>
                      <td>{new Date(t.createdAt).toLocaleString()}</td>
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
      </div>
    </>
  )
}