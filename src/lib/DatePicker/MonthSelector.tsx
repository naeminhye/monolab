import React from 'react'
import { SHORT_MONTHS } from './constants'

import styles from './styles.module.css'

export type MonthSelectorProps = {
  onSelectMonth: (monthIndex: number) => void
}

export const MonthSelector = ({ onSelectMonth }: MonthSelectorProps) => {
  return (
    <div className={styles['mono__calendar--content-by-months']}>
      {SHORT_MONTHS.map((month, index) => {
        return (
          <div
            key={index}
            className={styles.item}
            onClick={() => onSelectMonth(index)}
          >
            {month}
          </div>
        )
      })}
    </div>
  )
}
