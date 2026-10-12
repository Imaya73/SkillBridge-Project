package com.skillbridge.backend.controller;

import com.skillbridge.backend.service.OrderService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final OrderService orderService;

    public AdminController(OrderService orderService) {
        this.orderService = orderService;
    }

    // Get total revenue
    @GetMapping("/revenue")
    public Double getTotalRevenue() {
        return orderService.getTotalRevenue();
    }

    // Get admin dashboard statistics
    @GetMapping("/dashboard")
    public Map<String, Object> getDashboardStats() {

        Map<String, Object> stats = new HashMap<>();

        stats.put("totalRevenue", orderService.getTotalRevenue());
        stats.put("totalOrders", orderService.getTotalOrders());

        return stats;
    }
}
