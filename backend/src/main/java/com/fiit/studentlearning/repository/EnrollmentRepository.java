package com.fiit.studentlearning.repository;
import com.fiit.studentlearning.model.Enrollment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {
    List<Enrollment> findByStudentEmailIgnoreCase(String studentEmail);
    boolean existsByStudentEmailIgnoreCaseAndCourseId(String studentEmail, Long courseId);
}
