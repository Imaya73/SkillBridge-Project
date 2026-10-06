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

    public Order createOrder(Order order) {
        order.setPaymentStatus("SUCCESS");
        return orderRepository.save(order);
    }

    public List<Order> getOrdersByStudent(Long studentId) {
        return orderRepository.findByStudentId(studentId);
    }

    public Double getTotalRevenue() {
        List<Order> successfulOrders = orderRepository.findByPaymentStatus("SUCCESS");

        double total = 0;

        for (Order order : successfulOrders) {
            total += order.getAmount();
        }

        return total;
    }
}