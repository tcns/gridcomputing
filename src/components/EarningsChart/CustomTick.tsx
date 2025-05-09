import React from 'react'
import dayjs from 'dayjs'
interface CustomTickProps {
  x: number
  y: number
  payload: {
    value: string
  }
}

// @ts-ignore
export const DateTick = ({ x, y, payload }) => {
  const formattedDate = dayjs(payload.value).format('HH:mm')
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        className="date-tick"
        fontSize={16}
        fontWeight="bold"
        textAnchor="middle"
        dy={16}
      >
        {formattedDate}
      </text>
    </g>
  )
}

function drawDate(x, y, day: string, month: string) {
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        className="date-tick"
        fontSize={16}
        fontWeight="bold"
        textAnchor="middle"
        dy={16}
      >
        {day}
      </text>
      <text className="date-tick" fontSize={11} textAnchor="middle" dy={27}>
        {month}
      </text>
    </g>
  )
}

const CustomTick: React.FC<CustomTickProps> = ({ x, y, payload }) => {
  const [day, month] = payload.value.split(' ')

  return drawDate(x, y, day, month)
}

export default CustomTick
