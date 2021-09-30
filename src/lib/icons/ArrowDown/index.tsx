import React from 'react'

const ArrowDown = (props: any) => (
  <svg
    viewBox='0 0 1024 1024'
    version='1.1'
    xmlns='http://www.w3.org/2000/svg'
    width={props.size || 32}
    height={props.size || 32}
  >
    <path
      d='M514.154667 751.808a21.312 21.312 0 0 1-15.082667-36.416l422.378667-422.378667a21.312 21.312 0 1 1 30.165333 30.165334L529.237333 745.557333a21.248 21.248 0 0 1-15.082666 6.250667z'
      fill={props.fill || '#333333'}
    />
    <path
      d='M509.845333 751.808a21.269333 21.269333 0 0 1-15.082666-6.250667L72.405333 323.178667a21.312 21.312 0 1 1 30.165334-30.165334l422.378666 422.378667a21.312 21.312 0 0 1-15.104 36.416z'
      fill={props.fill || '#333333'}
    />
  </svg>
)

export default ArrowDown
