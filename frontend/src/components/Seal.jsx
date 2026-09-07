// Ottoman-inspired seal mark: a roundel containing a crescent moon and
// star, styled after an imperial tughra's circular counterpart rather
// than a literal flag icon.
export default function Seal({ size = 64 }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        border: '2px solid var(--gold)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(circle at 35% 30%, #2a1f18, var(--espresso) 70%)',
        flexShrink: 0,
      }}
    >
      <svg viewBox="0 0 24 24" width={size * 0.55} height={size * 0.55} fill="none" stroke="#C9A24B" strokeWidth="1.3">
        <circle cx="12" cy="12" r="9.5" />
        <path d="M14.5 6.5a6 6 0 100 11 7.2 7.2 0 010-11z" fill="#C9A24B" stroke="none" opacity="0.9" />
        <path d="M17.3 10.6l.55 1.15 1.25.15-.92.87.24 1.25-1.12-.62-1.12.62.24-1.25-.92-.87 1.25-.15z" fill="#C9A24B" stroke="none" />
      </svg>
    </div>
  )
}