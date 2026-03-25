import { useNavigate } from 'react-router-dom'
import { useAuth } from '../App'
import './PageStyles.css'

function Admin() {
  const { employees, attendance, leaves, departments, designations, logout } = useAuth()
  const navigate = useNavigate()

  const totalSalary = employees.reduce((sum, e) => sum + e.salary, 0)
  const avgSalary = employees.length > 0 ? Math.round(totalSalary / employees.length) : 0

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate('/')}>←</button>
        <h1>⚙️ Admin Panel</h1>
      </div>

      <div className="page-content">
        {/* Admin Stats */}
        <div className="admin-stats animate-fade-in">
          <div className="admin-stat-card">
            <span className="admin-stat-icon">👥</span>
            <span className="admin-stat-value">{employees.length}</span>
            <span className="admin-stat-label">Employees</span>
          </div>
          <div className="admin-stat-card">
            <span className="admin-stat-icon">🏢</span>
            <span className="admin-stat-value">{departments.length}</span>
            <span className="admin-stat-label">Departments</span>
          </div>
          <div className="admin-stat-card">
            <span className="admin-stat-icon">💼</span>
            <span className="admin-stat-value">{designations.length}</span>
            <span className="admin-stat-label">Designations</span>
          </div>
          <div className="admin-stat-card">
            <span className="admin-stat-icon">📝</span>
            <span className="admin-stat-value">{leaves.length}</span>
            <span className="admin-stat-label">Leave Requests</span>
          </div>
        </div>

        {/* Financial Summary */}
        <div className="card animate-fade-in animate-delay-1" style={{marginBottom: 'var(--space-md)'}}>
          <h3 style={{marginBottom: 'var(--space-md)'}}>💰 Financial Summary</h3>
          <div className="salary-breakdown">
            <div className="salary-row">
              <span>Total Monthly Payroll</span>
              <span style={{fontWeight: 700, color: 'var(--primary-light)'}}>₹{totalSalary.toLocaleString('en-IN')}</span>
            </div>
            <div className="salary-row">
              <span>Average Salary</span>
              <span>₹{avgSalary.toLocaleString('en-IN')}</span>
            </div>
            <div className="salary-row">
              <span>Highest Salary</span>
              <span>₹{Math.max(...employees.map(e => e.salary)).toLocaleString('en-IN')}</span>
            </div>
            <div className="salary-row">
              <span>Lowest Salary</span>
              <span>₹{Math.min(...employees.map(e => e.salary)).toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <h3 className="dash-section-title animate-fade-in animate-delay-2">Quick Actions</h3>

        <button className="admin-action animate-fade-in animate-delay-2" onClick={() => navigate('/employees')}>
          <span className="admin-action-icon" style={{background: 'rgba(9, 132, 227, 0.15)'}}>👥</span>
          <div className="admin-action-info">
            <span className="admin-action-title">Manage Employees</span>
            <span className="admin-action-desc">Add, edit, view all employees</span>
          </div>
          <span className="admin-action-arrow">→</span>
        </button>

        <button className="admin-action animate-fade-in animate-delay-3" onClick={() => navigate('/attendance')}>
          <span className="admin-action-icon" style={{background: 'rgba(108, 92, 231, 0.15)'}}>📋</span>
          <div className="admin-action-info">
            <span className="admin-action-title">Mark Attendance</span>
            <span className="admin-action-desc">Today's attendance tracking</span>
          </div>
          <span className="admin-action-arrow">→</span>
        </button>

        <button className="admin-action animate-fade-in animate-delay-4" onClick={() => navigate('/leave')}>
          <span className="admin-action-icon" style={{background: 'rgba(0, 184, 148, 0.15)'}}>🏖️</span>
          <div className="admin-action-info">
            <span className="admin-action-title">Leave Management</span>
            <span className="admin-action-desc">Approve or reject leave requests</span>
          </div>
          <span className="admin-action-arrow">→</span>
        </button>

        <button className="admin-action animate-fade-in animate-delay-5" onClick={() => navigate('/salary')}>
          <span className="admin-action-icon" style={{background: 'rgba(243, 156, 18, 0.15)'}}>💰</span>
          <div className="admin-action-info">
            <span className="admin-action-title">Salary Management</span>
            <span className="admin-action-desc">View and calculate salaries</span>
          </div>
          <span className="admin-action-arrow">→</span>
        </button>

        <button className="admin-action animate-fade-in animate-delay-6" onClick={() => navigate('/department')}>
          <span className="admin-action-icon" style={{background: 'rgba(232, 67, 147, 0.15)'}}>🏢</span>
          <div className="admin-action-info">
            <span className="admin-action-title">Departments</span>
            <span className="admin-action-desc">View department structure</span>
          </div>
          <span className="admin-action-arrow">→</span>
        </button>

        <button className="admin-action animate-fade-in animate-delay-6" onClick={() => navigate('/designation')}>
          <span className="admin-action-icon" style={{background: 'rgba(253, 203, 110, 0.15)'}}>💼</span>
          <div className="admin-action-info">
            <span className="admin-action-title">Designations</span>
            <span className="admin-action-desc">View all roles and positions</span>
          </div>
          <span className="admin-action-arrow">→</span>
        </button>

        {/* Logout Button */}
        <button 
          className="btn-danger animate-fade-in animate-delay-6" 
          onClick={handleLogout}
          style={{marginTop: 'var(--space-lg)'}}
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
        <button className="bottom-nav-item" onClick={() => navigate('/profile')}>
          <span className="nav-icon">👤</span>
          <span className="nav-label">Profile</span>
        </button>
      </nav>
    </div>
  )
}

export default Admin
