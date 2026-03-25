import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../App'
import './Login.css'

function Signup() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '', email: '', mobile: '', password: '', confirmPassword: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    setTimeout(() => {
      if (!formData.name || !formData.email || !formData.mobile || !formData.password) {
        setError('Please fill in all fields')
        setLoading(false)
        return
      }

      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match')
        setLoading(false)
        return
      }

      if (formData.mobile.length < 10) {
        setError('Please enter a valid mobile number')
        setLoading(false)
        return
      }

      login({
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        role: 'admin',
        photo: null
      })
      setLoading(false)
      navigate('/')
    }, 800)
  }

  return (
    <div className="auth-page">
      <div className="auth-bg-orb auth-bg-orb-1"></div>
      <div className="auth-bg-orb auth-bg-orb-2"></div>
      <div className="auth-bg-orb auth-bg-orb-3"></div>
      
      <div className="auth-container animate-fade-in">
        <div className="auth-logo">
          <div className="auth-logo-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <line x1="19" y1="8" x2="19" y2="14"/>
              <line x1="22" y1="11" x2="16" y2="11"/>
            </svg>
          </div>
          <h1>Create Account</h1>
          <p>Join HRM Management System</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {error && <div className="auth-error">{error}</div>}
          
          <div className="form-group">
            <label className="form-label">👤 Full Name</label>
            <input
              id="signup-name"
              type="text"
              className="form-input"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label className="form-label">📧 Email Address</label>
            <input
              id="signup-email"
              type="email"
              className="form-input"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label className="form-label">📱 Mobile Number</label>
            <input
              id="signup-mobile"
              type="tel"
              className="form-input"
              placeholder="Enter mobile number"
              value={formData.mobile}
              onChange={(e) => setFormData({...formData, mobile: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label className="form-label">🔒 Password</label>
            <input
              id="signup-password"
              type="password"
              className="form-input"
              placeholder="Create a password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label className="form-label">🔒 Confirm Password</label>
            <input
              id="signup-confirm"
              type="password"
              className="form-input"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            />
          </div>

          <button id="signup-submit" type="submit" className="btn-primary" disabled={loading}>
            {loading ? <span className="spinner" style={{width: 20, height: 20, borderWidth: 2}}></span> : '✨ Create Account'}
          </button>
        </form>

        <div className="auth-footer">
          <p>Already have an account? <Link to="/login" className="auth-link">Sign In</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Signup
