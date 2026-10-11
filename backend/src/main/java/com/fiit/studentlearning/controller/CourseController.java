package com.fiit.studentlearning.controller;

import com.fiit.studentlearning.model.Course;
import com.fiit.studentlearning.model.Lesson;
import com.fiit.studentlearning.repository.CourseRepository;
import com.fiit.studentlearning.repository.LessonRepository;
import org.springframework.web.bind.annotation.*;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/courses")
public class CourseController {
    private final CourseRepository courses;
    private final LessonRepository lessons;
    public CourseController(CourseRepository courses, LessonRepository lessons) { this.courses = courses; this.lessons = lessons; }

    @GetMapping
    public Map<String,Object> list(@RequestParam(required=false) String search,
        @RequestParam(required=false) String category, @RequestParam(required=false) Double maxPrice,
        @RequestParam(required=false) Double minRating, @RequestParam(defaultValue="0") int page,
        @RequestParam(defaultValue="6") int size) {
        List<Course> filtered = courses.findAll().stream()
            .filter(c -> search == null || search.isBlank() || c.getTitle().toLowerCase().contains(search.toLowerCase()) || c.getDescription().toLowerCase().contains(search.toLowerCase()))
            .filter(c -> category == null || category.isBlank() || category.equalsIgnoreCase(c.getCategory()))
            .filter(c -> maxPrice == null || c.getPrice() <= maxPrice)
            .filter(c -> minRating == null || c.getRating() >= minRating)
            .sorted(Comparator.comparing(Course::getId)).collect(Collectors.toList());
        int safeSize = Math.max(1, Math.min(size, 50));
        int safePage = Math.max(0, page);
        int from = Math.min(safePage * safeSize, filtered.size());
        int to = Math.min(from + safeSize, filtered.size());
        return Map.of("content", filtered.subList(from, to), "page", safePage, "size", safeSize, "totalElements", filtered.size(), "totalPages", (int)Math.ceil(filtered.size()/(double)safeSize));
    }
    @GetMapping("/{id}") public Course details(@PathVariable Long id) {
        return courses.findById(id).orElseThrow(() -> new NoSuchElementException("Course not found: " + id));
    }
    @GetMapping("/{id}/lessons") public List<Lesson> courseLessons(@PathVariable Long id) {
        if (!courses.existsById(id)) throw new NoSuchElementException("Course not found: " + id);
        return lessons.findByCourseIdOrderByLessonOrderAsc(id);
    }
}
