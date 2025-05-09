import React, { useState } from 'react'
import {
  displayError,
  formatBytes,
  formatNumber,
  formatTimeConnected,
  formatWei,
} from '../../../utils'
import iconNetwork from '../../../assets/network/network.svg'
import iconWifiBlackW from '../../../assets/network/wifi_black.svg'
import './NetworkSection.css'

interface Node {
  connected: boolean
  name: string
  ip: string
  timeConnected: number
  networkScore: number
}

interface NodesSectionProps {
  nodes: Node[]
}

const NetworkSection: React.FC<NodesSectionProps> = ({ nodes }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleRow = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="network-container">
      <div className="network-header">
        <div className="network-container-left">
          <p className="network-title">Nodes</p>
          {/*<button className="devaice-type">Add Device Type</button>*/}
        </div>
      </div>
      {/*<button className="devaice-type-mobile">Add Device Type</button>*/}
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col" className="num-col">
              №
            </th>
            <th scope="col" className="status-col">
              <img src={iconWifiBlackW} alt="" /> Status
            </th>
            {/* <th scope="col" className="name-col">
              Network Name
            </th>*/}
            <th scope="col" className="ip-col">
              Ip
            </th>
            <th scope="col" className="time-col">
              Time Connected (mins)
            </th>
            <th scope="col" className="points-col">
              Data Processed:
            </th>
            <th scope="col" className="action-col"></th>
          </tr>
        </thead>
        <tbody>
          {nodes.map((network, index) => (
            <React.Fragment key={index}>
              <tr className={network.connected ? 'table-success' : ''}>
                <td className="index-col">{index + 1}</td>
                <td
                  className={`connected-col ${network.connected ? 'table-success' : ''}`}
                >
                  <span
                    className={`status-circle ${network.connected ? 'connected' : 'disconnected'}`}
                  ></span>
                  {network.connected ? 'Connected' : 'Not Connected'}
                  <span className="ip-mobile">{network.ip}</span>
                </td>
                {/* <td className="name-col">{network.name}</td>*/}
                <td className="ip-col">{network.ip}</td>
                <td className="time-col">
                  <span>{formatTimeConnected(network.timeConnected)}</span>
                </td>
                <td className="score-col">
                  <div className="score-sphere">
                    <span>{formatBytes(network.networkScore)}</span>
                  </div>
                </td>
                <td className="action-col">
                  <button onClick={() => toggleRow(index)}>
                    {openIndex === index ? 'Hide' : 'Details'}
                  </button>
                </td>
              </tr>
              {openIndex === index && (
                <tr className="detail-row">
                  <td colSpan={7}>
                    <div className="details">
                      <p>
                        <strong>Data Processed:</strong>
                        <span
                          style={{ display: 'inline' }}
                          className="score-sphere"
                        >
                          {formatBytes(network.networkScore)}
                        </span>
                      </p>
                      <p>
                        <strong>Time Connected: </strong>
                        <span>
                          {formatTimeConnected(network.timeConnected)}
                        </span>
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default NetworkSection
