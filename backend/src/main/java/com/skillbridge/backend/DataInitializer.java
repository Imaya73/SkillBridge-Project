package com.skillbridge.backend;

import com.skillbridge.backend.entity.User;
import com.skillbridge.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initializeUsers(UserRepository userRepository) {
        return args -> {

            if (userRepository.count() == 0) {

                userRepository.save(
                    new User("Arun Kumar", "arun@example.com", "STUDENT")
                );

                userRepository.save(
                    new User("Priya Sharma", "priya@example.com", "INSTRUCTOR")
                );

                userRepository.save(
                    new User("Rahul Kumar", "rahul@example.com", "STUDENT")
                );

                System.out.println("Sample users created successfully!");
            }
        };
    }
}
