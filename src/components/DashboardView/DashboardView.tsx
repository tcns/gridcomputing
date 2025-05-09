import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { fileStatApi } from '../../allApi.ts'
import { formatBytes, formatWei, prepareChartData } from '../../utils.ts'
import { Dashboard, Node } from '../../api/api.ts'
import { useSearchParams } from 'react-router-dom'
import NetworkSection from './NetworkSection/NetworkSection.tsx'
import './DashboardView.css'
import {ethers} from "ethers";

const DashboardView: React.FC = () => {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    connected: false,
    uptimeHour: 0,
    uptimePercent: 0,
    uniqueNodes: 0,
    tasksSolved: 0,
    totalEarned: 0,
  })
  const [searchQuery, setSearchQuery] = useState('')
  const [searchParams, setSearchParams] = useSearchParams()
  const [dashboard, setDashboard] = useState<Dashboard>({
    unrealizedBalance: 0,
    todayEarnings: 0,
    todayTasks: 0,
    totalEarnings: 0,
    totalTasks: 0,
    connectedNode: {
        connected: false,
        name: '',
        id: '',
        timeConnected: 0,
        nodeScore: 0
    },
    earningsToday: [],
    earning15Days: [],
    earning30Days: [],
    dataProcessedCumulative: {
      totalBytes: 0,
      last15Days: []
    },
    nodes: []
  })

  interface DashboardData {
    connected: boolean
    uptimeHour: number
    uptimePercent: number
    uniqueNodes: number
    tasksSolved: number,
    totalEarned: number
  }
  let customWallet = searchParams.get('address')
  const [isSearchDisabled, setIsSearchDisabled] = useState(true);
  const fetchData = useCallback(async () => {
    if (!customWallet) return

    let userAddress = customWallet.toLowerCase()
    try {
      const response = await fileStatApi.userDashboard(userAddress)
      setDashboard(response.data)
      console.log('Fetched Dashboard:', response.data)
    } catch (err) {
      console.error('Error fetching earnings:', err)
    }
  }, [customWallet])
  useEffect(() => {
    fetchData()
  }, [fetchData])
  useEffect(() => {
    if (!customWallet) return

    const updatedDashboardData = {
        connected: dashboard.connectedNode?.connected ?? false,
        uptimeHour: dashboard.connectedNode?.timeConnected ?? 0,
        uptimePercent: dashboard.connectedNode?.nodeScore ?? 0,
        uniqueNodes: dashboard.nodes.length ?? 0,
        tasksSolved: dashboard.totalTasks,
        totalEarned: Number(ethers.formatUnits(dashboard.totalEarnings.toString(), 6))
    }

    setDashboardData(updatedDashboardData)
  }, [dashboard, customWallet])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value.toLowerCase())
    setIsSearchDisabled(!isValidSolanaAddress(e.target.value));
  }


  const isValidSolanaAddress = (address: string) => {
    return /^([1-9A-HJ-NP-Za-km-z]{32,44})$/.test(address);
  };
  const handleAddressSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      setSearchParams({ address: searchQuery }) // Update the browser URL
      fetchData() // Fetch new data for the searched address
    }
  }

  return (
      <div className="dashboard-container">
        <h1 className="page-header">Node Stats</h1>
        <div className={`search-container ${customWallet ? 'search-small' : 'search-large'}`}>
          <form onSubmit={handleAddressSearch} className="search-form">
            <input
                type="text"
                placeholder="Enter Wallet Address..."
                value={searchQuery}
                onChange={handleSearch}
                className="search-input"
            />
            <div className="search-button-container">
              <button type="submit" disabled={isSearchDisabled} className="search-button">Search</button>
            </div>
          </form>
        </div>

        {customWallet && (
            <>
              {dashboardData != null ? (
                  <div className="stats-container">
                    <div className="stats-table">
                      <div className="row glow-border">
                        <div className="col">Connected</div>
                        <div className="col">{dashboardData.connected}</div>
                      </div>
                      <div className="row glow-border">
                        <div className="col">Uptime</div>
                        <div className="col">{dashboardData.uptimeHour} Hrs / {dashboardData.uptimePercent} %</div>
                      </div>
                      <div className="row glow-border">
                        <div className="col">Unique Nodes</div>
                        <div className="col">{dashboardData.uniqueNodes}</div>
                      </div>
                      <div className="row glow-border">
                        <div className="col">Tasks Solved</div>
                        <div className="col">{dashboardData.tasksSolved}</div>
                      </div>
                      <div className="row glow-border">
                        <div className="col">Total Earned</div>
                        <div className="col">{dashboardData.totalEarned.toFixed(2)} Tokens</div>
                      </div>
                    </div>
                  </div>
              ) : (
                  <p className="no-results">No stats found</p>
              )}

              {/*           <NetworkSection nodes={dashboard.nodes}/>*/}
            </>
        )}
      </div>
  )
}

export default DashboardView
