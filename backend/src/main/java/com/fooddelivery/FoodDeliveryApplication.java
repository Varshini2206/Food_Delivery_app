package com.fooddelivery;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.transaction.annotation.EnableTransactionManagement;

/**
 * FoodieExpress - Food Delivery Application
 * Main Spring Boot Application Class
 * 
 * @author Venkat
 * @version 1.0.0
 */
@SpringBootApplication
@EnableJpaAuditing
@EnableAsync
@EnableTransactionManagement
@EnableConfigurationProperties
public class FoodDeliveryApplication {

    public static void main(String[] args) {
        SpringApplication.run(FoodDeliveryApplication.class, args);
        System.out.println("\n" +
            "=======================================================\n" +
            "   🍕 FoodieExpress Backend Started Successfully! 🍕   \n" +
            "=======================================================\n" +
            "   Server running on: http://localhost:8080/api       \n" +
            "   H2 Console: http://localhost:8080/api/h2-console   \n" +
            "   API Documentation: http://localhost:8080/api/docs  \n" +
            "=======================================================\n");
    }
}