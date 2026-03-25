import { useNavigate } from 'react-router-dom'
import { useAuth } from '../App'
import './PageStyles.css'

function Designation() {
  const { designations, employees } = useAuth()
  const navigate = useNavigate()

  const desigColors = [
    '#6C5CE7', '#00B894', '#E84393', '#0984E3', 
    '#F39C12', '#00CEC9', '#FF6B6B', '#A29BFE',
    '#55EFC4', '#FDCB6E', '#74B9FF', '#FD79A8'
  ]

  const getEmployeeCount = (desig) => employees.filter(e => e.designation === desig).length

  return (
    <div className="page-container">
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate('/')}>←</button>
        <h1>💼 Designations</h1>
      </div>

      <div className="page-content">
        {/* Summary */}
        <div className="card animate-fade-in" style={{marginBottom: 'var(--space-md)', textAlign: 'center'}}>
          <div style={{fontSize: 'var(--font-3xl)', fontWeight: 800, color: 'var(--accent-orange)'}}>
            {designations.length}
          </div>
          <div style={{fontSize: 'var(--font-sm)', color: 'var(--text-muted)'}}>Total Designations</div>
        </div>

        {/* Designation List */}
        <div className="list-container">
          {designations.map((desig, idx) => {
            const count = getEmployeeCount(desig)
            const color = desigColors[idx % desigColors.length]
            return (
              <div key={desig} className={`list-item animate-fade-in animate-delay-${Math.min(idx + 1, 6)}`}>
                <div className="list-item-left">
                  <div className="list-avatar" style={{background: color}}>
                    {desig.charAt(0)}
                  </div>
                  <div className="list-item-info">
                    <span className="list-item-title">{desig}</span>
                    <span className="list-item-subtitle">{count} employee{count !== 1 ? 's' : ''} assigned</span>
                  </div>
                </div>
                {count > 0 && <span className="badge badge-success">{count}</span>}
              </div>
            )
          })}
        </div>
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

export default Designation
