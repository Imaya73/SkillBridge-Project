import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'

import Checkout from './pages/Checkout'
import OrderHistory from './pages/OrderHistory'
import AdminDashboard from './pages/AdminDashboard'
import AdminUsers from './pages/AdminUsers'
import AdminCourses from './pages/AdminCourses'

function Home() {
  return (
    <div className="app">
      <nav className="navbar">
        <h2 className="logo">SkillBridge</h2>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <a href="#courses">Courses</a>
          <a href="#about">About</a>
          <Link to="/orders">Order History</Link>

          <Link to="/admin" className="login-btn">
            Admin Dashboard
          </Link>

          <Link to="/admin/users" className="signup-btn">
            Manage Users
          </Link>

          <Link to="/admin/courses" className="signup-btn">
            Course Approval
          </Link>
        </div>
      </nav>

      <section className="hero" id="home">
        <div className="hero-content">
          <p className="tagline">YOUR LEARNING JOURNEY STARTS HERE</p>

          <h1>
            Learn New Skills.
            <br />
            Build Your <span>Future.</span>
          </h1>

          <p className="description">
            Discover online courses, learn from expert instructors,
            and develop the skills you need to achieve your goals.
          </p>

          <a href="#courses" className="explore-btn">
            Explore Courses →
          </a>
        </div>

        <div className="hero-card">
          <div className="card-icon">🎓</div>

          <h2>Learn Without Limits</h2>

          <p>
            Learn at your own pace and grow your knowledge every day.
          </p>

          <div className="stats">
            <div>
              <h3>Online</h3>
              <p>Learning</p>
            </div>

            <div>
              <h3>Expert</h3>
              <p>Instructors</p>
            </div>
          </div>
        </div>
      </section>

      <section className="courses" id="courses">
        <p className="tagline">START LEARNING TODAY</p>

        <h2>Explore Our Learning Platform</h2>

        <p>
          Choose a course and take the next step in your learning journey.
        </p>

        <div className="course-grid">
          <div className="course-card">
            <div className="course-icon">💻</div>

            <h3>Web Development</h3>

            <p>
              Learn modern web technologies and build useful applications.
            </p>

            <Link to="/checkout" className="course-link">
              Enroll Now →
            </Link>
          </div>

          <div className="course-card">
            <div className="course-icon">🤖</div>

            <h3>Artificial Intelligence</h3>

            <p>
              Explore AI concepts and understand machine learning.
            </p>

            <Link to="/checkout" className="course-link">
              Enroll Now →
            </Link>
          </div>

          <div className="course-card">
            <div className="course-icon">📊</div>

            <h3>Data Analytics</h3>

            <p>
              Develop your skills in data analysis and visualization.
            </p>

            <Link to="/checkout" className="course-link">
              Enroll Now →
            </Link>
          </div>
        </div>
      </section>

      <footer id="about">
        <h2>SkillBridge</h2>

        <p>Connecting learners with opportunities to grow.</p>

        <p>© 2026 SkillBridge. All rights reserved.</p>
      </footer>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/checkout" element={<Checkout />} />

        <Route path="/orders" element={<OrderHistory />} />

        <Route path="/admin" element={<AdminDashboard />} />

        <Route path="/admin/users" element={<AdminUsers />} />

        <Route path="/admin/courses" element={<AdminCourses />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
