# 📜 Config Server — The Firman Divani

> "One decree, applied uniformly across every province."

Part of **The Great Ottoman Bank** microservices ecosystem.

## Purpose
Centralized, Git-backed configuration for all bank microservices.
Configuration lives in `/config-repo` at the root of this monorepo,
versioned like any other code.

## Run locally

Prerequisite: `eureka-server` should already be running on port 8761.

\`\`\`bash
mvn clean install
mvn spring-boot:run
\`\`\`

## Verify

1. Check it registered with Eureka: http://localhost:8761
2. Fetch shared config directly:
   \`\`\`bash
   curl http://localhost:8888/application/default
   \`\`\`
   Should return the contents of `config-repo/application.yml` as JSON.

## Tech
- Java 17
- Spring Boot 3.3.4
- Spring Cloud Config Server 2023.0.3
- Git-backed config store (this monorepo, `/config-repo` subfolder)