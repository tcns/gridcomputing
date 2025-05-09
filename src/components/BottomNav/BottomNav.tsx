// BottomNav.tsx
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import iconGrid from '../../assets/sidebar/grid.svg'
import iconNetwork from '../../assets/network/network.svg'
import './BottomNav.css'

interface BottomNavProps {
  className?: string
}

const BottomNav: React.FC<BottomNavProps> = ({ className }) => {
  const location = useLocation()
  const [activeLink, setActiveLink] = useState<string>(location.pathname)

  useEffect(() => {
    setActiveLink(location.pathname)
  }, [location.pathname])

  const handleLinkClick = (link: string) => {
    setActiveLink(link)
  }

  return (
    <div className="bottom-nav">
      <Link
        to="/node"
        onClick={() => handleLinkClick('/node')}
        className={activeLink === '/node' ? 'active' : ''}
      >
        <img className="bottom-nav-icon " src={iconGrid} alt="Тщву" />
      </Link>
      <Link
        to="/stats"
        onClick={() => handleLinkClick('/stats')}
        className={activeLink === '/stats' ? 'active' : ''}
      >
        <img
          src={iconNetwork}
          alt="Grid Infra Stats"
          style={{ width: '21px' }}
          className="bottom-nav-icon"
        />
      </Link>
    </div>
  )
}

export default BottomNav
