# 📜 Audit Service — Divan-ı Sicil (Bureau of Records)

Part of **The Great Ottoman Bank** microservices ecosystem.

## Purpose
Consumes transaction events from Kafka ("transaction-events" topic) and
writes an immutable compliance/audit record for every deposit, withdrawal,
and transfer processed by the bank. No public REST API; this is a pure
event consumer, running independently of notification-service via its
own Kafka consumer group.

## Run locally

Prerequisites: `eureka-server` (8761), `config-server` (8888), Kafka +
Zookeeper (9092/2181) all running. MySQL running (`audit_db`
auto-created).

\`\`\`bash
mvn clean install
mvn spring-boot:run
\`\`\`

## How to test

Trigger any deposit/withdraw/transfer on `transaction-service`
(port 8083) - this service will independently pick up the same Kafka
event (separate consumer group from notification-service) and log an
audit trail entry, e.g.:

\`\`\`
Audit trail recorded: [TXN553507371437] DEPOSIT - null -> OB6281466038 amount 5000 - SUCCESS
\`\`\`

Verify persisted rows:
\`\`\`bash
mysql -u ottoman_user -p audit_db -e "SELECT * FROM audit_logs;"
\`\`\`

## Why a separate consumer group

Kafka splits a topic's messages across consumers **within the same
group** (load balancing). notification-service and audit-service both
need to see *every* event independently, so each runs its own group
(`notification-service-group` vs `audit-service-group`) - this gives
each service its own full copy of the event stream.

## Tech
- Java 17, Spring Boot 3.3.4
- Spring Kafka (consumer, dedicated consumer group)
- Spring Data JPA + MySQL 8