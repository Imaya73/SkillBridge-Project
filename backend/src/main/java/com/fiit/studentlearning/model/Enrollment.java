package com.fiit.studentlearning.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(uniqueConstraints = @UniqueConstraint(columnNames = {"studentEmail", "courseId"}))
public class Enrollment {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String studentName;
    private String studentEmail;
    private Long courseId;
    private LocalDateTime enrolledAt;

    public Enrollment() {}
    public Enrollment(String studentName, String studentEmail, Long courseId) {
        this.studentName = studentName; this.studentEmail = studentEmail; this.courseId = courseId; this.enrolledAt = LocalDateTime.now();
    }
    public Long getId(){ return id; }
    public String getStudentName(){ return studentName; }
    public String getStudentEmail(){ return studentEmail; }
    public Long getCourseId(){ return courseId; }
    public LocalDateTime getEnrolledAt(){ return enrolledAt; }
}
