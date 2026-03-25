import { useNavigate } from 'react-router-dom'
import { useAuth } from '../App'
import './PageStyles.css'

function Department() {
  const { departments, employees } = useAuth()
  const navigate = useNavigate()

  const deptColors = [
    '#6C5CE7', '#00B894', '#E84393', '#0984E3', 
    '#F39C12', '#00CEC9', '#FF6B6B'
  ]

  const getEmployeeCount = (dept) => employees.filter(e => e.department === dept).length

  return (
    <div className="page-container">
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate('/')}>←</button>
        <h1>🏢 Departments</h1>
      </div>

      <div className="page-content">
        {/* Summary */}
        <div className="card animate-fade-in" style={{marginBottom: 'var(--space-md)', textAlign: 'center'}}>
          <div style={{fontSize: 'var(--font-3xl)', fontWeight: 800, color: 'var(--primary-light)'}}>
            {departments.length}
          </div>
          <div style={{fontSize: 'var(--font-sm)', color: 'var(--text-muted)'}}>Total Departments</div>
        </div>

        {/* Department List */}
        <div className="list-container">
          {departments.map((dept, idx) => {
            const count = getEmployeeCount(dept)
            const color = deptColors[idx % deptColors.length]
            return (
              <div key={dept} className={`list-item animate-fade-in animate-delay-${Math.min(idx + 1, 6)}`}>
                <div className="list-item-left">
                  <div className="list-avatar" style={{background: color}}>
                    {dept.charAt(0)}
                  </div>
                  <div className="list-item-info">
                    <span className="list-item-title">{dept}</span>
                    <span className="list-item-subtitle">{count} employee{count !== 1 ? 's' : ''}</span>
                  </div>
                </div>
                <span className="badge badge-info">{count}</span>
              </div>
            )
          })}
        </div>

        {/* Employees by Department */}
        <h3 className="dash-section-title" style={{marginTop: 'var(--space-lg)', marginBottom: 'var(--space-md)'}}>
          Employees by Department
        </h3>
        {departments.map((dept, deptIdx) => {
          const deptEmployees = employees.filter(e => e.department === dept)
          if (deptEmployees.length === 0) return null
          return (
            <div key={dept} style={{marginBottom: 'var(--space-md)'}}>
              <div style={{
                fontSize: 'var(--font-sm)', fontWeight: 600, color: deptColors[deptIdx % deptColors.length],
                marginBottom: 'var(--space-xs)', paddingLeft: 'var(--space-xs)'
              }}>
                {dept}
              </div>
              <div className="tag-grid">
                {deptEmployees.map(emp => (
                  <span key={emp.id} className="tag-item">
                    <span className="tag-dot" style={{background: deptColors[deptIdx % deptColors.length]}}></span>
                    {emp.name}
                  </span>
                ))}
              </div>
            </div>
          )
        })}
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

export default Department
