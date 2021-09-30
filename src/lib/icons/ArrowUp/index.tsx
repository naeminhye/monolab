import React from 'react'

const ArrowUp = (props: any) => (
  <svg
    viewBox='0 0 1024 1024'
    version='1.1'
    xmlns='http://www.w3.org/2000/svg'
    width={props.size || 32}
    height={props.size || 32}
  >
    <path
      d='M87.488 730.816a21.312 21.312 0 0 1-15.082667-36.416l422.378667-422.378667a21.312 21.312 0 1 1 30.165333 30.165334L102.570667 724.565333a21.248 21.248 0 0 1-15.082667 6.250667z'
      fill={props.fill || '#333333'}
    />
    <path
      d='M936.512 730.816a21.269333 21.269333 0 0 1-15.082667-6.250667L499.072 302.208a21.312 21.312 0 1 1 30.165333-30.165333L951.594667 694.4a21.312 21.312 0 0 1-15.082667 36.416z'
      fill={props.fill || '#333333'}
    />
  </svg>
)

export default ArrowUp
