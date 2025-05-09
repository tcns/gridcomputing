import { useTheme } from '../../../contexts/ThemeContext'
import dol_icon from '../../../assets/dashboard/dol_icon.svg'
import './EarningsSection.css'

interface EarningsSectionProps {
  todayEarnings: number | string | undefined
  totalEarnings: number | string | undefined
  unrealizedBalance: number | string | undefined
  iconCoins: string
  iconCoinsBlack: string
}

const EarningsSection: React.FC<EarningsSectionProps> = ({
  todayEarnings = 0,
  totalEarnings = 0,
  unrealizedBalance = 0,
  iconCoins,
  iconCoinsBlack,
}) => {
  const { isDarkTheme } = useTheme()
  const iconCoinsTheme = isDarkTheme ? iconCoins : iconCoinsBlack
  return (
    <div className="earnings-section">
      <div className="earnings-box">
        <div className="left-section">
          <div className="icon-container">
            <img src={dol_icon} alt="" />
          </div>
          <div className="text-container">
            <h3>Today's Earnings:</h3>
            <p className="today-earnings">
              {todayEarnings} <span>LCT</span>
            </p>
            <p className="uptime-info">Unrealized: 200 LTC</p>
          </div>
        </div>
        <div className="divider"></div>{' '}
        {/* Вертикальная линия между секциями */}
        <div className="right-section">
          <h3>Total Earnings:</h3>
          <p className="total-earnings">
            {totalEarnings} <span>LCT</span>
          </p>
          <p className="uptime-info">UNREALIZED: {unrealizedBalance} LCT</p>
        </div>
      </div>
    </div>
  )
}

export default EarningsSection
