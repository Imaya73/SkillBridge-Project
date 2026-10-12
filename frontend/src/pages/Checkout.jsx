import { useState } from 'react'
import './Checkout.css'

function Checkout() {
const [course, setCourse] = useState('Web Development')
const [amount, setAmount] = useState('499')
const [loading, setLoading] = useState(false)
const [message, setMessage] = useState('')

const handlePayment = async (e) => {
e.preventDefault()
setLoading(true)
setMessage('')
try {
  const response = await fetch('http://localhost:8081/api/orders/checkout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      studentId: 1,
      courseId: 101,
      amount: Number(amount),
    }),
  })

  if (!response.ok) {
    throw new Error('Payment failed. Please try again.')
  }

  const data = await response.json()
  setMessage(`Payment successful! Your Order ID is ${data.id}.`)
} catch (error) {
  setMessage(error.message || 'Unable to connect to the server.')
} finally {
  setLoading(false)
}


}

return ( <div className="checkout-page"> <header className="checkout-header"> <a href="/" className="checkout-logo">SkillBridge</a> <span>Secure Checkout</span> </header>

  <main className="checkout-container">
    <section className="checkout-info">
      <p className="checkout-tag">COMPLETE YOUR ENROLLMENT</p>
      <h1>Invest in your future.</h1>
      <p>Complete your checkout and start learning with SkillBridge.</p>

      <div className="checkout-benefit">
        <span>✓</span> Learn at your own pace
      </div>
      <div className="checkout-benefit">
        <span>✓</span> Access your learning materials
      </div>
      <div className="checkout-benefit">
        <span>✓</span> Build valuable skills
      </div>
    </section>

    <section className="checkout-card">
      <h2>Order Summary</h2>
      <p className="checkout-subtitle">Review your course before payment.</p>

      <form onSubmit={handlePayment}>
        <label htmlFor="course">Select Course</label>
        <select
          id="course"
          value={course}
          onChange={(e) => {
            setCourse(e.target.value)
            setAmount(e.target.value === 'Artificial Intelligence' ? '699' : '499')
          }}
        >
          <option>Web Development</option>
          <option>Artificial Intelligence</option>
          <option>Data Analytics</option>
        </select>

        <div className="order-row">
          <div>
            <strong>{course}</strong>
            <p>Online course</p>
          </div>
          <strong>₹{amount}</strong>
        </div>

        <div className="order-row total-row">
          <strong>Total Amount</strong>
          <strong>₹{amount}</strong>
        </div>

        <button className="pay-button" type="submit" disabled={loading}>
          {loading ? 'Processing...' : `Pay ₹${amount}`}
        </button>
      </form>

      {message && (
        <div className="payment-message" role="status">
          {message}
        </div>
      )}

      <p className="demo-note">
        Demo checkout only. No real money will be charged.
      </p>
    </section>
  </main>
</div>

)
}

export default Checkout