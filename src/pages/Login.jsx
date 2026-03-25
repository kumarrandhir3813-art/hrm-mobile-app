import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../App'
import './Login.css'

function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    setTimeout(() => {
      if (!formData.email || !formData.password) {
        setError('Please fill in all fields')
        setLoading(false)
        return
      }

      // Demo login - any credentials work
      login({
        id: 1,
        name: 'Admin User',
        email: formData.email,
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
              <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          </div>
          <h1>HRM App</h1>
          <p>Human Resource Management</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {error && <div className="auth-error">{error}</div>}
          
          <div className="form-group">
            <label className="form-label">📧 Email Address</label>
            <input
              id="login-email"
              type="email"
              className="form-input"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label className="form-label">🔒 Password</label>
            <input
              id="login-password"
              type="password"
              className="form-input"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button id="login-submit" type="submit" className="btn-primary" disabled={loading}>
            {loading ? <span className="spinner" style={{width: 20, height: 20, borderWidth: 2}}></span> : '🚀 Sign In'}
          </button>
        </form>

        <div className="auth-footer">
          <p>Don't have an account? <Link to="/signup" className="auth-link">Sign Up</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Login
