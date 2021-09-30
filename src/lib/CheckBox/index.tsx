import React from 'react'
import classNames from 'classnames'

import styles from './styles.module.css'

export type CheckBoxProps = {
  children?: any
  className?: string
  halfCheck?: boolean
  label?: string
  defaultChecked?: boolean
  onChange: any
  checked: boolean
}

const CheckBox = (props: CheckBoxProps) => {
  const {
    children,
    className = '',
    halfCheck = false,
    label,
    // defaultChecked = false,
    ...others
  } = props

  const classes = classNames({
    [styles.mono__checkbox]: true,
    [styles.notall]: halfCheck,
    [className]: className
  })

  return (
    <div className={classes}>
      <input type='checkbox' {...others} />
      {label && (
        <span className={styles['mono__checkbox--label']}>{label}</span>
      )}
    </div>
  )
}

export default CheckBox
