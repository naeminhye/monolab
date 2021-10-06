import React from 'react'
import classNames from 'classnames'

import styles from '../styles.module.css'

export type StatusType =
  | 'transparent'
  | 'default'
  | 'primary'
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'
export type BreakPointType = 'xs' | 'sm' | 'md' | 'lg'

export interface ButtonProps {
  className?: string
  style?: React.CSSProperties
  children: string | React.ReactNode
  shape?: 'square' | 'round' | 'circle'
  type?: StatusType
  size?: BreakPointType
  disabled?: boolean
  onClick?: any
}

export const Button = (props: ButtonProps) => {
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
      <span className={styles.mono__btn__content}>{children}</span>
    </button>
  )
}

export default Button
