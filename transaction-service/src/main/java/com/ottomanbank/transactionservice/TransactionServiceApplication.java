package com.ottomanbank.transactionservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.UserDetailsServiceAutoConfiguration;

/**
 * The Great Ottoman Bank - Transaction Service
 *
 * Handles deposits, withdrawals, and transfers. Delegates balance
 * changes to account-service via REST (each service owns its own data),
 * and keeps its own ledger of every transaction for history/audit.
 */
@SpringBootApplication(exclude = UserDetailsServiceAutoConfiguration.class)
public class TransactionServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(TransactionServiceApplication.class, args);
    }
}
