import { useState } from 'react'
import client from '../api/client'
import AppShell from '../components/AppShell'

const modes = ['transfer', 'deposit', 'withdraw']

export default function Transfer() {
  const [mode, setMode] = useState('transfer')
  const [fromAccountNumber, setFromAccountNumber] = useState('')
  const [toAccountNumber, setToAccountNumber] = useState('')
  const [accountNumber, setAccountNumber] = useState('')
  const [amount, setAmount] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const switchMode = (nextMode) => {
    setMode(nextMode)
    setResult(null)
    setError('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setResult(null)

    const numericAmount = Number(amount)
    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      setError('Enter a valid amount greater than zero.')
      return
    }

    setLoading(true)

    try {
      let response

      if (mode === 'transfer') {
        response = await client.post('/api/transactions/transfer', {
          fromAccountNumber: fromAccountNumber.trim(),
          toAccountNumber: toAccountNumber.trim(),
          amount: numericAmount,
        })
      } else if (mode === 'deposit') {
        response = await client.post('/api/transactions/deposit', {
          accountNumber: accountNumber.trim(),
          amount: numericAmount,
        })
      } else {
        response = await client.post('/api/transactions/withdraw', {
          accountNumber: accountNumber.trim(),
          amount: numericAmount,
        })
      }

      setResult(response.data)
      setAmount('')
    } catch (err) {
      setError(err.response?.data?.message || 'Transaction failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AppShell title="Transfer Funds">
      <section className="card transaction-card">
        <div className="section-title transaction-heading">
          <div>
            <span className="section-kicker">SECURE TRANSACTION</span>
            <h3>Move Money</h3>
          </div>
        </div>

        <div className="transaction-tabs">
          {modes.map((item) => (
            <button
              key={item}
              className={mode === item ? 'active' : ''}
              onClick={() => switchMode(item)}
              type="button"
            >
              {item}
            </button>
          ))}
        </div>

        {error && <div className="form-error">{error}</div>}

        {result && (
          <div className="success-panel">
            <span className="success-mark">✓</span>
            <div>
              <strong>Transaction successful</strong>
              <p>Reference: {result.referenceNumber} · Status: {result.status}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="transaction-form">
          {mode === 'transfer' ? (
            <>
              <div className="field">
                <label htmlFor="fromAccount">From account</label>
                <input
                  id="fromAccount"
                  value={fromAccountNumber}
                  onChange={(e) => setFromAccountNumber(e.target.value)}
                  placeholder="OB..."
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="toAccount">To account</label>
                <input
                  id="toAccount"
                  value={toAccountNumber}
                  onChange={(e) => setToAccountNumber(e.target.value)}
                  placeholder="OB..."
                  required
                />
              </div>
            </>
          ) : (
            <div className="field">
              <label htmlFor="accountNumber">Account number</label>
              <input
                id="accountNumber"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                placeholder="OB..."
                required
              />
            </div>
          )}

          <div className="field">
            <label htmlFor="amount">Amount</label>
            <div className="amount-input">
              <span>₹</span>
              <input
                id="amount"
                type="number"
                min="0.01"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                required
              />
            </div>
          </div>

          <button className="heritage-action full" type="submit" disabled={loading}>
            {loading ? 'Processing…' : `Confirm ${mode} →`}
          </button>
        </form>
      </section>
    </AppShell>
  )
}