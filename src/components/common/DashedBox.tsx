import type { CSSProperties, ReactNode, HTMLAttributes } from 'react'

interface DashedBoxProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  className?: string
  dashLength?: number
  dashGap?: number
  borderWidth?: number
  borderRadius?: number
  color?: string
  lineCap?: 'butt' | 'round' | 'square'
  style?: CSSProperties
}

export function DashedBox({
  children,
  className = '',
  dashLength = 4,
  dashGap = 4,
  borderWidth = 2,
  borderRadius = 8,
  color = '#D1D5DB',
  lineCap = 'round',
  style,
  ...rest
}: DashedBoxProps) {
  return (
    <div
      className={`dashed-box ${className}`}
      style={{
        borderRadius: `${borderRadius}px`,
        ...style,
      }}
      {...rest}
    >
      <svg
        className="dashed-box-svg"
        style={{ borderRadius: `${borderRadius}px` }}
      >
        <rect
          x={borderWidth / 2}
          y={borderWidth / 2}
          width={`calc(100% - ${borderWidth}px)`}
          height={`calc(100% - ${borderWidth}px)`}
          rx={borderRadius}
          ry={borderRadius}
          fill="none"
          stroke={color}
          strokeWidth={borderWidth}
          strokeDasharray={`${dashLength} ${dashGap}`}
          strokeLinecap={lineCap}
        />
      </svg>
      <div className="dashed-box-content">{children}</div>
    </div>
  )
}
