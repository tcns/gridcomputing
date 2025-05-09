import { FC } from 'react'

type CustomDotProps = {
  cx: number
  cy: number
}

const CustomDot: FC<CustomDotProps> = ({ cx, cy }) => {
  return (
    <g>
      <circle
        cx={cx}
        cy={cy}
        r={10}
        strokeWidth={5}
        stroke="#000"
        fill="none"
      />
      <circle cx={cx} cy={cy} r={7} fill="#E99172" />
    </g>
  )
}

export default CustomDot
