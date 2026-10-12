package com.skillbridge.backend.controller;

import com.skillbridge.backend.entity.User;
import com.skillbridge.backend.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/users")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminUserController {

    private final UserRepository userRepository;

    public AdminUserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Get all users
    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Ban a user
    @PutMapping("/{id}/ban")
    public ResponseEntity<?> banUser(@PathVariable Long id) {

        return userRepository.findById(id)
                .map(user -> {
                    user.setBanned(true);
                    User updatedUser = userRepository.save(user);
                    return ResponseEntity.ok(updatedUser);
                })
                .orElseGet(() ->
                        ResponseEntity.notFound().build()
                );
    }

    // Unban a user
    @PutMapping("/{id}/unban")
    public ResponseEntity<?> unbanUser(@PathVariable Long id) {

        return userRepository.findById(id)
                .map(user -> {
                    user.setBanned(false);
                    User updatedUser = userRepository.save(user);
                    return ResponseEntity.ok(updatedUser);
                })
                .orElseGet(() ->
                        ResponseEntity.notFound().build()
                );
    }
}
