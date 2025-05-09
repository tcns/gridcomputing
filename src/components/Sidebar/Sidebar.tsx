import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

import logo from '../../assets/sidebar/logo.png'
import iconGrid from '../../assets/sidebar/grid.svg'
import iconGridNon from '../../assets/sidebar/grid_nonactive.svg'
import iconEtherscan from '../../assets/sidebar/etherscan.svg'
import iconUniswap from '../../assets/sidebar/uniswap.svg'
import iconBook from '../../assets/sidebar/book.svg'
import iconUser from '../../assets/sidebar/user.svg'
import iconUsers from '../../assets/sidebar/users.svg'
import iconNetwork from '../../assets/network/network.svg'
import './Sidebar.css'

interface SidebarProps {
  className?: string
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const location = useLocation()
  const [activeLink, setActiveLink] = useState<string>(location.pathname)

  useEffect(() => {
    setActiveLink(location.pathname)
  }, [location.pathname])

  const handleLinkClick = (link: string) => {
    setActiveLink(link)
  }

  return (
    <aside className={`sidebar ${className}`}>
      <div className="logo-container">
        <img src={logo} alt="Logo" className="sidebar-logo" />
      </div>
      <p className="sidebar-title"> </p>
      <nav>
        <ul>
          <li>
            <Link
              to="/node"
              onClick={() => handleLinkClick('/node')}
              className={activeLink === '/node' ? 'active' : ''}
            >
              <span className="icon">
                <img
                  src={activeLink === '/node' ? iconGrid : iconGridNon} // Используем иконку в зависимости от активности
                  alt="Nodes"
                  className="sidebar-icon sidebar-link-icon"
                  style={{ width: '28px', height: '28px' }}
                />
              </span>
              <span className="sidebar-text">
                {activeLink === '/node' ? <b>Node</b> : 'Node'}
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/stats"
              onClick={() => handleLinkClick('/stats')}
              className={activeLink === '/stats' ? 'active' : ''}
            >
              <span className="icon ">
                <img
                  className={
                    activeLink === '/stats' ? 'active' : 'sidebar-link-icon'
                  }
                  src={iconNetwork}
                  alt="Stats"
                  style={{ width: '28px' }}
                />
              </span>
              <span className="sidebar-text">
                {activeLink === '/stats' ? <b>Stats</b> : 'Stats'}
              </span>
            </Link>
          </li>
          {/* <li>
            <Link to="#">
              <span className="icon">
                <img
                  src={iconWifi}
                  alt="Data Labeling"
                  className="sidebar-icon"
                />
              </span>
              <span className="icon"> Data Labeling</span>
            </Link>
          </li>*/}
          {/*<li>
            <Link to="#">
              <span className="icon">
                <img src={iconMedal} alt="Rewards" className="sidebar-icon" />
              </span>
              <span className="icon"> Rewards </span>
            </Link>
          </li>*/}
          {/*<li>
            <Link to="#">
              <span className="icon">
                <img src={iconBasket} alt="Store" className="sidebar-icon" />
              </span>
              <span className="icon"> Store </span>{' '}
              <span className="device-store">NEW</span>
            </Link>
          </li>*/}
        </ul>
      </nav>

      {
        <div className="referral-section">
          {/*<hr className="dashed-line" />
        <div className="referral-header">
          <span className="icon">
            <img src={iconUsers} alt="Referrals" className="sidebar-icon" />
          </span>
          <b>REFFERALS</b>
        </div>
        <p className="referral-text">
          Use this link to bring your friends and earn money
        </p>
        <div className="referral-input">
          <input type="text" placeholder="Your Referral Link" />
          <button className="copy-button">Copy</button>
        </div>
        <hr className="dashed-line" />*/}
          <div className="referral-icon-footer">
            {/* <img src={iconEtherscan} alt="Referrals" />
            <img src={iconUniswap} alt="Referrals" />
            <img src={iconBook} alt="Referrals" />*/}
          </div>
          <p className="copyright">
            {/*<b>©Copyright 2024</b> <span>All rights reserved.</span>*/}
          </p>
        </div>
      }

      <div className="footer-form"></div>
    </aside>
  )
}

export default Sidebar
//1
