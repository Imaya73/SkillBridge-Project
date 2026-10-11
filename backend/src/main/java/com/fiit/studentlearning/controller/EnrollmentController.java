package com.fiit.studentlearning.controller;

import com.fiit.studentlearning.dto.EnrollmentRequest;
import com.fiit.studentlearning.model.Enrollment;
import com.fiit.studentlearning.repository.CourseRepository;
import com.fiit.studentlearning.repository.EnrollmentRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;

@RestController
@RequestMapping("/api/enrollments")
public class EnrollmentController {
    private final EnrollmentRepository enrollments;
    private final CourseRepository courses;
    public EnrollmentController(EnrollmentRepository enrollments, CourseRepository courses) { this.enrollments = enrollments; this.courses = courses; }

    @PostMapping public Enrollment enroll(@RequestBody EnrollmentRequest request) {
        if (request.getStudentName() == null || request.getStudentName().isBlank() ||
            request.getStudentEmail() == null || !request.getStudentEmail().contains("@") || request.getCourseId() == null)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Enter name, valid email and courseId");
        if (!courses.existsById(request.getCourseId())) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Course not found");
        if (enrollments.existsByStudentEmailIgnoreCaseAndCourseId(request.getStudentEmail(), request.getCourseId()))
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Already enrolled in this course");
        return enrollments.save(new Enrollment(request.getStudentName(), request.getStudentEmail(), request.getCourseId()));
    }
    @GetMapping public List<Enrollment> byStudent(@RequestParam String studentEmail) {
        return enrollments.findByStudentEmailIgnoreCase(studentEmail);
    }
}
