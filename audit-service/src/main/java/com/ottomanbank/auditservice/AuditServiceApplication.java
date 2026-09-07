package com.ottomanbank.auditservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.UserDetailsServiceAutoConfiguration;

/**
 * The Great Ottoman Bank - Audit Service
 *
 * Consumes transaction events from Kafka and writes an immutable
 * compliance record for every sensitive action. Uses its own consumer
 * group (separate from notification-service) so it independently
 * receives every event on the topic, rather than sharing/splitting
 * the load with notification-service.
 */
@SpringBootApplication(exclude = UserDetailsServiceAutoConfiguration.class)
public class AuditServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(AuditServiceApplication.class, args);
    }
}