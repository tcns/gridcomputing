import React, { useEffect, useState } from 'react'
import { NodeNetStat } from '../../api'
import { fileStatApi } from '../../allApi.ts'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from 'recharts'
import { DateTick } from '../EarningsChart/CustomTick.tsx'
import { normalizeData } from '../../utils.ts'
import CustomTooltip from '../EarningsChart/CustomTooltip.tsx'
import CustomDot from '../EarningsChart/CustomDot.tsx'
import iconChart from '../../assets/network/chart.svg'
import active_users from '../../assets/network/active_users.svg'
import total from '../../assets/network/total.svg'

import './Network.css'
import { useTheme } from '../../contexts/ThemeContext.tsx'

const Network: React.FC = () => {
  const [network, setNetwork] = useState<NodeNetStat>({
    totalTasks: 0,
    uniqueUsers: 0,
    activeUsers: 0,
    tasks1h: 0,
    tasks5min: 0,
    tasks24h: 0,
    hourStats: [],
    minuteStats: [],
  })


  useEffect(() => {
    fetchData()
    const interval = setInterval(() => {
      fetchData()
    }, 60000)
    return () => clearInterval(interval)
  }, [])
  const fetchData = async () => {
    try {
      const response = await fileStatApi.networkStats()
      setNetwork(response.data)

    } catch (err) {
      console.error(err)
    }
  }


  return (
    <div className="Network">
      <h1 className="page-header">Grid Infra Stats</h1>
        {network != null ? (
            <div className="stats-container">
              <div className="stats-table">
                <div className="row glow-border">
                  <div className="col">Total Tasks Solved</div>
                  <div className="col">{network.totalTasks}</div>
                </div>
                <div className="row glow-border">
                  <div className="col">Unique Users</div>
                  <div className="col">{network.uniqueUsers}</div>
                </div>
                <div className="row glow-border">
                  <div className="col">Active Users</div>
                  <div className="col">{network.activeUsers}</div>
                </div>
                <div className="row glow-border">
                  <div className="col">Tasks Solved 24h</div>
                  <div className="col">{network.tasks24h}</div>
                </div>
{/*                <div className="row glow-border">
                  <div className="col">Total Earned</div>
                  <div className="col">0 SOL</div>
                </div>*/}
              </div>
            </div>
        ) : (
            <p className="no-results">No stats found</p>
        )}

    </div>
  )
}

export default Network
