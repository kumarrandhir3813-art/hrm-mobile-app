import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../App'
import './PageStyles.css'

function Leave() {
  const { employees, leaves, saveLeaves } = useAuth()
  const navigate = useNavigate()
  const [showForm, setShowForm] = useState(false)
  const [toast, setToast] = useState(null)
  const [formData, setFormData] = useState({
    employeeId: '', type: 'sick', startDate: '', endDate: '', reason: ''
  })

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.employeeId || !formData.startDate || !formData.endDate) {
      showToast('Please fill all fields', 'error')
      return
    }

    const newLeave = {
      id: Date.now(),
      ...formData,
      employeeId: parseInt(formData.employeeId),
      status: 'pending',
      appliedDate: new Date().toISOString().split('T')[0]
    }

    saveLeaves([...leaves, newLeave])
    showToast('Leave request submitted!')
    setFormData({ employeeId: '', type: 'sick', startDate: '', endDate: '', reason: '' })
    setShowForm(false)
  }

  const updateLeaveStatus = (leaveId, status) => {
    const updated = leaves.map(l => l.id === leaveId ? { ...l, status } : l)
    saveLeaves(updated)
    showToast(`Leave ${status}!`)
  }

  const getEmployee = (id) => employees.find(e => e.id === id)

  const getLeaveTypeEmoji = (type) => {
    const emojis = { sick: '🤒', casual: '🏖️', annual: '📅', maternity: '👶', other: '📋' }
    return emojis[type] || '📋'
  }

  return (
    <div className="page-container">
      {toast && <div className={`toast toast-${toast.type}`}>{toast.message}</div>}

      <div className="page-header">
        <button className="back-btn" onClick={() => navigate('/')}>←</button>
        <h1>🏖️ Leave Management</h1>
      </div>

      <div className="page-content">
        <button 
          id="apply-leave-btn"
          className="btn-primary animate-fade-in" 
          onClick={() => setShowForm(!showForm)}
          style={{marginBottom: 'var(--space-md)'}}
        >
          {showForm ? '✕ Cancel' : '+ Apply Leave'}
        </button>

        {showForm && (
          <form className="card animate-fade-in" onSubmit={handleSubmit} style={{marginBottom: 'var(--space-md)'}}>
            <div className="form-group">
              <label className="form-label">Employee</label>
              <select
                id="leave-employee"
                className="form-input"
                value={formData.employeeId}
                onChange={(e) => setFormData({...formData, employeeId: e.target.value})}
              >
                <option value="">Select Employee</option>
                {employees.map(emp => (
                  <option key={emp.id} value={emp.id}>{emp.name}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Leave Type</label>
              <select
                id="leave-type"
                className="form-input"
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
              >
                <option value="sick">🤒 Sick Leave</option>
                <option value="casual">🏖️ Casual Leave</option>
                <option value="annual">📅 Annual Leave</option>
                <option value="maternity">👶 Maternity Leave</option>
                <option value="other">📋 Other</option>
              </select>
            </div>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-sm)'}}>
              <div className="form-group">
                <label className="form-label">Start Date</label>
                <input
                  id="leave-start"
                  type="date"
                  className="form-input"
                  value={formData.startDate}
                  onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label className="form-label">End Date</label>
                <input
                  id="leave-end"
                  type="date"
                  className="form-input"
                  value={formData.endDate}
                  onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Reason</label>
              <textarea
                id="leave-reason"
                className="form-input"
                rows="3"
                placeholder="Enter reason for leave"
                value={formData.reason}
                onChange={(e) => setFormData({...formData, reason: e.target.value})}
                style={{resize: 'vertical'}}
              />
            </div>
            <button type="submit" className="btn-primary">📤 Submit Request</button>
          </form>
        )}

        {/* Leave Summary */}
        <div className="card animate-fade-in animate-delay-1" style={{marginBottom: 'var(--space-md)'}}>
          <div style={{display: 'flex', justifyContent: 'space-around', textAlign: 'center'}}>
            <div>
              <div style={{fontSize: 'var(--font-2xl)', fontWeight: 800, color: 'var(--accent-orange)'}}>
                {leaves.filter(l => l.status === 'pending').length}
              </div>
              <div style={{fontSize: 'var(--font-xs)', color: 'var(--text-muted)'}}>Pending</div>
            </div>
            <div>
              <div style={{fontSize: 'var(--font-2xl)', fontWeight: 800, color: 'var(--accent-green)'}}>
                {leaves.filter(l => l.status === 'approved').length}
              </div>
              <div style={{fontSize: 'var(--font-xs)', color: 'var(--text-muted)'}}>Approved</div>
            </div>
            <div>
              <div style={{fontSize: 'var(--font-2xl)', fontWeight: 800, color: 'var(--accent-red)'}}>
                {leaves.filter(l => l.status === 'rejected').length}
              </div>
              <div style={{fontSize: 'var(--font-xs)', color: 'var(--text-muted)'}}>Rejected</div>
            </div>
          </div>
        </div>

        {/* Leave Requests */}
        <div className="list-container">
          {leaves.length === 0 ? (
            <div className="empty-state animate-fade-in">
              <span style={{fontSize: 48}}>🏖️</span>
              <p>No leave requests yet</p>
            </div>
          ) : (
            [...leaves].reverse().map((leave, idx) => {
              const emp = getEmployee(leave.employeeId)
              return (
                <div key={leave.id} className={`list-item animate-fade-in animate-delay-${Math.min(idx + 1, 6)}`}>
                  <div className="list-item-left">
                    <div className="list-avatar" style={{
                      background: leave.status === 'approved' ? 'linear-gradient(135deg, #00B894, #55EFC4)' :
                                  leave.status === 'rejected' ? 'linear-gradient(135deg, #FF6B6B, #FF8E8E)' :
                                  'linear-gradient(135deg, #F39C12, #FDCB6E)'
                    }}>
                      {getLeaveTypeEmoji(leave.type)}
                    </div>
                    <div className="list-item-info">
                      <span className="list-item-title">{emp?.name || 'Unknown'}</span>
                      <span className="list-item-subtitle">
                        {leave.startDate} → {leave.endDate}
                      </span>
                      <span className="list-item-subtitle">{leave.reason}</span>
                    </div>
                  </div>
                  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4}}>
                    <span className={`badge ${
                      leave.status === 'approved' ? 'badge-success' :
                      leave.status === 'rejected' ? 'badge-danger' : 'badge-warning'
                    }`}>
                      {leave.status}
                    </span>
                    {leave.status === 'pending' && (
                      <div style={{display: 'flex', gap: 4, marginTop: 4}}>
                        <button
                          className="att-btn att-present"
                          onClick={() => updateLeaveStatus(leave.id, 'approved')}
                          title="Approve"
                        >✓</button>
                        <button
                          className="att-btn att-absent"
                          onClick={() => updateLeaveStatus(leave.id, 'rejected')}
                          title="Reject"
                        >✗</button>
                      </div>
                    )}
                  </div>
                </div>
              )
            })
          )}
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

export default Leave
