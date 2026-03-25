import { useState, createContext, useContext } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Attendance from './pages/Attendance'
import Leave from './pages/Leave'
import Department from './pages/Department'
import Designation from './pages/Designation'
import Salary from './pages/Salary'
import Profile from './pages/Profile'
import Admin from './pages/Admin'
import Employees from './pages/Employees'

// Auth Context
export const AuthContext = createContext(null)

export function useAuth() {
  return useContext(AuthContext)
}

function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('hrm_user')
    return saved ? JSON.parse(saved) : null
  })

  const [employees, setEmployees] = useState(() => {
    const saved = localStorage.getItem('hrm_employees')
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        name: 'Rahul Sharma',
        email: 'rahul@company.com',
        mobile: '9876543210',
        department: 'Engineering',
        designation: 'Senior Developer',
        salary: 85000,
        joinDate: '2024-01-15',
        status: 'active',
        photo: null
      },
      {
        id: 2,
        name: 'Priya Patel',
        email: 'priya@company.com',
        mobile: '9876543211',
        department: 'Design',
        designation: 'UI/UX Designer',
        salary: 65000,
        joinDate: '2024-03-20',
        status: 'active',
        photo: null
      },
      {
        id: 3,
        name: 'Amit Kumar',
        email: 'amit@company.com',
        mobile: '9876543212',
        department: 'Marketing',
        designation: 'Marketing Manager',
        salary: 75000,
        joinDate: '2023-11-05',
        status: 'active',
        photo: null
      },
      {
        id: 4,
        name: 'Sneha Gupta',
        email: 'sneha@company.com',
        mobile: '9876543213',
        department: 'HR',
        designation: 'HR Executive',
        salary: 55000,
        joinDate: '2024-06-10',
        status: 'active',
        photo: null
      },
      {
        id: 5,
        name: 'Vikram Singh',
        email: 'vikram@company.com',
        mobile: '9876543214',
        department: 'Engineering',
        designation: 'DevOps Engineer',
        salary: 90000,
        joinDate: '2023-08-22',
        status: 'active',
        photo: null
      }
    ]
  })

  const [attendance, setAttendance] = useState(() => {
    const saved = localStorage.getItem('hrm_attendance')
    return saved ? JSON.parse(saved) : []
  })

  const [leaves, setLeaves] = useState(() => {
    const saved = localStorage.getItem('hrm_leaves')
    return saved ? JSON.parse(saved) : []
  })

  const [departments] = useState([
    'Engineering', 'Design', 'Marketing', 'HR', 'Finance', 'Sales', 'Operations'
  ])

  const [designations] = useState([
    'Senior Developer', 'Junior Developer', 'UI/UX Designer', 'Marketing Manager',
    'HR Executive', 'DevOps Engineer', 'Product Manager', 'Team Lead',
    'QA Engineer', 'Data Analyst', 'Sales Executive', 'Finance Manager'
  ])

  const login = (userData) => {
    setUser(userData)
    localStorage.setItem('hrm_user', JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('hrm_user')
  }

  const saveEmployees = (newEmployees) => {
    setEmployees(newEmployees)
    localStorage.setItem('hrm_employees', JSON.stringify(newEmployees))
  }

  const saveAttendance = (newAttendance) => {
    setAttendance(newAttendance)
    localStorage.setItem('hrm_attendance', JSON.stringify(newAttendance))
  }

  const saveLeaves = (newLeaves) => {
    setLeaves(newLeaves)
    localStorage.setItem('hrm_leaves', JSON.stringify(newLeaves))
  }

  const contextValue = {
    user, login, logout,
    employees, saveEmployees,
    attendance, saveAttendance,
    leaves, saveLeaves,
    departments, designations
  }

  return (
    <AuthContext.Provider value={contextValue}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
          <Route path="/signup" element={user ? <Navigate to="/" /> : <Signup />} />
          <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/attendance" element={user ? <Attendance /> : <Navigate to="/login" />} />
          <Route path="/leave" element={user ? <Leave /> : <Navigate to="/login" />} />
          <Route path="/department" element={user ? <Department /> : <Navigate to="/login" />} />
          <Route path="/designation" element={user ? <Designation /> : <Navigate to="/login" />} />
          <Route path="/salary" element={user ? <Salary /> : <Navigate to="/login" />} />
          <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/admin" element={user ? <Admin /> : <Navigate to="/login" />} />
          <Route path="/employees" element={user ? <Employees /> : <Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App
