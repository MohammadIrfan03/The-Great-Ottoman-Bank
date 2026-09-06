# 💸 Transaction Service — Divan-ı Muamelat (Bureau of Transactions)

Part of **The Great Ottoman Bank** microservices ecosystem.

## Purpose
Handles deposits, withdrawals, and transfers. Delegates all balance
changes to `account-service` over REST — this service never touches
account-service's database directly. Keeps its own ledger for history.

## Run locally

Prerequisites: `eureka-server` (8761), `config-server` (8888),
`account-service` (8082) all running. MySQL running (`transaction_db`
auto-created).

\`\`\`bash
mvn clean install
mvn spring-boot:run
\`\`\`

## API Endpoints

| Method | Endpoint                          | Description         | Auth |
|--------|------------------------------------|----------------------|------|
| POST   | /api/transactions/deposit          | Deposit funds        | Yes  |
| POST   | /api/transactions/withdraw         | Withdraw funds       | Yes  |
| POST   | /api/transactions/transfer         | Transfer funds       | Yes  |
| GET    | /api/transactions/history/{acctNo} | Transaction history  | Yes  |

### Deposit example
\`\`\`bash
curl -X POST http://localhost:8083/api/transactions/deposit \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer $TOKEN" \\
  -d '{"accountNumber":"OB6281466038","amount":5000}'
\`\`\`

### Transfer example
\`\`\`bash
curl -X POST http://localhost:8083/api/transactions/transfer \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer $TOKEN" \\
  -d '{"fromAccountNumber":"OB6281466038","toAccountNumber":"OB1234567890","amount":1000}'
\`\`\`

## Tech
- Java 17, Spring Boot 3.3.4
- RestTemplate (plain, hardcoded account-service URL)
- Spring Data JPA + MySQL 8