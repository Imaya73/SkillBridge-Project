package com.fiit.studentlearning.model;

import jakarta.persistence.*;

@Entity
public class Course {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    @Column(length = 2000) private String description;
    private String category;
    private String instructor;
    private double price;
    private double rating;
    private String syllabus;

    public Course() {}
    public Course(String title, String description, String category, String instructor, double price, double rating, String syllabus) {
        this.title = title; this.description = description; this.category = category;
        this.instructor = instructor; this.price = price; this.rating = rating; this.syllabus = syllabus;
    }
    public Long getId(){ return id; }
    public String getTitle(){ return title; }
    public String getDescription(){ return description; }
    public String getCategory(){ return category; }
    public String getInstructor(){ return instructor; }
    public double getPrice(){ return price; }
    public double getRating(){ return rating; }
    public String getSyllabus(){ return syllabus; }
}
