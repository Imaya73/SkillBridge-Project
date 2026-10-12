import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './AdminUsers.css'

function AdminUsers() {
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchUsers = async () => {
    try {
      const response = await fetch(
        'http://localhost:8081/api/admin/users'
      )

      if (!response.ok) {
        throw new Error('Unable to load users')
      }

      const data = await response.json()
      setUsers(data)
      setError('')
    } catch {
      setError('Unable to connect to the backend.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const toggleBan = async (user) => {
    const action = user.banned ? 'unban' : 'ban'

    try {
      const response = await fetch(
        `http://localhost:8081/api/admin/users/${user.id}/${action}`,
        { method: 'PUT' }
      )

      if (!response.ok) {
        throw new Error('Unable to update user status')
      }

      await fetchUsers()
    } catch {
      setError('Unable to update user status.')
    }
  }

  const filteredUsers = users.filter((user) =>
    `${user.name} ${user.email}`
      .toLowerCase()
      .includes(search.toLowerCase())
  )

  return (
    <div className="admin-users-page">
      <aside className="admin-users-sidebar">
        <h2>SkillBridge</h2>
        <p>ADMIN PANEL</p>

        <Link to="/" className="admin-users-nav">🏠 Home</Link>
        <Link to="/admin" className="admin-users-nav">📊 Dashboard</Link>
        <Link to="/orders" className="admin-users-nav">📦 Orders</Link>
        <Link to="/admin/users" className="admin-users-nav active">
          👥 Manage Users
        </Link>
      </aside>

      <main className="admin-users-main">
        <header className="admin-users-header">
          <div>
            <p className="admin-users-subtitle">USER MANAGEMENT</p>
            <h1>Manage Users</h1>
            <p>View users and manage their account status.</p>
          </div>

          <Link to="/admin" className="admin-users-back">
            ← Dashboard
          </Link>
        </header>

        <section className="admin-users-summary">
          <div>
            <span>Total Users</span>
            <h2>{users.length}</h2>
          </div>

          <div>
            <span>Active Users</span>
            <h2>{users.filter((user) => !user.banned).length}</h2>
          </div>

          <div>
            <span>Banned Users</span>
            <h2>{users.filter((user) => user.banned).length}</h2>
          </div>
        </section>

        <section className="admin-users-card">
          <div className="admin-users-toolbar">
            <div>
              <h2>All Users</h2>
              <p>View and manage registered user records.</p>
            </div>

            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          {loading && <p>Loading users...</p>}
          {error && <p className="admin-users-error">{error}</p>}

          {!loading && !error && (
            <div className="admin-users-table-wrapper">
              <table className="admin-users-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td>#{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>
                        <span
                          className={
                            user.banned
                              ? 'admin-user-status banned'
                              : 'admin-user-status active'
                          }
                        >
                          {user.banned ? 'Banned' : 'Active'}
                        </span>
                      </td>
                      <td>
                        <button
                          className={
                            user.banned
                              ? 'admin-user-action unban'
                              : 'admin-user-action ban'
                          }
                          onClick={() => toggleBan(user)}
                        >
                          {user.banned ? 'Unban' : 'Ban User'}
                        </button>
                      </td>
                    </tr>
                  ))}

                  {filteredUsers.length === 0 && (
                    <tr>
                      <td colSpan="6" className="admin-users-empty">
                        No users found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

export default AdminUsers
