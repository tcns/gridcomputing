import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import logo from '../../assets/sidebar/logo.jpg'
import iconGrid from '../../assets/sidebar/grid.svg'
import iconGridNon from '../../assets/sidebar/grid_nonactive.svg'
import iconNetwork from '../../assets/network/network.svg'
import iconNetworkNon from '../../assets/network/network_nonactive.svg'
import './Sidebar.css'

interface SidebarProps {
  className?: string
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const location = useLocation()

  return (
    <aside className={`sidebar ${className || ''}`}>
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
        <span className="logo-text">Grid</span>
      </div>
      
      <nav className="nav-links">
        <Link
          to="/node"
          className={`nav-link ${location.pathname === '/node' ? 'active' : ''}`}
        >
          <img
            src={location.pathname === '/node' ? iconGrid : iconGridNon}
            alt="Node"
            width={24}
            height={24}
          />
          Node
        </Link>
        
        <Link
          to="/stats"
          className={`nav-link ${location.pathname === '/stats' ? 'active' : ''}`}
        >
          <img
            src={location.pathname === '/stats' ? iconNetwork : iconNetworkNon}
            alt="Stats"
            width={24}
            height={24}
          />
          Stats
        </Link>
      </nav>
    </aside>
  )
}

export default Sidebar
