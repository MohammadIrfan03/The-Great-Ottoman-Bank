package com.ottomanbank.authservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * The Great Ottoman Bank - Authentication Service
 *
 * Handles identity: registration, login, and JWT issuance.
 * Every other service in the bank trusts the tokens minted here.
 */
@SpringBootApplication
public class AuthServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(AuthServiceApplication.class, args);
    }
}
