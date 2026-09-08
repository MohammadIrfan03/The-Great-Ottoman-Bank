import { useEffect, useState } from 'react'
import client from '../api/client'
import AppShell from '../components/AppShell'

export default function History() {
  const [account, setAccount] = useState(null)
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true

    const load = async () => {
      try {
        const accountResponse = await client.get('/api/accounts/me')
        if (!mounted) return

        setAccount(accountResponse.data)

        const transactionResponse = await client.get(
          `/api/transactions/history/${accountResponse.data.accountNumber}`,
        )

        if (mounted) {
          setTransactions(Array.isArray(transactionResponse.data) ? transactionResponse.data : [])
        }
      } catch (err) {
        if (mounted) {
          setTransactions([])
          setError(err.response?.data?.message || 'Could not load transaction history.')
        }
      } finally {
        if (mounted) setLoading(false)
      }
    }

    load()
    return () => { mounted = false }
  }, [])

  return (
    <AppShell title="Transaction History">
      <section className="card table-card">
        <div className="section-title">
          <div>
            <span className="section-kicker">ACCOUNT LEDGER</span>
            <h3>Transaction History</h3>
          </div>
          {account && <span className="ledger-account">{account.accountNumber}</span>}
        </div>

        {error && <div className="form-error">{error}</div>}
        {loading && <div className="loading-state">Loading transaction history…</div>}

        {!loading && !error && transactions.length === 0 && (
          <p className="muted">No transactions found.</p>
        )}

        {!loading && transactions.length > 0 && (
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Reference</th>
                  <th>Type</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th className="right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => {
                  const isCredit =
                    transaction.toAccount === account?.accountNumber

                  return (
                    <tr key={transaction.id}>
                      <td className="reference">{transaction.referenceNumber}</td>
                      <td>{transaction.type}</td>
                      <td>{transaction.fromAccount || '—'}</td>
                      <td>{transaction.toAccount || '—'}</td>
                      <td>
                        <span className={`badge ${transaction.status === 'SUCCESS' ? 'success' : 'failed'}`}>
                          {transaction.status}
                        </span>
                      </td>
                      <td>{new Date(transaction.createdAt).toLocaleString()}</td>
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
    </AppShell>
  )
}