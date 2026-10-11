package com.fiit.studentlearning.dto;
public class ProgressRequest {
    private String studentEmail;
    private Long lessonId;
    private boolean completed;
    public String getStudentEmail(){ return studentEmail; }
    public void setStudentEmail(String v){ studentEmail = v; }
    public Long getLessonId(){ return lessonId; }
    public void setLessonId(Long v){ lessonId = v; }
    public boolean isCompleted(){ return completed; }
    public void setCompleted(boolean v){ completed = v; }
}
