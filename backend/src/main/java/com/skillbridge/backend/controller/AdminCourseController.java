package com.skillbridge.backend.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skillbridge.backend.entity.Course;
import com.skillbridge.backend.repository.CourseRepository;

@RestController
@RequestMapping("/api/admin/courses")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminCourseController {

    private final CourseRepository courseRepository;

    public AdminCourseController(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    // 1. Get all courses
    @GetMapping
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    // 2. Get pending courses
    @GetMapping("/pending")
    public List<Course> getPendingCourses() {
        return courseRepository.findByStatus("PENDING");
    }

    // 3. Get approved courses count
    @GetMapping("/approved/count")
    public Map<String, Long> getApprovedCoursesCount() {
        long count = courseRepository.findByStatus("APPROVED").size();

        return Map.of("totalApprovedCourses", count);
    }

    // 4. Create a new course
    @PostMapping
    public Course createCourse(@RequestBody Course course) {
        course.setStatus("PENDING");
        return courseRepository.save(course);
    }

    // 5. Approve a course
    @PutMapping("/{id}/approve")
    public ResponseEntity<?> approveCourse(@PathVariable Long id) {

        return courseRepository.findById(id)
                .map(course -> {
                    course.setStatus("APPROVED");
                    courseRepository.save(course);

                    return ResponseEntity.ok(
                            Map.of(
                                    "message", "Course approved successfully",
                                    "status", course.getStatus()
                            )
                    );
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // 6. Reject a course
    @PutMapping("/{id}/reject")
    public ResponseEntity<?> rejectCourse(@PathVariable Long id) {

        return courseRepository.findById(id)
                .map(course -> {
                    course.setStatus("REJECTED");
                    courseRepository.save(course);

                    return ResponseEntity.ok(
                            Map.of(
                                    "message", "Course rejected successfully",
                                    "status", course.getStatus()
                            )
                    );
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
