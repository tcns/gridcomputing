import React from 'react'
import { TooltipProps } from 'recharts'
import { formatBytes } from '../../utils.ts'

const CustomTooltip: React.FC<TooltipProps<number, string>> = ({
  active,
  payload,
}) => {
  if (active && payload && payload.length) {
    const name = payload[0].payload.name
    const dateValue = payload[0].payload.date
    const date = new Date(dateValue)
    const isValidDate = !isNaN(date.getTime())

    const time = isValidDate
      ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      : false

    return (
      <div
        className="custom-tooltip"
        style={{
          borderRadius: '18px',
          padding: '15px',
        }}
      >
        {time && (
          <p
            className="tooltip-time"
            style={{ marginBottom: '0', fontWeight: 600, fontSize: '14px' }}
          >
            {time}
          </p>
        )}
        {name && (
          <p
            className="tooltip-name"
            style={{ marginBottom: '0', fontWeight: 600, fontSize: '14px' }}
          >
            {name}
          </p>
        )}
        {payload.map((item, index) => {
          console.log(item)
          // @ts-ignore
          const className = `circle achievement-circle-${item.name.toLowerCase().replace(/\s+/g, '').replace('_normalized', '')}`
          let originalValue = item.payload[`${item.dataKey}_original`]
          if (
            item.name != null &&
            (item.name.toLowerCase() == 'bytes' ||
              item.name.toLowerCase() == 'amount')
          ) {
            originalValue = formatBytes(originalValue)
          }
          return (
            <div key={index}>
              <div className="achievement-item">
                <span className={className}></span>
                <span style={{ fontSize: '12px' }}>
                  {item.name}: {originalValue}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
  return null
}

export default CustomTooltip
