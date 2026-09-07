package com.ottomanbank.apigateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * The Great Ottoman Bank - API Gateway (Bab-ı Ali - The Sublime Porte)
 *
 * The single entry point through which all external traffic enters
 * the bank's microservices. Routes requests to the correct service
 * via Eureka-based service discovery, and performs a first-pass JWT
 * check before forwarding (defense in depth - each downstream service
 * still validates the token independently).
 */
@SpringBootApplication
public class ApiGatewayApplication {
    public static void main(String[] args) {
        SpringApplication.run(ApiGatewayApplication.class, args);
    }
}