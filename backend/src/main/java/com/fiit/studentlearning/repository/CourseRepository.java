package com.fiit.studentlearning.repository;
import com.fiit.studentlearning.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface CourseRepository extends JpaRepository<Course, Long> {
    List<Course> findByTitleContainingIgnoreCase(String search);
}
