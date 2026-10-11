package com.fiit.studentlearning.config;

import com.fiit.studentlearning.model.Course;
import com.fiit.studentlearning.model.Lesson;
import com.fiit.studentlearning.repository.CourseRepository;
import com.fiit.studentlearning.repository.LessonRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import java.util.List;

@Configuration
public class DataSeeder {
    @Bean
    CommandLineRunner seed(CourseRepository courses, LessonRepository lessons) {
        return args -> {
            if (courses.count() == 0) {
                courses.saveAll(List.of(
                    new Course("Java Programming Basics", "Learn Java syntax, OOP, arrays and exceptions.", "Programming", "Arun Kumar", 799, 4.7, "Java syntax, OOP, Arrays, Exceptions"),
                    new Course("Web Development with HTML & CSS", "Build responsive websites from scratch.", "Web Development", "Priya S", 499, 4.5, "HTML, CSS, Responsive Design"),
                    new Course("Spring Boot REST APIs", "Create REST APIs with Java and Spring Boot.", "Programming", "Karthik R", 999, 4.8, "Spring Boot, REST, JPA, MySQL"),
                    new Course("JavaScript Essentials", "Learn variables, functions, DOM and fetch APIs.", "Web Development", "Meena V", 599, 4.4, "Basics, Functions, DOM, Fetch"),
                    new Course("SQL and Database Basics", "Learn relational databases and SQL queries.", "Database", "Divya M", 399, 4.3, "Tables, SELECT, JOIN, GROUP BY"),
                    new Course("React for Beginners", "Build reusable user interfaces with React.", "Web Development", "Naveen P", 899, 4.6, "Components, Props, State, Hooks"),
                    new Course("Git and GitHub", "Track code changes and collaborate with GitHub.", "Tools", "Sanjay K", 299, 4.2, "Git, Branches, Commits, GitHub")
                ));
            }
            if (lessons.count() == 0) {
                List<Course> all = courses.findAll();
                for (Course c : all) {
                    lessons.save(new Lesson(c.getId(), c.getTitle() + " - Introduction", 1, "https://www.youtube.com/embed/ysz5S6PUM-U"));
                    lessons.save(new Lesson(c.getId(), c.getTitle() + " - Core concepts", 2, "https://www.youtube.com/embed/ysz5S6PUM-U"));
                    lessons.save(new Lesson(c.getId(), c.getTitle() + " - Practice", 3, "https://www.youtube.com/embed/ysz5S6PUM-U"));
                }
            }
        };
    }
}
