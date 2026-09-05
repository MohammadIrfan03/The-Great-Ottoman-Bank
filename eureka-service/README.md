# 🏛️ Eureka Server — The Divan (Central Registry)

> "Every province reports to the Divan; every service reports here."

Part of **The Great Ottoman Bank** microservices ecosystem.

## Purpose
This is the service discovery server. All other microservices
(auth, account, transaction, notification, audit, gateway) register
themselves here on startup, and discover each other through this
registry instead of hardcoded URLs.

## Run locally

\`\`\`bash
mvn clean install
mvn spring-boot:run
\`\`\`

Dashboard available at: http://localhost:8761

## Tech
- Java 17
- Spring Boot 3.3.4
- Spring Cloud Netflix Eureka Server 2023.0.3