import React from 'react'
import classNames from 'classnames'

import styles from './styles.module.css'

export type DaySlotProps = {
  selected: any
  value: any
  today: any
  onSelectDay: (value: any) => void
}

export const DaySlot = ({
  value,
  today,
  onSelectDay,
  selected
}: DaySlotProps) => {
  // style classes for DaySlot

  const daySlotClasses = classNames(styles.slot, {
    [styles.selected]: selected === value,
    [styles.today]: today === value
  })

  return (
    <td className={daySlotClasses} onClick={() => onSelectDay(value)}>
      <span className={styles['mono__calendar--day']}>{value}</span>
    </td>
  )
}
