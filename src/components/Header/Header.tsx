import React from 'react'
import ButtonConnect from '../ButtonConnect/ButtonConnect'
import logo from '../../assets/network/logo.svg'
import './Header.css'
import { ConnectButton } from '@rainbow-me/rainbowkit'

const CustomConnectButtonContainer = () => {
  return (
    <div className="custom-button-container">
      <ButtonConnect /> {/* Используем новый компонент кнопки */}
      <div className="bottom-border"></div>
    </div>
  )
}

interface HeaderProps {
  className?: string
  title: string
}

const Header: React.FC<HeaderProps & { isVisible: boolean }> = ({
  className,
  title,
  isVisible,
}) => {
  if (!isVisible) {
    return null
  }
  return (
    <header className={`header-content ${className}`}>
      <div>
        <img src={logo} alt="Logo" className="header-logo" />
        <h1 className="header-title">{title}</h1>
      </div>
      <div className=" ">
        <div className="custom-connect-button">
          <ConnectButton />
        </div>
      </div>
    </header>
  )
}

export default Header
