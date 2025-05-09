import React, { useEffect, useState } from 'react'
import { NodeNetStat } from '../../api'
import { fileStatApi } from '../../allApi.ts'
import './Network.css'

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
      <h1 className="page-header">Network Statistics</h1>
      {network != null ? (
        <div className="stats-container">
          <div className="stats-table">
            <div className="row">
              <div className="col">Total Tasks Solved</div>
              <div className="col">{network.totalTasks.toLocaleString()}</div>
            </div>
            <div className="row">
              <div className="col">Unique Users</div>
              <div className="col">{network.uniqueUsers.toLocaleString()}</div>
            </div>
            <div className="row">
              <div className="col">Active Users</div>
              <div className="col">{network.activeUsers.toLocaleString()}</div>
            </div>
            <div className="row">
              <div className="col">Tasks Solved (24h)</div>
              <div className="col">{network.tasks24h.toLocaleString()}</div>
            </div>
          </div>
        </div>
      ) : (
        <p className="no-results">No statistics available</p>
      )}
    </div>
  )
}

export default Network
