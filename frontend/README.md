# 🏛️ Frontend — The Great Ottoman Bank

React SPA for the Ottoman Bank microservices backend. All requests go
through the API gateway (port 8080).

## Run locally

Prerequisites: `api-gateway` running on port 8080, with the full
backend chain behind it (eureka, config, auth, account, transaction).

\`\`\`bash
npm install
npm run dev
\`\`\`

Opens on http://localhost:5173

## Pages
- `/login`, `/register` — public
- `/dashboard` — balance + recent transactions
- `/accounts` — account details / open new account
- `/transfer` — deposit, withdraw, transfer
- `/history` — full transaction ledger

## Tech
- React 18 + Vite
- React Router v6
- Axios (JWT attached via interceptor, stored in localStorage)
- Ottoman imperial theme: burgundy/gold/parchment palette, Cormorant Garamond + Inter