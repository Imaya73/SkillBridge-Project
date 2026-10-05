package com.skillbridge.backend.repository;

import com.skillbridge.backend.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByStudentId(Long studentId);
}