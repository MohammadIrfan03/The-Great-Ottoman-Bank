import { useState } from 'react'
import client from '../api/client'
import Topbar from '../components/Topbar'

export default function Transfer() {
  const [mode, setMode] = useState('transfer') // transfer | deposit | withdraw
  const [fromAccountNumber, setFromAccountNumber] = useState('')
  const [toAccountNumber, setToAccountNumber] = useState('')
  const [accountNumber, setAccountNumber] = useState('')
  const [amount, setAmount] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setResult(null)
    setLoading(true)
    try {
      let res
      if (mode === 'transfer') {
        res = await client.post('/api/transactions/transfer', {
          fromAccountNumber,
          toAccountNumber,
          amount: Number(amount),
        })
      } else if (mode === 'deposit') {
        res = await client.post('/api/transactions/deposit', {
          accountNumber,
          amount: Number(amount),
        })
      } else {
        res = await client.post('/api/transactions/withdraw', {
          accountNumber,
          amount: Number(amount),
        })
      }
      setResult(res.data)
    } catch (err) {
      setError(err.response?.data?.message || 'Transaction failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Topbar title="Transfer Funds" />
      <div className="content">
        <div className="card" style={{ maxWidth: 480 }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
            {['transfer', 'deposit', 'withdraw'].map((m) => (
              <button
                key={m}
                onClick={() => { setMode(m); setResult(null); setError('') }}
                style={{
                  flex: 1,
                  padding: '9px 0',
                  fontSize: 13,
                  fontWeight: 500,
                  border: '1px solid var(--line)',
                  background: mode === m ? 'var(--burgundy)' : '#fff',
                  color: mode === m ? 'var(--parchment)' : 'var(--ink)',
                  textTransform: 'capitalize',
                }}
              >
                {m}
              </button>
            ))}
          </div>

          {error && <div className="form-error">{error}</div>}

          {result && (
            <div style={{ background: 'rgba(63,107,63,0.08)', border: '1px solid rgba(63,107,63,0.3)', padding: 12, fontSize: 13, marginBottom: 18 }}>
              Success — Ref: {result.referenceNumber}, Status: {result.status}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {mode === 'transfer' ? (
              <>
                <div className="field">
                  <label>From account</label>
                  <input value={fromAccountNumber} onChange={(e) => setFromAccountNumber(e.target.value)} placeholder="OB..." required />
                </div>
                <div className="field">
                  <label>To account</label>
                  <input value={toAccountNumber} onChange={(e) => setToAccountNumber(e.target.value)} placeholder="OB..." required />
                </div>
              </>
            ) : (
              <div className="field">
                <label>Account number</label>
                <input value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} placeholder="OB..." required />
              </div>
            )}

            <div className="field">
              <label>Amount</label>
              <input type="number" min="0.01" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" required />
            </div>

            <button className="btn-primary" type="submit" disabled={loading}>
              {loading ? 'Processing…' : `Confirm ${mode}`}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}