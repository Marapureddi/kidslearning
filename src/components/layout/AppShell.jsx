import { useNavigate, useLocation } from 'react-router-dom'
import { FaHome, FaArrowLeft } from 'react-icons/fa'
import './AppShell.css'

export default function AppShell({ children }) {
  const navigate = useNavigate()
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <div className="app-shell">
      {!isHome && (
        <nav className="top-bar">
          <button className="nav-btn" onClick={() => navigate(-1)}>
            <FaArrowLeft /> Back
          </button>
          <button className="nav-btn home-btn" onClick={() => navigate('/')}>
            <FaHome /> Home
          </button>
        </nav>
      )}
      <main className="main-content">
        {children}
      </main>
    </div>
  )
}
