import { ConnectButton } from '@rainbow-me/rainbowkit'
import connect_dashboard from '../../assets/dashboard/connect_dashboard.svg'
import ButtonConnect from '../ButtonConnect/ButtonConnect'
import logo from '../../assets/network/logo.svg'
import './WalletConnectionStatus.css'

const CustomConnectButtonContainer = () => {
  return (
    <div className="custom-button-container">
      <ButtonConnect />
      <div className="bottom-border"></div>
    </div>
  )
}

const WalletConnectionStatus = () => {
  return (
    <>
      <div className="header-container">
        <img src={logo} alt="Logo" className="status-logo" />
        <div className="status-container">
          <span className={`status-enter status-circle disconnected`}></span>
          <span className="status-text-enter">Disconnected</span>
        </div>
      </div>
      <div className="centered-container">
        <div className="centered-container-content">
          <div>
            <img src={connect_dashboard} alt="Dashboard" />
          </div>
          <p>Connect Your Wallet</p>
          <p>Please connect your wallet to view the dashboard</p>
          <div className="custom-connect-button">
            <ConnectButton />
          </div>
        </div>
      </div>
    </>
  )
}

export default WalletConnectionStatus
