package com.fiit.studentlearning.model;

import jakarta.persistence.*;

@Entity
@Table(uniqueConstraints = @UniqueConstraint(columnNames = {"studentEmail", "lessonId"}))
public class LessonProgress {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String studentEmail;
    private Long lessonId;
    private boolean completed;

    public LessonProgress() {}
    public LessonProgress(String studentEmail, Long lessonId, boolean completed) {
        this.studentEmail = studentEmail; this.lessonId = lessonId; this.completed = completed;
    }
    public Long getId(){ return id; }
    public String getStudentEmail(){ return studentEmail; }
    public Long getLessonId(){ return lessonId; }
    public boolean isCompleted(){ return completed; }
    public void setCompleted(boolean completed){ this.completed = completed; }
}
