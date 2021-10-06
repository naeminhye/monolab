import React from 'react'
import classNames from 'classnames'

import styles from '../styles.module.css'

export interface TextAreaProps
  extends Omit<
    React.HTMLAttributes<HTMLTextAreaElement>,
    'value' | 'className' | 'style'
  > {
  className?: string
  style?: React.CSSProperties
  value: string | number
  disabled?: boolean
  bordered?: boolean
  rows?: number
  resize?: 'none' | 'vertical' | 'horizontal' | 'block' | 'inline' | 'both'
}

export const TextArea = (props: TextAreaProps) => {
  const {
    className,
    value,
    onChange,
    rows,
    disabled = false,
    bordered = false,
    resize = 'vertical',
    style,
    ...others
  } = props

  const classes = classNames(className, {
    [styles.mono__textarea]: true,
    [styles.bordered]: bordered,
    [styles[`mono__textarea--disabled`]]: disabled
  })

  return (
    <div className={styles[`mono__textarea--wrapper`]}>
      <textarea
        {...others}
        className={classes}
        disabled={disabled}
        onChange={onChange}
        rows={rows}
        style={{ ...style, resize }}
      >
        {value}
      </textarea>
    </div>
  )
}

export default TextArea
