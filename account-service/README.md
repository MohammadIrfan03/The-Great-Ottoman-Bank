# 💰 Account Service — Divan-ı Kese (Bureau of the Purse)

Part of **The Great Ottoman Bank** microservices ecosystem.

## Purpose
Manages customer bank accounts. Validates JWTs locally (shared secret
with auth-service) — no network dependency on auth-service at request time.

## Run locally

Prerequisites: `eureka-server` (8761), `config-server` (8888) running.
MySQL running with `account_db` (auto-created on first run).

\`\`\`bash
mvn clean install
mvn spring-boot:run
\`\`\`

## API Endpoints

| Method | Endpoint           | Description              | Auth required |
|--------|--------------------|---------------------------|--------------|
| POST   | /api/accounts      | Open a new account         | Yes (JWT)    |
| GET    | /api/accounts/me   | Get my account details     | Yes (JWT)    |

### Create account example
\`\`\`bash
TOKEN="<paste JWT from auth-service login here>"

curl -X POST http://localhost:8082/api/accounts \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer $TOKEN" \\
  -d '{"accountType":"SAVINGS"}'
\`\`\`

### Get my account
\`\`\`bash
curl http://localhost:8082/api/accounts/me \\
  -H "Authorization: Bearer $TOKEN"
\`\`\`

## Tech
- Java 17, Spring Boot 3.3.4
- Spring Security (JWT validated locally, shared secret)
- Spring Data JPA + MySQL 8
- Eureka Client, Config Client