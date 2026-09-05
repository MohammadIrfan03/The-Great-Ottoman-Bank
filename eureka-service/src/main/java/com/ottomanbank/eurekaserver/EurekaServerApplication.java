package com.ottomanbank.eurekaserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

/**
 * The Great Ottoman Bank - Service Registry (Sicil-i Hizmet)
 *
 * This is the discovery server ("Divan") where every microservice
 * of the bank registers itself. Just as the Ottoman Divan (imperial council)
 * kept record of all provincial governors (Sancak Beys), this Eureka
 * server keeps track of every live service instance in our banking
 * ecosystem, enabling dynamic service-to-service discovery without
 * hardcoded hostnames or ports.
 */
@SpringBootApplication
@EnableEurekaServer
public class EurekaServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(EurekaServerApplication.class, args);
    }
}