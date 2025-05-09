import React, { useEffect, useState } from 'react'
import { ThemeProvider, useTheme } from './contexts/ThemeContext'
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import Header from './components/Header/Header'
import Sidebar from './components/Sidebar/Sidebar'
import { Outlet, useLocation } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import BottomNav from './components/BottomNav/BottomNav'

const App: React.FC = () => {
  const { address, isConnected } = useAccount()
  const [isWalletConnected, setIsWalletConnected] = useState(isConnected)
  const location = useLocation()

  useEffect(() => {
    setIsWalletConnected(isConnected)
  }, [isConnected])

  return (
    <ThemeProvider>
      <AppContent
        isWalletConnected={isWalletConnected}
        address={address || null}
      />
    </ThemeProvider>
  )
}

const AppContent: React.FC<{
  isWalletConnected: boolean
  address: string | null
}> = ({ isWalletConnected, address }) => {
  const { isDarkTheme, toggleTheme } = useTheme()
  const location = useLocation()

  useEffect(() => {
    document.body.setAttribute('data-theme', isDarkTheme ? 'light' : 'dark')
  }, [isDarkTheme])

  const titleMap: Record<string, string> = {
    '/stats': 'Stats',
    '/node': 'Node Stats'
  }

  const currentTitle = titleMap[location.pathname] || 'Dashboard'

  return (
    <RainbowKitProvider
      theme={darkTheme({
        accentColor: 'white',
        accentColorForeground: 'black',
        borderRadius: 'large',
        fontStack: 'system',
        overlayBlur: 'small',
      })}
    >
      <div className="app-container">
        <Sidebar className="sidebar" />
        <div className="main-content">
          <div className="dashboard-container">
{/*            <Header
              className="header"
              title={currentTitle}
              isVisible={isWalletConnected}
            />*/}
            <Outlet context={{ isWalletConnected, address }} />{' '}
          </div>
        </div>
        <BottomNav className="bottom-nav" />
      </div>
    </RainbowKitProvider>
  )
}

export default App
