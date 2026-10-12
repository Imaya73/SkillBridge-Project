import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './OrderHistory.css'

function OrderHistory() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('http://localhost:8081/api/orders/student/1')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Unable to load orders.')
        }
        return response.json()
      })
      .then((data) => {
        setOrders(data)
        setLoading(false)
      })
      .catch(() => {
        setError('Unable to load order history. Please try again.')
        setLoading(false)
      })
  }, [])

  return (
    <div className="history-page">
      <header className="history-header">
        <Link to="/" className="history-logo">SkillBridge</Link>
        <Link to="/" className="back-home">Back to Home</Link>
      </header>

      <main className="history-container">
        <p className="history-tag">YOUR LEARNING JOURNEY</p>
        <h1>Order History</h1>
        <p className="history-description">
          View your course purchases and payment details.
        </p>

        {loading && <p className="history-message">Loading your orders...</p>}

        {error && <p className="history-error">{error}</p>}

        {!loading && !error && orders.length === 0 && (
          <div className="empty-orders">
            <h2>No orders yet</h2>
            <p>Your course purchases will appear here.</p>
            <Link to="/" className="browse-courses">Explore Courses</Link>
          </div>
        )}

        {!loading && !error && orders.length > 0 && (
          <>
            <div className="history-summary">
              <div>
                <span>Total Orders</span>
                <h2>{orders.length}</h2>
              </div>
              <div>
                <span>Total Amount</span>
                <h2>
                  ₹{orders.reduce((total, order) => total + order.amount, 0).toFixed(2)}
                </h2>
              </div>
            </div>

            <div className="orders-list">
              {orders.map((order) => (
                <div className="order-card" key={order.id}>
                  <div className="order-icon">📚</div>

                  <div className="order-details">
                    <h3>Course #{order.courseId}</h3>
                    <p>Order ID: {order.id}</p>
                    <p>Student ID: {order.studentId}</p>
                  </div>

                  <div className="order-payment">
                    <h3>₹{Number(order.amount).toFixed(2)}</h3>
                    <span className="payment-status">
                      {order.paymentStatus}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  )
}

export default OrderHistory
