import React from 'react'

import ArrowLeft from '../icons/ArrowLeft'
import ArrowRight from '../icons/ArrowRight'

import { MONTHS } from './constants'

import styles from './styles.module.css'

// eslint-disable-next-line no-unused-vars
import { DisplayView } from '.'

export type CalendarHeaderProps = {
  display: DisplayView
  goPrev: VoidFunction
  goNext: VoidFunction
  setDisplay: any
  month: number
  year: number
  startYear: number
}
export const CalendarHeader = (props: CalendarHeaderProps) => {
  const { display, setDisplay, goPrev, month, year, startYear, goNext } = props
  return (
    <div className={styles['mono__calendar--months']}>
      <div
        className={styles['mono__calendar--months-prev-month']}
        onClick={goPrev}
      >
        <ArrowLeft size={16} />
      </div>
      <div
        className={styles['mono__calendar--months-current']}
        onClick={() =>
          display === 'BY_YEARS'
            ? setDisplay('BY_DAYS')
            : display === 'BY_DAYS'
            ? setDisplay('BY_MONTHS')
            : setDisplay('BY_YEARS')
        }
      >
        {display === 'BY_DAYS' && (
          <span>
            <span className={styles['mono__calendar--months-current-month']}>
              {MONTHS[month]}
            </span>
            <span className={styles['mono__calendar--months-current-year']}>
              {year}
            </span>
          </span>
        )}
        {display === 'BY_MONTHS' && (
          <span className={styles['mono__calendar--months-current-year']}>
            {year}
          </span>
        )}
        {display === 'BY_YEARS' && (
          <span className={styles['mono__calendar--months-current-year']}>
            {startYear} - {startYear + 11}
          </span>
        )}
      </div>
      <div
        className={styles['mono__calendar--months-next-month']}
        onClick={goNext}
      >
        <ArrowRight size={16} />
      </div>
    </div>
  )
}
