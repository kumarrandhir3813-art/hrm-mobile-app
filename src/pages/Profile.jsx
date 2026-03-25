import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../App'
import './PageStyles.css'

function Profile() {
  const { user, login, logout } = useAuth()
  const navigate = useNavigate()
  const [editing, setEditing] = useState(false)
  const [toast, setToast] = useState(null)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    mobile: user?.mobile || '',
  })
  const fileInputRef = useRef(null)

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        login({ ...user, photo: reader.result })
        showToast('Profile photo updated!')
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = () => {
    login({ ...user, ...formData })
    setEditing(false)
    showToast('Profile updated successfully!')
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="page-container">
      {toast && <div className={`toast toast-${toast.type}`}>{toast.message}</div>}
      
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate('/')}>←</button>
        <h1>👤 Profile</h1>
        <button 
          className="back-btn" 
          onClick={() => editing ? handleSave() : setEditing(true)}
          style={{marginLeft: 'auto'}}
        >
          {editing ? '✓' : '✏️'}
        </button>
      </div>

      <div className="page-content">
        {/* Photo Section */}
        <div className="card animate-fade-in" style={{marginBottom: 'var(--space-md)'}}>
          <div className="profile-photo-section">
            <div className="profile-photo" onClick={() => fileInputRef.current?.click()}>
              {user?.photo ? (
                <img src={user.photo} alt="Profile" />
              ) : (
                <span>{user?.name?.charAt(0) || '👤'}</span>
              )}
              <div className="profile-photo-edit">📷</div>
            </div>
            <input 
              ref={fileInputRef}
              type="file" 
              accept="image/*" 
              style={{display: 'none'}}
              onChange={handlePhotoUpload}
            />
            <h2 className="profile-name">{user?.name}</h2>
            <span className="profile-role">{user?.role || 'Admin'}</span>
            <span className="badge badge-success" style={{marginTop: 'var(--space-sm)'}}>Active</span>
          </div>
        </div>

        {/* Profile Details */}
        <div className="card animate-fade-in animate-delay-1" style={{marginBottom: 'var(--space-md)'}}>
          <h3 style={{marginBottom: 'var(--space-md)'}}>Personal Information</h3>
          
          {editing ? (
            <>
              <div className="form-group">
                <label className="form-label">👤 Full Name</label>
                <input
                  className="form-input"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label className="form-label">📧 Email Address</label>
                <input
                  className="form-input"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label className="form-label">📱 Mobile Number</label>
                <input
                  className="form-input"
                  type="tel"
                  value={formData.mobile}
                  onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                />
              </div>
              <button className="btn-primary" onClick={handleSave}>💾 Save Changes</button>
            </>
          ) : (
            <>
              <div className="info-row">
                <span className="info-row-icon">👤</span>
                <div className="info-row-content">
                  <span className="info-row-label">Full Name</span>
                  <span className="info-row-value">{user?.name}</span>
                </div>
              </div>
              <div className="info-row">
                <span className="info-row-icon">📧</span>
                <div className="info-row-content">
                  <span className="info-row-label">Email Address</span>
                  <span className="info-row-value">{user?.email}</span>
                </div>
              </div>
              <div className="info-row">
                <span className="info-row-icon">📱</span>
                <div className="info-row-content">
                  <span className="info-row-label">Mobile Number</span>
                  <span className="info-row-value">{user?.mobile || 'Not set'}</span>
                </div>
              </div>
              <div className="info-row">
                <span className="info-row-icon">🔑</span>
                <div className="info-row-content">
                  <span className="info-row-label">Role</span>
                  <span className="info-row-value" style={{textTransform: 'capitalize'}}>{user?.role}</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Action Buttons */}
        <div className="card animate-fade-in animate-delay-2" style={{marginBottom: 'var(--space-md)'}}>
          <h3 style={{marginBottom: 'var(--space-md)'}}>Account Settings</h3>
          <button className="admin-action" onClick={() => navigate('/admin')}>
            <span className="admin-action-icon" style={{background: 'rgba(108, 92, 231, 0.15)'}}>⚙️</span>
            <div className="admin-action-info">
              <span className="admin-action-title">Admin Panel</span>
              <span className="admin-action-desc">Manage system settings</span>
            </div>
            <span className="admin-action-arrow">→</span>
          </button>
          <button className="admin-action" onClick={() => navigate('/salary')}>
            <span className="admin-action-icon" style={{background: 'rgba(0, 184, 148, 0.15)'}}>💰</span>
            <div className="admin-action-info">
              <span className="admin-action-title">View Salary</span>
              <span className="admin-action-desc">Check salary breakdown</span>
            </div>
            <span className="admin-action-arrow">→</span>
          </button>
        </div>

        {/* Logout */}
        <button 
          id="profile-logout"
          className="btn-danger animate-fade-in animate-delay-3" 
          onClick={handleLogout}
        >
          🚪 Logout
        </button>
      </div>

      <nav className="bottom-nav">
        <button className="bottom-nav-item" onClick={() => navigate('/')}>
          <span className="nav-icon">🏠</span>
          <span className="nav-label">Home</span>
        </button>
        <button className="bottom-nav-item" onClick={() => navigate('/attendance')}>
          <span className="nav-icon">📋</span>
          <span className="nav-label">Attend</span>
        </button>
        <button className="bottom-nav-item" onClick={() => navigate('/employees')}>
          <span className="nav-icon">👥</span>
          <span className="nav-label">Team</span>
        </button>
        <button className="bottom-nav-item" onClick={() => navigate('/salary')}>
          <span className="nav-icon">💰</span>
          <span className="nav-label">Salary</span>
        </button>
        <button className="bottom-nav-item active">
          <span className="nav-icon">👤</span>
          <span className="nav-label">Profile</span>
        </button>
      </nav>
    </div>
  )
}

export default Profile
