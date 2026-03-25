import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../App'
import './PageStyles.css'

function Salary() {
  const { employees } = useAuth()
  const navigate = useNavigate()
  const [selectedEmployee, setSelectedEmployee] = useState('')

  const emp = employees.find(e => e.id === parseInt(selectedEmployee))

  // Default salary calculation breakdown
  const calculateSalary = (baseSalary) => {
    if (!baseSalary) return null
    const hra = Math.round(baseSalary * 0.40)
    const da = Math.round(baseSalary * 0.12)
    const ta = Math.round(baseSalary * 0.08)
    const medical = 1500
    const gross = baseSalary + hra + da + ta + medical
    const pf = Math.round(baseSalary * 0.12)
    const tax = Math.round(gross * 0.10)
    const professionalTax = 200
    const totalDeductions = pf + tax + professionalTax
    const netSalary = gross - totalDeductions

    return {
      baseSalary,
      hra, da, ta, medical, gross,
      pf, tax, professionalTax, totalDeductions,
      netSalary
    }
  }

  const salary = emp ? calculateSalary(emp.salary) : null

  const formatCurrency = (amount) => {
    return '₹' + amount.toLocaleString('en-IN')
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate('/')}>←</button>
        <h1>💰 Salary Calculator</h1>
      </div>

      <div className="page-content">
        {/* Employee Selector */}
        <div className="card animate-fade-in" style={{marginBottom: 'var(--space-md)'}}>
          <label className="form-label">Select Employee</label>
          <select
            id="salary-employee"
            className="form-input"
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
          >
            <option value="">Choose an employee</option>
            {employees.map(e => (
              <option key={e.id} value={e.id}>{e.name} - {e.department}</option>
            ))}
          </select>
        </div>

        {salary ? (
          <>
            {/* Salary Summary Card */}
            <div className="salary-card animate-fade-in animate-delay-1">
              <div className="salary-label">Net Salary</div>
              <div className="salary-amount">{formatCurrency(salary.netSalary)}</div>
              <div className="salary-label" style={{marginTop: 'var(--space-xs)'}}>per month</div>
            </div>

            {/* Earnings */}
            <div className="card animate-fade-in animate-delay-2" style={{marginBottom: 'var(--space-md)'}}>
              <h3 style={{marginBottom: 'var(--space-md)', color: 'var(--accent-green)'}}>📈 Earnings</h3>
              <div className="salary-breakdown">
                <div className="salary-row">
                  <span>Base Salary</span>
                  <span>{formatCurrency(salary.baseSalary)}</span>
                </div>
                <div className="salary-row">
                  <span>HRA (40%)</span>
                  <span>{formatCurrency(salary.hra)}</span>
                </div>
                <div className="salary-row">
                  <span>Dearness Allowance (12%)</span>
                  <span>{formatCurrency(salary.da)}</span>
                </div>
                <div className="salary-row">
                  <span>Transport Allowance (8%)</span>
                  <span>{formatCurrency(salary.ta)}</span>
                </div>
                <div className="salary-row">
                  <span>Medical Allowance</span>
                  <span>{formatCurrency(salary.medical)}</span>
                </div>
                <div className="salary-row total">
                  <span>Gross Salary</span>
                  <span>{formatCurrency(salary.gross)}</span>
                </div>
              </div>
            </div>

            {/* Deductions */}
            <div className="card animate-fade-in animate-delay-3" style={{marginBottom: 'var(--space-md)'}}>
              <h3 style={{marginBottom: 'var(--space-md)', color: 'var(--accent-red)'}}>📉 Deductions</h3>
              <div className="salary-breakdown">
                <div className="salary-row">
                  <span>Provident Fund (12%)</span>
                  <span>- {formatCurrency(salary.pf)}</span>
                </div>
                <div className="salary-row">
                  <span>Income Tax (10%)</span>
                  <span>- {formatCurrency(salary.tax)}</span>
                </div>
                <div className="salary-row">
                  <span>Professional Tax</span>
                  <span>- {formatCurrency(salary.professionalTax)}</span>
                </div>
                <div className="salary-row total">
                  <span>Total Deductions</span>
                  <span style={{color: 'var(--accent-red)'}}>- {formatCurrency(salary.totalDeductions)}</span>
                </div>
              </div>
            </div>

            {/* Employee Details */}
            <div className="card animate-fade-in animate-delay-4">
              <h3 style={{marginBottom: 'var(--space-md)'}}>👤 Employee Info</h3>
              <div className="info-row">
                <span className="info-row-icon">👤</span>
                <div className="info-row-content">
                  <span className="info-row-label">Name</span>
                  <span className="info-row-value">{emp.name}</span>
                </div>
              </div>
              <div className="info-row">
                <span className="info-row-icon">🏢</span>
                <div className="info-row-content">
                  <span className="info-row-label">Department</span>
                  <span className="info-row-value">{emp.department}</span>
                </div>
              </div>
              <div className="info-row">
                <span className="info-row-icon">💼</span>
                <div className="info-row-content">
                  <span className="info-row-label">Designation</span>
                  <span className="info-row-value">{emp.designation}</span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="empty-state animate-fade-in animate-delay-1">
            <span style={{fontSize: 64}}>💰</span>
            <p>Select an employee to view salary breakdown</p>
          </div>
        )}

        {/* All Salaries Quick View */}
        <h3 className="dash-section-title" style={{marginTop: 'var(--space-lg)', marginBottom: 'var(--space-md)'}}>
          All Employee Salaries
        </h3>
        <div className="list-container">
          {employees.map((e, idx) => (
            <div 
              key={e.id} 
              className={`list-item animate-fade-in animate-delay-${Math.min(idx + 1, 6)}`}
              onClick={() => setSelectedEmployee(String(e.id))}
              style={{cursor: 'pointer'}}
            >
              <div className="list-item-left">
                <div className="list-avatar" style={{background: 'var(--primary-gradient)'}}>
                  {e.name.charAt(0)}
                </div>
                <div className="list-item-info">
                  <span className="list-item-title">{e.name}</span>
                  <span className="list-item-subtitle">{e.department} • {e.designation}</span>
                </div>
              </div>
              <span style={{fontWeight: 700, color: 'var(--accent-green)', fontSize: 'var(--font-sm)'}}>
                ₹{e.salary.toLocaleString('en-IN')}
              </span>
            </div>
          ))}
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
        <button className="bottom-nav-item active">
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

export default Salary
