import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../App'
import './PageStyles.css'

function Attendance() {
  const { employees, attendance, saveAttendance } = useAuth()
  const navigate = useNavigate()
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [toast, setToast] = useState(null)

  const todayRecords = attendance.filter(a => a.date === selectedDate)
  const markedIds = todayRecords.map(a => a.employeeId)

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const markAttendance = (empId, status) => {
    const existing = attendance.findIndex(
      a => a.employeeId === empId && a.date === selectedDate
    )
    
    let newAttendance
    if (existing >= 0) {
      newAttendance = [...attendance]
      newAttendance[existing] = { ...newAttendance[existing], status }
    } else {
      newAttendance = [...attendance, {
        id: Date.now(),
        employeeId: empId,
        date: selectedDate,
        status,
        time: new Date().toLocaleTimeString()
      }]
    }
    
    saveAttendance(newAttendance)
    const emp = employees.find(e => e.id === empId)
    showToast(`${emp.name} marked as ${status}`)
  }

  const getStatus = (empId) => {
    const record = todayRecords.find(a => a.employeeId === empId)
    return record?.status || null
  }

  return (
    <div className="page-container">
      {toast && <div className={`toast toast-${toast.type}`}>{toast.message}</div>}
      
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate('/')}>←</button>
        <h1>📋 Attendance</h1>
      </div>

      <div className="page-content">
        {/* Date Picker */}
        <div className="card animate-fade-in" style={{marginBottom: 'var(--space-md)'}}>
          <label className="form-label">Select Date</label>
          <input
            id="attendance-date"
            type="date"
            className="form-input"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
          <div style={{display: 'flex', gap: 'var(--space-sm)', marginTop: 'var(--space-sm)'}}>
            <span className="badge badge-success">Present: {todayRecords.filter(a => a.status === 'present').length}</span>
            <span className="badge badge-danger">Absent: {todayRecords.filter(a => a.status === 'absent').length}</span>
            <span className="badge badge-warning">Late: {todayRecords.filter(a => a.status === 'late').length}</span>
          </div>
        </div>

        {/* Employee List */}
        <div className="list-container">
          {employees.filter(e => e.status === 'active').map((emp, idx) => {
            const status = getStatus(emp.id)
            return (
              <div key={emp.id} className={`list-item animate-fade-in animate-delay-${Math.min(idx + 1, 6)}`}>
                <div className="list-item-left">
                  <div className="list-avatar" style={{background: 'var(--primary-gradient)'}}>
                    {emp.name.charAt(0)}
                  </div>
                  <div className="list-item-info">
                    <span className="list-item-title">{emp.name}</span>
                    <span className="list-item-subtitle">{emp.department}</span>
                  </div>
                </div>
                <div className="attendance-actions">
                  <button
                    className={`att-btn att-present ${status === 'present' ? 'att-active' : ''}`}
                    onClick={() => markAttendance(emp.id, 'present')}
                    title="Present"
                  >✓</button>
                  <button
                    className={`att-btn att-absent ${status === 'absent' ? 'att-active' : ''}`}
                    onClick={() => markAttendance(emp.id, 'absent')}
                    title="Absent"
                  >✗</button>
                  <button
                    className={`att-btn att-late ${status === 'late' ? 'att-active' : ''}`}
                    onClick={() => markAttendance(emp.id, 'late')}
                    title="Late"
                  >⏰</button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Bottom Nav */}
      <nav className="bottom-nav">
        <button className="bottom-nav-item" onClick={() => navigate('/')}>
          <span className="nav-icon">🏠</span>
          <span className="nav-label">Home</span>
        </button>
        <button className="bottom-nav-item active">
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

export default Attendance
