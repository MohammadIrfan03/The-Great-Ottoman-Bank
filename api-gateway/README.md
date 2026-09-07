# 🚪 API Gateway — Bab-ı Ali (The Sublime Porte)

Part of **The Great Ottoman Bank** microservices ecosystem.

## Purpose
Single entry point for all external traffic. Routes requests to the
correct downstream service via Eureka-based service discovery
(`lb://SERVICE-NAME`), and performs a gateway-level JWT check before
forwarding (defense in depth).

## Run locally

Prerequisites: `eureka-server` (8761), `config-server` (8888), and the
downstream services (`auth-service`, `account-service`,
`transaction-service`) all running and registered with Eureka.

\`\`\`bash
mvn clean install
mvn spring-boot:run
\`\`\`

## Usage

Instead of hitting each service on its own port, hit everything through
port 8080:

\`\`\`bash
# Register (public, no token needed)
curl -X POST http://localhost:8080/api/auth/register \\
  -H "Content-Type: application/json" \\
  -d '{"fullName":"Test User","email":"test@ottomanbank.com","password":"Passw0rd123"}'

# Anything else requires a Bearer token
curl http://localhost:8080/api/accounts/me -H "Authorization: Bearer $TOKEN"
\`\`\`

## Tech
- Java 17, Spring Boot 3.3.4
- Spring Cloud Gateway (reactive/WebFlux - not Spring MVC)
- Eureka-based dynamic routing (lb://SERVICE-NAME)
- Gateway-level JWT pre-check