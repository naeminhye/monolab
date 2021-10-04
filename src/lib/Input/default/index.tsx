import React from 'react'
import classNames from 'classnames'

import styles from '../styles.module.css'

export type InputProps = Omit<
  React.HTMLAttributes<HTMLInputElement>,
  'onChange' | 'value' | 'className' | 'style'
> & {
  className?: string
  style?: React.CSSProperties
  value: string | number
  onChange?: () => void
  bordered?: boolean
  allowClear?: boolean
  disabled?: boolean
  prefix?: any
  suffix?: any
  label?: string
}

const Input = (props: InputProps) => {
  const {
    className,
    prefix,
    suffix,
    label,
    bordered = false,
    disabled = false,
    style,
    ...others
  } = props

  const classes = classNames(className, {
    [styles.mono__input]: true,
    [styles.bordered]: bordered,
    [styles['mono__input--disabled']]: disabled
  })

  return (
    <div className={styles['mono__input--wrapper']}>
      <input
        {...others}
        disabled={disabled}
        className={classes}
        style={{
          paddingRight: suffix ? 40 : 0,
          paddingLeft: prefix ? 40 : 0,
          ...style
        }}
      />
      {prefix && <div className={styles['mono__input--prefix']}>{prefix}</div>}
      {suffix && <div className={styles['mono__input--suffix']}>{suffix}</div>}
    </div>
  )
}

export default Input
