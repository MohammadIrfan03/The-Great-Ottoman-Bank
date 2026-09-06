package com.ottomanbank.accountservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * The Great Ottoman Bank - Account Service
 *
 * Manages customer bank accounts: creation, balance, account details.
 * Trusts JWTs issued by auth-service (validated locally via shared secret,
 * no network call to auth-service required).
 */
@SpringBootApplication
public class AccountServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(AccountServiceApplication.class, args);
    }
}