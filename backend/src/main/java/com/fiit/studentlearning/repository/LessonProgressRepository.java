package com.fiit.studentlearning.repository;
import com.fiit.studentlearning.model.LessonProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;
public interface LessonProgressRepository extends JpaRepository<LessonProgress, Long> {
    List<LessonProgress> findByStudentEmailIgnoreCase(String studentEmail);
    Optional<LessonProgress> findByStudentEmailIgnoreCaseAndLessonId(String studentEmail, Long lessonId);
}
