# 📬 Notification Service — Divan-ı Haber (Bureau of Tidings)

Part of **The Great Ottoman Bank** microservices ecosystem.

## Purpose
Consumes transaction events from Kafka ("transaction-events" topic) and
simulates sending customer notifications - logged to console and saved
to the database. No public REST API; this is a pure event consumer.

## Run locally

Prerequisites: `eureka-server` (8761), `config-server` (8888), Kafka +
Zookeeper (9092/2181) all running. MySQL running (`notification_db`
auto-created).

\`\`\`bash
mvn clean install
mvn spring-boot:run
\`\`\`

## How to test

Trigger any deposit/withdraw/transfer on `transaction-service`
(port 8083) - this service will automatically pick up the resulting
Kafka event and log a simulated notification, e.g.:

\`\`\`
Email sent to account holder of OB6281466038: "Your account OB6281466038 has been credited with 5000. Ref: TXN..."
\`\`\`

## Tech
- Java 17, Spring Boot 3.3.4
- Spring Kafka (consumer)
- Spring Data JPA + MySQL 8