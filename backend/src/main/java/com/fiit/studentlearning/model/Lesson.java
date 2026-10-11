package com.fiit.studentlearning.model;

import jakarta.persistence.*;

@Entity
public class Lesson {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long courseId;
    private String title;
    private int lessonOrder;
    private String videoUrl;

    public Lesson() {}
    public Lesson(Long courseId, String title, int lessonOrder, String videoUrl) {
        this.courseId = courseId; this.title = title; this.lessonOrder = lessonOrder; this.videoUrl = videoUrl;
    }
    public Long getId(){ return id; }
    public Long getCourseId(){ return courseId; }
    public String getTitle(){ return title; }
    public int getLessonOrder(){ return lessonOrder; }
    public String getVideoUrl(){ return videoUrl; }
}
