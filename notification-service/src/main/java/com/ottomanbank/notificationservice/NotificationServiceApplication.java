package com.ottomanbank.notificationservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.UserDetailsServiceAutoConfiguration;

/**
 * The Great Ottoman Bank - Notification Service
 *
 * Consumes transaction events from Kafka and simulates sending
 * customer notifications (logged to console, saved to DB).
 * Has no public REST API - it is a pure event consumer, so the
 * default Spring Security auto-config is excluded (learned this
 * lesson the hard way in transaction-service).
 */
@SpringBootApplication(exclude = UserDetailsServiceAutoConfiguration.class)
public class NotificationServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(NotificationServiceApplication.class, args);
    }
}