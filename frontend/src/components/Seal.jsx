export default function Seal({ size = 64, className = '' }) {
  return (
    <div
      className={`seal ${className}`}
      style={{ width: size, height: size }}
      aria-label="Ottoman Bank emblem"
    >
      <svg viewBox="0 0 100 100" width="78%" height="78%" fill="none">
        <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="2" />
        <circle cx="50" cy="50" r="39" stroke="currentColor" strokeWidth="1" opacity=".45" />
        <path
          d="M58 25c-11 3-19 13-19 25s8 22 19 25c-5-6-8-14-8-25s3-19 8-25Z"
          fill="currentColor"
          opacity=".92"
        />
        <path
          d="M68 38l2.8 5.8 6.4.8-4.7 4.5 1.2 6.4-5.7-3.2-5.7 3.2 1.2-6.4-4.7-4.5 6.4-.8L68 38Z"
          fill="currentColor"
        />
        <path
          d="M23 66c8 5 17 8 27 8s19-3 27-8"
          stroke="currentColor"
          strokeWidth="1.3"
          opacity=".55"
        />
        <path
          d="M31 27c5-3 12-5 19-5s14 2 19 5"
          stroke="currentColor"
          strokeWidth="1.3"
          opacity=".55"
        />
      </svg>
    </div>
  )
}