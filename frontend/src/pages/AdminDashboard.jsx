import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts'
import './AdminDashboard.css'

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
  })

  const [totalUsers, setTotalUsers] = useState(0)
  const [activeCourses, setActiveCourses] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Fetch dashboard statistics
  useEffect(() => {
    fetch('http://localhost:8081/api/admin/dashboard')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Unable to load dashboard data')
        }

        return response.json()
      })
      .then((data) => {
        setStats({
          totalRevenue: Number(data.totalRevenue) || 0,
          totalOrders: Number(data.totalOrders) || 0,
        })
      })
      .catch((error) => {
        console.error('Dashboard error:', error)
        setError('Unable to connect to the dashboard backend.')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  // Fetch registered users
  useEffect(() => {
    fetch('http://localhost:8081/api/admin/users')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Unable to load users')
        }

        return response.json()
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setTotalUsers(data.length)
        }
      })
      .catch((error) => {
        console.error('Users API error:', error)
      })
  }, [])

  // Fetch approved courses count
  useEffect(() => {
    fetch('http://localhost:8081/api/admin/courses/approved/count')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Unable to load approved courses count')
        }

        return response.json()
      })
      .then((data) => {
        setActiveCourses(Number(data.totalApprovedCourses) || 0)
      })
      .catch((error) => {
        console.error('Courses API error:', error)
      })
  }, [])

  const revenueChartData = [
    {
      name: 'Revenue',
      amount: stats.totalRevenue,
    },
  ]

  const orderChartData = [
    {
      name: 'Orders',
      value: stats.totalOrders,
    },
    {
      name: 'Approved Courses',
      value: activeCourses,
    },
  ]

  const chartColors = ['#5942a6', '#16a085']

  return (
    <div className="admin-page">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <h2>SkillBridge</h2>

        <p className="admin-label">ADMIN PANEL</p>

        <Link to="/" className="admin-nav-link">
          🏠 Home
        </Link>

        <Link to="/orders" className="admin-nav-link">
          📦 Orders
        </Link>

        <Link to="/checkout" className="admin-nav-link">
          💳 Checkout
        </Link>

        <Link to="/admin" className="admin-nav-link">
          📊 Dashboard
        </Link>

        <Link to="/admin/users" className="admin-nav-link">
          👥 Manage Users
        </Link>

        <Link to="/admin/courses" className="admin-nav-link">
          📚 Course Approval
        </Link>
      </aside>

      {/* Main Dashboard */}
      <main className="admin-main">
        <header className="admin-header">
          <div>
            <p className="admin-label">OVERVIEW</p>

            <h1>Admin Dashboard</h1>

            <p>Monitor your SkillBridge platform.</p>
          </div>

          <div className="admin-avatar">A</div>
        </header>

        {loading && <p>Loading dashboard...</p>}

        {error && <p className="admin-error">{error}</p>}

        {!loading && !error && (
          <>
            {/* Statistics Cards */}
            <section className="admin-stats">
              <div className="admin-stat-card">
                <div className="admin-stat-icon">💰</div>

                <p>Total Revenue</p>

                <h2>
                  ₹{stats.totalRevenue.toLocaleString('en-IN')}
                </h2>

                <span>Revenue recorded from orders</span>
              </div>

              <div className="admin-stat-card">
                <div className="admin-stat-icon">🛒</div>

                <p>Total Orders</p>

                <h2>{stats.totalOrders}</h2>

                <span>Total orders recorded</span>
              </div>

              <div className="admin-stat-card">
                <div className="admin-stat-icon">👥</div>

                <p>Total Users</p>

                <h2>{totalUsers}</h2>

                <span>Registered users on SkillBridge</span>
              </div>

              <div className="admin-stat-card">
                <div className="admin-stat-icon">📚</div>

                <p>Active Courses</p>

                <h2>{activeCourses}</h2>

                <span>Approved courses on SkillBridge</span>
              </div>
            </section>

            {/* Charts */}
            <section className="admin-charts">
              <div className="admin-chart-card">
                <h2>Revenue Overview</h2>

                <p>Total revenue from recorded orders</p>

                <div className="admin-chart">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={revenueChartData}
                      margin={{
                        top: 20,
                        right: 20,
                        left: 10,
                        bottom: 10,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />

                      <XAxis dataKey="name" />

                      <YAxis />

                      <Tooltip
                        formatter={(value) => [
                          `₹${Number(value).toLocaleString('en-IN')}`,
                          'Revenue',
                        ]}
                      />

                      <Bar
                        dataKey="amount"
                        fill="#5942a6"
                        radius={[8, 8, 0, 0]}
                        barSize={70}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="admin-chart-card">
                <h2>Platform Statistics</h2>

                <p>Orders and approved courses</p>

                <div className="admin-chart">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={orderChartData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="45%"
                        outerRadius={85}
                        label
                      >
                        {orderChartData.map((entry, index) => (
                          <Cell
                            key={entry.name}
                            fill={
                              chartColors[index % chartColors.length]
                            }
                          />
                        ))}
                      </Pie>

                      <Tooltip />

                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </section>

            {/* Platform Overview */}
            <section className="admin-overview-card">
              <h2>Platform Overview</h2>

              <p>
                Revenue, orders, users and approved course details
                are displayed on the dashboard.
              </p>

              <div className="admin-overview-row">
                <span>Backend Connection</span>

                <strong className="admin-connected">
                  Connected
                </strong>
              </div>

              <div className="admin-overview-row">
                <span>Payment Mode</span>

                <strong>Demo Checkout</strong>
              </div>

              <div className="admin-overview-row">
                <span>Total Revenue</span>

                <strong>
                  ₹{stats.totalRevenue.toLocaleString('en-IN')}
                </strong>
              </div>

              <div className="admin-overview-row">
                <span>Total Orders</span>

                <strong>{stats.totalOrders}</strong>
              </div>

              <div className="admin-overview-row">
                <span>Total Users</span>

                <strong>{totalUsers}</strong>
              </div>

              <div className="admin-overview-row">
                <span>Approved Courses</span>

                <strong>{activeCourses}</strong>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  )
}

export default AdminDashboard