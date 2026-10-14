import { useEffect, useState } from "react";
import "./AdminCourses.css";

function AdminCourses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    const API_URL = "http://localhost:8081/api/admin/courses";

    // Fetch pending courses
    const fetchCourses = async () => {
        try {
            const response = await fetch(`${API_URL}/pending`);

            if (!response.ok) {
                throw new Error("Failed to fetch courses");
            }

            const data = await response.json();
            setCourses(data);
        } catch (error) {
            setMessage("Unable to load courses. Check whether backend is running.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    // Approve or reject a course
    const updateCourseStatus = async (id, action) => {
        try {
            setMessage("");

            const response = await fetch(
                `${API_URL}/${id}/${action}`,
                {
                    method: "PUT"
                }
            );

            if (!response.ok) {
                throw new Error("Unable to update course status");
            }

            const result = await response.json();

            setMessage(result.message);
            fetchCourses();
        } catch (error) {
            setMessage("Course status update failed.");
        }
    };

    return (
        <div className="admin-courses">
            <div className="courses-header">
                <h1>Course Approval</h1>
                <p>Review and manage submitted courses.</p>
            </div>

            {message && (
                <div className="course-message">
                    {message}
                </div>
            )}

            {loading ? (
                <p className="course-info">Loading courses...</p>
            ) : courses.length === 0 ? (
                <div className="empty-courses">
                    <h3>No Pending Courses</h3>
                    <p>All submitted courses have been reviewed.</p>
                </div>
            ) : (
                <div className="courses-grid">
                    {courses.map((course) => (
                        <div className="course-card" key={course.id}>
                            <span className="pending-badge">
                                {course.status}
                            </span>

                            <h2>{course.title}</h2>

                            <p>
                                <strong>Instructor:</strong>{" "}
                                {course.instructor}
                            </p>

                            <p className="course-description">
                                {course.description}
                            </p>

                            <h3>₹{course.price}</h3>

                            <div className="course-actions">
                                <button
                                    className="approve-btn"
                                    onClick={() =>
                                        updateCourseStatus(course.id, "approve")
                                    }
                                >
                                    Approve
                                </button>

                                <button
                                    className="reject-btn"
                                    onClick={() =>
                                        updateCourseStatus(course.id, "reject")
                                    }
                                >
                                    Reject
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default AdminCourses;
