package com.fiit.studentlearning.dto;
public class EnrollmentRequest {
    private String studentName;
    private String studentEmail;
    private Long courseId;
    public String getStudentName(){ return studentName; }
    public void setStudentName(String v){ studentName = v; }
    public String getStudentEmail(){ return studentEmail; }
    public void setStudentEmail(String v){ studentEmail = v; }
    public Long getCourseId(){ return courseId; }
    public void setCourseId(Long v){ courseId = v; }
}
