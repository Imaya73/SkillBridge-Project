package com.skillbridge.backend.controller;

import com.skillbridge.backend.entity.Order;
import com.skillbridge.backend.service.OrderService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/checkout")
    public Order checkout(@RequestBody Order order) {
        return orderService.createOrder(order);
    }

    @GetMapping("/student/{studentId}")
    public List<Order> getStudentOrders(@PathVariable Long studentId) {
        return orderService.getOrdersByStudent(studentId);
    }
}