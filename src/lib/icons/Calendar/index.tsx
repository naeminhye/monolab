import React from 'react'

interface IconProps {
  size?: number
  fill?: string
}

const Calendar = ({ size = 32, fill = '#333333' }: IconProps) => (
  <svg
    viewBox='0 0 1024 1024'
    version='1.1'
    xmlns='http://www.w3.org/2000/svg'
    width={size}
    height={size}
  >
    <path
      d='M868.266667 919.466667H155.733333c-46.933333 0-85.333333-38.4-85.333333-85.333334V275.2c0-46.933333 38.4-85.333333 85.333333-85.333333h712.533334c46.933333 0 85.333333 38.4 85.333333 85.333333v558.933333c0 46.933333-38.4 85.333333-85.333333 85.333334zM155.733333 232.533333c-23.466667 0-42.666667 19.2-42.666666 42.666667v558.933333c0 23.466667 19.2 42.666667 42.666666 42.666667h712.533334c23.466667 0 42.666667-19.2 42.666666-42.666667V275.2c0-23.466667-19.2-42.666667-42.666666-42.666667H155.733333z'
      fill={fill}
    />
    <path
      d='M328.533333 317.866667c-12.8 0-21.333333-8.533333-21.333333-21.333334v-170.666666c0-12.8 8.533333-21.333333 21.333333-21.333334s21.333333 8.533333 21.333334 21.333334v170.666666c0 12.8-10.666667 21.333333-21.333334 21.333334zM697.6 317.866667c-12.8 0-21.333333-8.533333-21.333333-21.333334v-170.666666c0-12.8 8.533333-21.333333 21.333333-21.333334s21.333333 8.533333 21.333333 21.333334v170.666666c0 12.8-8.533333 21.333333-21.333333 21.333334zM403.2 445.866667H91.733333c-12.8 0-21.333333-8.533333-21.333333-21.333334s8.533333-21.333333 21.333333-21.333333h311.466667c12.8 0 21.333333 8.533333 21.333333 21.333333s-8.533333 21.333333-21.333333 21.333334zM932.266667 445.866667H620.8c-12.8 0-21.333333-8.533333-21.333333-21.333334s8.533333-21.333333 21.333333-21.333333h311.466667c12.8 0 21.333333 8.533333 21.333333 21.333333s-10.666667 21.333333-21.333333 21.333334z'
      fill={fill}
    />
    <path
      d='M509.866667 424.533333m-32 0a32 32 0 1 0 64 0 32 32 0 1 0-64 0Z'
      fill={fill}
    />
    <path
      d='M300.8 597.333333h-85.333333c-12.8 0-21.333333-8.533333-21.333334-21.333333s8.533333-21.333333 21.333334-21.333333h85.333333c12.8 0 21.333333 8.533333 21.333333 21.333333s-8.533333 21.333333-21.333333 21.333333zM550.4 597.333333h-85.333333c-12.8 0-21.333333-8.533333-21.333334-21.333333s8.533333-21.333333 21.333334-21.333333h85.333333c12.8 0 21.333333 8.533333 21.333333 21.333333s-8.533333 21.333333-21.333333 21.333333zM800 597.333333h-85.333333c-12.8 0-21.333333-8.533333-21.333334-21.333333s8.533333-21.333333 21.333334-21.333333h85.333333c12.8 0 21.333333 8.533333 21.333333 21.333333s-8.533333 21.333333-21.333333 21.333333zM300.8 763.733333h-85.333333c-12.8 0-21.333333-8.533333-21.333334-21.333333s8.533333-21.333333 21.333334-21.333333h85.333333c12.8 0 21.333333 8.533333 21.333333 21.333333s-8.533333 21.333333-21.333333 21.333333zM550.4 763.733333h-85.333333c-12.8 0-21.333333-8.533333-21.333334-21.333333s8.533333-21.333333 21.333334-21.333333h85.333333c12.8 0 21.333333 8.533333 21.333333 21.333333s-8.533333 21.333333-21.333333 21.333333zM800 763.733333h-85.333333c-12.8 0-21.333333-8.533333-21.333334-21.333333s8.533333-21.333333 21.333334-21.333333h85.333333c12.8 0 21.333333 8.533333 21.333333 21.333333s-8.533333 21.333333-21.333333 21.333333z'
      fill={fill}
    />
  </svg>
)

export default Calendar