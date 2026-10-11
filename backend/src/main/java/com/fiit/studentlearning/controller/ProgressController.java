package com.fiit.studentlearning.controller;

import com.fiit.studentlearning.dto.ProgressRequest;
import com.fiit.studentlearning.model.Lesson;
import com.fiit.studentlearning.model.LessonProgress;
import com.fiit.studentlearning.repository.LessonProgressRepository;
import com.fiit.studentlearning.repository.LessonRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/progress")
public class ProgressController {
    private final LessonProgressRepository progress;
    private final LessonRepository lessons;
    public ProgressController(LessonProgressRepository progress, LessonRepository lessons) { this.progress = progress; this.lessons = lessons; }

    @PostMapping public LessonProgress update(@RequestBody ProgressRequest request) {
        if (request.getStudentEmail() == null || request.getStudentEmail().isBlank() || request.getLessonId() == null)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Enter studentEmail and lessonId");
        if (!lessons.existsById(request.getLessonId())) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Lesson not found");
        LessonProgress item = progress.findByStudentEmailIgnoreCaseAndLessonId(request.getStudentEmail(), request.getLessonId())
            .orElse(new LessonProgress(request.getStudentEmail(), request.getLessonId(), request.isCompleted()));
        item.setCompleted(request.isCompleted());
        return progress.save(item);
    }
    @GetMapping public Map<String,Object> get(@RequestParam String studentEmail, @RequestParam Long courseId) {
        List<Lesson> courseLessons = lessons.findByCourseIdOrderByLessonOrderAsc(courseId);
        Map<Long,Boolean> completed = progress.findByStudentEmailIgnoreCase(studentEmail).stream()
            .collect(Collectors.toMap(LessonProgress::getLessonId, LessonProgress::isCompleted, (a,b)->b));
        long done = courseLessons.stream().filter(l -> Boolean.TRUE.equals(completed.get(l.getId()))).count();
        List<Map<String,Object>> lessonStatus = courseLessons.stream().map(l -> {
            Map<String,Object> m = new LinkedHashMap<>();
            m.put("lessonId", l.getId()); m.put("title", l.getTitle()); m.put("completed", Boolean.TRUE.equals(completed.get(l.getId())));
            return m;
        }).collect(Collectors.toList());
        Map<String,Object> result = new LinkedHashMap<>();
        result.put("courseId", courseId); result.put("completedLessons", done); result.put("totalLessons", courseLessons.size());
        result.put("percentage", courseLessons.isEmpty() ? 0 : Math.round(done * 100.0 / courseLessons.size()));
        result.put("lessons", lessonStatus);
        return result;
    }
}
