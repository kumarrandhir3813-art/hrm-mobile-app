import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../App'
import './PageStyles.css'

function Employees() {
  const { employees, saveEmployees, departments, designations } = useAuth()
  const navigate = useNavigate()
  const [showForm, setShowForm] = useState(false)
  const [search, setSearch] = useState('')
  const [toast, setToast] = useState(null)
  const [formData, setFormData] = useState({
    name: '', email: '', mobile: '', department: '', 
    designation: '', salary: '', joinDate: ''
  })

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.department) {
      showToast('Please fill required fields', 'error')
      return
    }

    const newEmployee = {
      id: Date.now(),
      ...formData,
      salary: parseInt(formData.salary) || 30000,
      status: 'active',
      photo: null
    }

    saveEmployees([...employees, newEmployee])
    showToast(`${formData.name} added successfully!`)
    setFormData({ name: '', email: '', mobile: '', department: '', designation: '', salary: '', joinDate: '' })
    setShowForm(false)
  }

  const filteredEmployees = employees.filter(emp => 
    emp.name.toLowerCase().includes(search.toLowerCase()) ||
    emp.department.toLowerCase().includes(search.toLowerCase()) ||
    emp.designation.toLowerCase().includes(search.toLowerCase()) ||
    emp.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="page-container">
      {toast && <div className={`toast toast-${toast.type}`}>{toast.message}</div>}

      <div className="page-header">
        <button className="back-btn" onClick={() => navigate('/')}>←</button>
        <h1>👥 Employees</h1>
      </div>

      <div className="page-content">
        {/* Search */}
        <div className="form-group animate-fade-in">
          <input
            id="employee-search"
            type="text"
            className="form-input"
            placeholder="🔍 Search employees..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Add Button */}
        <button 
          id="add-employee-btn"
          className="btn-primary animate-fade-in" 
          onClick={() => setShowForm(!showForm)}
          style={{marginBottom: 'var(--space-md)'}}
        >
          {showForm ? '✕ Cancel' : '+ Add Employee'}
        </button>

        {/* Add Employee Form */}
        {showForm && (
          <form className="card animate-fade-in" onSubmit={handleSubmit} style={{marginBottom: 'var(--space-md)'}}>
            <h3 style={{marginBottom: 'var(--space-md)'}}>New Employee</h3>
            <div className="form-group">
              <label className="form-label">👤 Full Name *</label>
              <input
                className="form-input"
                placeholder="Enter full name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label className="form-label">📧 Email *</label>
              <input
                className="form-input"
                type="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label className="form-label">📱 Mobile Number</label>
              <input
                className="form-input"
                type="tel"
                placeholder="Enter mobile number"
                value={formData.mobile}
                onChange={(e) => setFormData({...formData, mobile: e.target.value})}
              />
            </div>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-sm)'}}>
              <div className="form-group">
                <label className="form-label">🏢 Department *</label>
                <select
                  className="form-input"
                  value={formData.department}
                  onChange={(e) => setFormData({...formData, department: e.target.value})}
                >
                  <option value="">Select</option>
                  {departments.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">💼 Designation</label>
                <select
                  className="form-input"
                  value={formData.designation}
                  onChange={(e) => setFormData({...formData, designation: e.target.value})}
                >
                  <option value="">Select</option>
                  {designations.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
            </div>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-sm)'}}>
              <div className="form-group">
                <label className="form-label">💰 Salary (₹)</label>
                <input
                  className="form-input"
                  type="number"
                  placeholder="30000"
                  value={formData.salary}
                  onChange={(e) => setFormData({...formData, salary: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label className="form-label">📅 Join Date</label>
                <input
                  className="form-input"
                  type="date"
                  value={formData.joinDate}
                  onChange={(e) => setFormData({...formData, joinDate: e.target.value})}
                />
              </div>
            </div>
            <button type="submit" className="btn-primary">✅ Add Employee</button>
          </form>
        )}

        {/* Summary */}
        <div className="card animate-fade-in animate-delay-1" style={{marginBottom: 'var(--space-md)'}}>
          <div style={{display: 'flex', justifyContent: 'space-around', textAlign: 'center'}}>
            <div>
              <div style={{fontSize: 'var(--font-2xl)', fontWeight: 800, color: 'var(--accent-blue)'}}>
                {employees.length}
              </div>
              <div style={{fontSize: 'var(--font-xs)', color: 'var(--text-muted)'}}>Total</div>
            </div>
            <div>
              <div style={{fontSize: 'var(--font-2xl)', fontWeight: 800, color: 'var(--accent-green)'}}>
                {employees.filter(e => e.status === 'active').length}
              </div>
              <div style={{fontSize: 'var(--font-xs)', color: 'var(--text-muted)'}}>Active</div>
            </div>
            <div>
              <div style={{fontSize: 'var(--font-2xl)', fontWeight: 800, color: 'var(--primary-light)'}}>
                {new Set(employees.map(e => e.department)).size}
              </div>
              <div style={{fontSize: 'var(--font-xs)', color: 'var(--text-muted)'}}>Depts</div>
            </div>
          </div>
        </div>

        {/* Employee List */}
        <div className="list-container">
          {filteredEmployees.length === 0 ? (
            <div className="empty-state">
              <span style={{fontSize: 48}}>🔍</span>
              <p>No employees found</p>
            </div>
          ) : (
            filteredEmployees.map((emp, idx) => (
              <div key={emp.id} className={`list-item animate-fade-in animate-delay-${Math.min(idx + 1, 6)}`}>
                <div className="list-item-left">
                  <div className="list-avatar" style={{background: 'var(--primary-gradient)'}}>
                    {emp.name.charAt(0)}
                  </div>
                  <div className="list-item-info">
                    <span className="list-item-title">{emp.name}</span>
                    <span className="list-item-subtitle">{emp.designation} • {emp.department}</span>
                    <span className="list-item-subtitle">📧 {emp.email} {emp.mobile ? `• 📱 ${emp.mobile}` : ''}</span>
                  </div>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4}}>
                  <span style={{fontWeight: 700, color: 'var(--accent-green)', fontSize: 'var(--font-xs)'}}>
                    ₹{emp.salary.toLocaleString('en-IN')}
                  </span>
                  <span className="badge badge-success">Active</span>
                </div>
              </div>
            ))
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
        <button className="bottom-nav-item active">
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

export default Employees
