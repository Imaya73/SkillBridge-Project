package com.skillbridge.backend.service;

import com.skillbridge.backend.entity.Order;
import com.skillbridge.backend.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    // Create a new order
    public Order createOrder(Order order) {
        order.setPaymentStatus("SUCCESS");
        return orderRepository.save(order);
    }

    // Get order history for a student
    public List<Order> getOrdersByStudent(Long studentId) {
        return orderRepository.findByStudentId(studentId);
    }

    // Calculate total revenue from successful payments
    public Double getTotalRevenue() {
        List<Order> successfulOrders =
                orderRepository.findByPaymentStatus("SUCCESS");

        double total = 0;

        for (Order order : successfulOrders) {
            if (order.getAmount() != null) {
                total += order.getAmount();
            }
        }

        return total;
    }

    // Get total number of orders
    public long getTotalOrders() {
        return orderRepository.count();
    }
}
