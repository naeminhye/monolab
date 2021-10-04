import React from 'react'
import classNames from 'classnames'

import styles from './styles.module.css'

type InputProps = React.HTMLAttributes<HTMLInputElement>

type CheckBoxProps = Omit<
  InputProps,
  'onChange' | 'checked' | 'className' | 'style'
> & {
  halfCheck?: boolean
  label?: string
  onChange: (checked: boolean) => void
  checked: boolean
  className?: string
  style?: React.CSSProperties
}

const CheckBox = (props: CheckBoxProps) => {
  const {
    className,
    halfCheck = false,
    label,
    style,
    onChange,
    checked,
    ...inputProps
  } = props

  const handleCheck = () => {
    onChange(!checked)
  }

  const classes = classNames(className, {
    [styles.mono__checkbox]: true,
    [styles.notall]: halfCheck
  })

  return (
    <div className={classes} style={style}>
      <input
        {...inputProps}
        defaultChecked={checked}
        onChange={handleCheck}
        type='checkbox'
      />
      {label && (
        <span className={styles['mono__checkbox--label']}>{label}</span>
      )}
    </div>
  )
}

export { CheckBox, CheckBoxProps }
export default CheckBox
