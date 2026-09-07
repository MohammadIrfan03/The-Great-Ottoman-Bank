# The Great Ottoman Bank — Frontend

React + Vite frontend for the Ottoman Bank microservices project.

## 1. Backend contract used

The frontend expects the API Gateway to be reachable at port `8080`.

Authentication:
- `POST /api/auth/login`
- `POST /api/auth/register`

Accounts:
- `GET /api/accounts/me`
- `POST /api/accounts`

Transactions:
- `POST /api/transactions/transfer`
- `POST /api/transactions/deposit`
- `POST /api/transactions/withdraw`
- `GET /api/transactions/history/{accountNumber}`

JWT returned by login/register is sent as:

`Authorization: Bearer <token>`

## 2. API configuration

Copy `.env.example` to `.env`.

For local frontend + local gateway:

`VITE_API_BASE_URL=http://localhost:8080`

If gateway is on the same machine/IP where the browser is accessing the frontend:

`VITE_API_BASE_URL=http://YOUR_HOST:8080`

If `VITE_API_BASE_URL` is not provided, `src/api/client.js` automatically falls back to:

`http://<current-browser-hostname>:8080`

## 3. Install and run

```bash
npm install
npm run dev
```

Open:

`http://localhost:5173`

## 4. Production build

```bash
npm run build
npm run preview
```

The production bundle is generated in:

`dist/`

## 5. End-to-end manual test

1. Start all backend services and verify API Gateway is listening on `8080`.
2. Start the frontend.
3. Open `/register`.
4. Create a user.
5. Confirm the backend returns a JWT.
6. Confirm the browser redirects to `/dashboard`.
7. Open `/accounts`.
8. Create an account if the user does not have one.
9. Return to `/dashboard` and confirm balance/account data loads.
10. Open `/transfer`.
11. Test transfer/deposit/withdraw according to the backend's business rules.
12. Open `/history` and verify the returned transactions.
13. Click `Sign out`.
14. Confirm `/login` appears.
15. Try opening `/dashboard` directly without a token; `ProtectedRoute` must redirect to `/login`.
16. Login again and confirm the JWT is attached to protected API calls.

## 6. Login page design

The login page is built from React/CSS and real HTML controls.

Background asset:

`public/images/ottoman-login-bg.jpg`

Additional emblem asset:

`public/images/ottoman-bank-emblem.png`

The supplied reference screenshot itself is NOT used as the full-page UI image.

## 7. Production notes

This frontend keeps the existing JWT/localStorage contract so it remains compatible with the current backend.

For a hardened production banking deployment, authentication storage can later be migrated to a secure HttpOnly-cookie architecture coordinated with the auth service/API gateway.

Also configure HTTPS/TLS, CORS, CSP/security headers, rate limiting, secret management and observability at the gateway/backend layer before exposing the application publicly.
