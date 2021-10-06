import React from 'react'

import styles from './styles.module.css'

export type YearSelectorProps = {
  onSelectYear: (year: number) => void
  startYear: number
}

export const YearSelector = (props: YearSelectorProps) => {
  const years = []
  for (let index = 0; index < 12; index++) {
    years.push(
      <div
        key={index}
        className={styles.item}
        onClick={() => props.onSelectYear(props.startYear + index)}
      >
        {props.startYear + index}
      </div>
    )
  }
  return (
    <div className={styles['mono__calendar--content-by-months']}>{years}</div>
  )
}
