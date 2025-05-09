import React, { useEffect, useState } from 'react'
import {
  ResponsiveContainer,
  LineChart,
  XAxis,
  Tooltip,
  Line,
  CartesianGrid,
} from 'recharts'
import CustomDot from './CustomDot.tsx'
import CustomTick from './CustomTick'
import CustomTooltip from './CustomTooltip.tsx'
import dayjs from 'dayjs'

interface EarningsChartProps {
  data: Array<{
    name: string
    earnings: string | number | undefined
    bytes: string | number | undefined
    share: string | number | undefined
  }>
}

const EarningsChart: React.FC<EarningsChartProps> = ({ data }) => {
  const [chartWidth, setChartWidth] = useState(
    window.innerWidth < 1400 ? '330%' : '100%'
  )

  useEffect(() => {
    const handleResize = () => {
      setChartWidth(window.innerWidth < 1400 ? '330%' : '100%')
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, []) //chartWidth
  return (
    <div className="chart-scroll-container">
      <ResponsiveContainer
        className="chart-container"
        width={chartWidth}
        height={400}
      >
        <LineChart data={data}>
          <CartesianGrid
            strokeDasharray="5 5"
            stroke="#FFFFFF47"
            vertical={true}
            horizontal={true}
          />

          <XAxis
            dataKey="name"
            //@ts-ignore
            tick={<CustomTick />}
            className="date-tick"
            strokeWidth={1}
            interval={0}
          />

          <Tooltip content={<CustomTooltip />} />
          {/* earnings линия */}
          <Line
            type="monotone"
            dataKey="earnings"
            stroke="#F0B25A"
            strokeWidth={2}
            dot={false}
            //@ts-ignore
            activeDot={<CustomDot />}
            isAnimationActive={true}
            animationDuration={500}
          />
          {/* bytes линия */}
          <Line
            type="monotone"
            dataKey="bytes"
            stroke="#7193F1"
            strokeWidth={2}
            dot={false}
            //@ts-ignore
            activeDot={<CustomDot />}
            isAnimationActive={true}
            animationDuration={500}
          />
          {/* share линия */}
          <Line
            type="monotone"
            dataKey="share"
            stroke="#5FDBC6"
            strokeWidth={2}
            dot={false}
            //@ts-ignore
            activeDot={<CustomDot />}
            isAnimationActive={true}
            animationDuration={500}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default EarningsChart
