package com.skillbridge.backend.repository;

import com.skillbridge.backend.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CourseRepository extends JpaRepository<Course, Long> {

    List<Course> findByStatus(String status);

}