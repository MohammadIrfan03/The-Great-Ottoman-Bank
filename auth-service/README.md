# 🔐 Auth Service — Divan-ı Hüviyet (Bureau of Identity)

Part of **The Great Ottoman Bank** microservices ecosystem.

## Purpose
Handles customer/admin registration, login, and JWT issuance.
Every downstream service trusts tokens minted here.

## Run locally

Prerequisites: `eureka-server` (8761) and `config-server` (8888) should
already be running. MySQL running with `auth_db` created (see root README
for DB setup).

\`\`\`bash
mvn clean install
mvn spring-boot:run
\`\`\`

## API Endpoints

| Method | Endpoint             | Description              | Auth required |
|--------|----------------------|---------------------------|----------------|
| POST   | /api/auth/register   | Register new customer     | No             |
| POST   | /api/auth/login      | Login, receive JWT token  | No             |

### Register example
\`\`\`bash
curl -X POST http://localhost:8081/api/auth/register \\
  -H "Content-Type: application/json" \\
  -d '{"fullName":"Suleyman Kanuni","email":"suleyman@ottomanbank.com","password":"Passw0rd123"}'
\`\`\`

### Login example
\`\`\`bash
curl -X POST http://localhost:8081/api/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{"email":"suleyman@ottomanbank.com","password":"Passw0rd123"}'
\`\`\`

## Tech
- Java 17, Spring Boot 3.3.4
- Spring Security + JWT (jjwt 0.12.6)
- Spring Data JPA + MySQL 8
- Eureka Client, Config Client