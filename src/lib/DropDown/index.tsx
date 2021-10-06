import React, { useMemo } from 'react'
import classNames from 'classnames'

import styles from './styles.module.css'

type ValueProps = number | string
type LabelProps = number | string
type DropdownOptionProps = {
  value: ValueProps
  label: LabelProps
}

type DropdownProps = {
  options: Array<DropdownOptionProps>
  value: ValueProps
  onChange?: (value: ValueProps) => void
  size?: 'xs' | 'sm' | 'md' | 'lg'
  className?: string
  style?: React.CSSProperties
}
const Dropdown = (props: DropdownProps) => {
  const { options, className, value, onChange, size = 'md', style } = props

  const selectedLabel: LabelProps = useMemo(() => {
    const selectedOption = options.find(
      (option: DropdownOptionProps) => option.value === value
    )

    return selectedOption ? selectedOption.label : ''
  }, [options, value])

  const classes = classNames(className, {
    [styles.mono__dropdown]: true,
    [styles[`mono__dropdown--size-${size}`]]: size && size !== 'md'
  })

  return (
    <div className={classes} style={style}>
      <div className={styles['mono__dropdown--current']} tabIndex={1}>
        <div className={styles['mono__dropdown--value']}>
          <input
            className={styles['mono__dropdown--input']}
            type='radio'
            id={`${value}`}
            aria-label={`${selectedLabel}`}
            checked
          />
          <div className={styles['mono__dropdown--input-text']}>
            {selectedLabel}
          </div>
        </div>
        <img
          className={styles.mono__dropdown__icon}
          src='http://cdn.onlinewebfonts.com/svg/img_295694.svg'
          alt='Arrow Icon'
          aria-hidden='true'
        />
      </div>
      <ul className={styles.mono__dropdown__list}>
        {options.map((option, index) => (
          <li
            key={index}
            onClick={() => {
              onChange && onChange(option.value)
            }}
          >
            <label
              className={styles['mono__dropdown--option']}
              htmlFor={`${option.value}`}
            >
              {`${option.label}`}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}

export { Dropdown }
export type { DropdownProps, DropdownOptionProps }
export default Dropdown
