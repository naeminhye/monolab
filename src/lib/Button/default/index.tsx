import React from 'react'
import classNames from 'classnames'

import styles from '../styles.module.css'

type StatusType =
  | 'default'
  | 'primary'
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'
type BreakPointType = 'xs' | 'sm' | 'md' | 'lg'

interface ButtonProps {
  className?: string
  style?: React.CSSProperties
  children: string
  shape?: 'square' | 'round'
  type?: StatusType
  size?: BreakPointType
  disabled?: boolean
  onClick?: any
}

const Button = (props: ButtonProps) => {
  const {
    children,
    className,
    size = 'md',
    shape = 'square',
    disabled = false,
    type = 'default',
    ...others
  } = props

  const classes = classNames(className, {
    [styles.mono__btn]: true,
    [styles[`mono__btn--type-${type}`]]: type && type !== 'default',
    [styles[`mono__btn--size-${size}`]]: size && size !== 'md',
    [styles[`mono__btn--disabled`]]: disabled,
    [styles[`mono__btn--shape-${shape}`]]: shape && shape !== 'square'
  })

  return (
    <button className={classes} disabled={disabled} {...others}>
      <div className={styles.mono__btn__content}>{children}</div>
    </button>
  )
}

export { Button, ButtonProps }
export default Button
