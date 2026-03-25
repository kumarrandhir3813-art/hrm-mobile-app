import { useNavigate } from 'react-router-dom'
import { useAuth } from '../App'
import './Dashboard.css'

function Dashboard() {
  const { user, logout, employees, attendance, leaves } = useAuth()
  const navigate = useNavigate()

  const today = new Date().toISOString().split('T')[0]
  const todayAttendance = attendance.filter(a => a.date === today)
  const pendingLeaves = leaves.filter(l => l.status === 'pending')
  const activeEmployees = employees.filter(e => e.status === 'active')

  const menuItems = [
    { id: 'attendance', icon: '📋', label: 'Attendance', path: '/attendance', color: '#6C5CE7', count: todayAttendance.length },
    { id: 'leave', icon: '🏖️', label: 'Leave', path: '/leave', color: '#00B894', count: pendingLeaves.length },
    { id: 'employees', icon: '👥', label: 'Employees', path: '/employees', color: '#0984E3', count: activeEmployees.length },
    { id: 'department', icon: '🏢', label: 'Department', path: '/department', color: '#E84393' },
    { id: 'designation', icon: '💼', label: 'Designation', path: '/designation', color: '#F39C12' },
    { id: 'salary', icon: '💰', label: 'Salary', path: '/salary', color: '#00CEC9' },
    { id: 'profile', icon: '👤', label: 'Profile', path: '/profile', color: '#A29BFE' },
    { id: 'admin', icon: '⚙️', label: 'Admin', path: '/admin', color: '#FF6B6B' },
  ]

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good Morning'
    if (hour < 17) return 'Good Afternoon'
    return 'Good Evening'
  }

  return (
    <div className="page-container">
      {/* Header */}
      <div className="dash-header">
        <div className="dash-header-content">
          <div className="dash-user-info">
            <div className="dash-avatar" onClick={() => navigate('/profile')}>
              {user?.photo ? (
                <img src={user.photo} alt="Profile" />
              ) : (
                <span>{user?.name?.charAt(0) || 'A'}</span>
              )}
              <div className="dash-avatar-badge">✓</div>
            </div>
            <div>
              <p className="dash-greeting">{getGreeting()} 👋</p>
              <h2 className="dash-username">{user?.name || 'Admin'}</h2>
              <span className="badge badge-success">{user?.role || 'Admin'}</span>
            </div>
          </div>
          <button id="logout-btn" className="dash-logout-btn" onClick={handleLogout} title="Logout">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="page-content">
        <div className="dash-stats animate-fade-in">
          <div className="dash-stat-card stat-purple">
            <div className="stat-icon">👥</div>
            <div className="stat-info">
              <span className="stat-value">{activeEmployees.length}</span>
              <span className="stat-label">Employees</span>
            </div>
          </div>
          <div className="dash-stat-card stat-green">
            <div className="stat-icon">✅</div>
            <div className="stat-info">
              <span className="stat-value">{todayAttendance.length}</span>
              <span className="stat-label">Present</span>
            </div>
          </div>
          <div className="dash-stat-card stat-orange">
            <div className="stat-icon">📝</div>
            <div className="stat-info">
              <span className="stat-value">{pendingLeaves.length}</span>
              <span className="stat-label">Leaves</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <h3 className="dash-section-title animate-fade-in animate-delay-1">Quick Actions</h3>
        <div className="dash-grid">
          {menuItems.map((item, index) => (
            <button
              key={item.id}
              id={`nav-${item.id}`}
              className={`dash-menu-item animate-fade-in animate-delay-${index + 1}`}
              onClick={() => navigate(item.path)}
              style={{ '--item-color': item.color }}
            >
              <div className="menu-icon-wrap">
                <span className="menu-icon">{item.icon}</span>
                {item.count > 0 && <span className="menu-badge">{item.count}</span>}
              </div>
              <span className="menu-label">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Recent Activity */}
        <h3 className="dash-section-title animate-fade-in animate-delay-3" style={{marginTop: 'var(--space-lg)'}}>Recent Employees</h3>
        <div className="dash-recent-list">
          {employees.slice(0, 3).map((emp, idx) => (
            <div key={emp.id} className={`dash-recent-item animate-fade-in animate-delay-${idx + 4}`}>
              <div className="recent-avatar">
                {emp.name.charAt(0)}
              </div>
              <div className="recent-info">
                <span className="recent-name">{emp.name}</span>
                <span className="recent-role">{emp.designation} • {emp.department}</span>
              </div>
              <span className="badge badge-success">Active</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        <button className="bottom-nav-item active" onClick={() => navigate('/')}>
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

export default Dashboard
