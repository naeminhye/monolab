import React from 'react'

interface IconProps {
  size?: number
  fill?: string
}

const Blank = ({ size = 32, fill = '#333333' }: IconProps) => (
  <svg
    viewBox='0 0 1024 1024'
    version='1.1'
    xmlns='http://www.w3.org/2000/svg'
    width={size}
    height={size}
  >
    <path
      d='M512 0C229.2224 0 0 229.12 0 512s229.2224 512 512 512 512-229.12 512-512S794.7776 0 512 0zM102.4 512c0-225.792 183.7312-409.6 409.6-409.6 94.4896 0 181.376 32.512 250.752 86.528L188.8256 762.88A407.6288 407.6288 0 0 1 102.4 512z m409.6 409.6c-94.5152 0-181.376-32.512-250.7776-86.528L835.1488 261.12A407.5008 407.5008 0 0 1 921.6 512c0 225.792-183.7568 409.6-409.6 409.6z'
      fill={fill}
    />
  </svg>
)

export default Blank
