package com.ottomanbank.configserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.config.server.EnableConfigServer;

/**
 * The Great Ottoman Bank - Configuration Server (Firman Divani)
 *
 * Just as an imperial "firman" (decree) was issued centrally and applied
 * uniformly across the empire's provinces, this Config Server issues
 * configuration centrally to every microservice — eliminating scattered,
 * hardcoded properties across the ecosystem.
 *
 * Backed by a Git repository, so every config change is versioned,
 * auditable, and can be rolled back like any other code change.
 */
@SpringBootApplication
@EnableConfigServer
public class ConfigServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(ConfigServerApplication.class, args);
    }
}