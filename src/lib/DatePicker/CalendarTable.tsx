import React from 'react'
import moment from 'moment'

import { WEEKDAYS } from './constants'

import { DaySlot } from './DaySlot'
import styles from './styles.module.css'

export type CalendarTableProps = {
  targetMonth: any
  targetYear: any
  selectedDate: any
  onSelectDayOfMonth: (day: number) => void
}

const getToday = (
  time: moment.Moment,
  targetMonth: number,
  targetYear: number
) => {
  // check if month and year is the same
  if (
    parseInt(time.format('M')) === targetMonth &&
    parseInt(time.format('YYYY')) === targetYear
  ) {
    return parseInt(time.format('D'))
  } else {
    return -1
  }
}

export const CalendarTable = (props: CalendarTableProps) => {
  const { targetMonth, targetYear, selectedDate, onSelectDayOfMonth } = props

  const getSelectedDay = () => {
    // check if month and year is the same
    if (
      parseInt(selectedDate.format('M')) === parseInt(targetMonth) &&
      parseInt(selectedDate.format('YYYY')) === parseInt(targetYear)
    ) {
      return parseInt(selectedDate.format('D'))
    } else {
      return -1
    }
  }

  const getFirstDayIndexOfMonth = () => {
    return WEEKDAYS.indexOf(
      moment(targetMonth + '/' + targetYear, 'M/YYYY')
        .startOf('month')
        .format('ddd')
    )
  }
  const getDaysInMonth = () => {
    return moment(targetMonth + '/' + targetYear, 'M/YYYY').daysInMonth()
  }

  const TableGenerator = () => {
    const table = []
    let weekCount = 5
    let dayCount = 1
    if (getFirstDayIndexOfMonth() + getDaysInMonth() <= 28) {
      weekCount = 4
    }

    // for each row
    for (let weekIndex = 0; weekIndex < weekCount; weekIndex++) {
      const weekContent = []
      for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
        if (
          weekIndex === 0 &&
          dayIndex === 0 &&
          getFirstDayIndexOfMonth() > 0
        ) {
          weekContent.push(
            <td
              key={`week--${weekIndex}-day--${dayIndex}`}
              colSpan={getFirstDayIndexOfMonth()}
            >
              &nbsp;
            </td>
          )
          dayIndex = getFirstDayIndexOfMonth() - 1
        } else {
          if (dayCount <= getDaysInMonth()) {
            weekContent.push(
              <DaySlot
                key={`week--${weekIndex}-day--${dayIndex}`}
                today={getToday(moment(), targetMonth, targetYear)}
                value={dayCount}
                selected={getSelectedDay()}
                onSelectDay={(day) => {
                  onSelectDayOfMonth(day)
                }}
              />
            )
            dayCount++
          }
        }
      }
      table.push(<tr key={`week--${weekIndex}`}>{weekContent}</tr>)
    }
    return table
  }

  return (
    <table className={styles['mono__calendar--content-by-days']}>
      <thead>
        <tr>
          {WEEKDAYS.map((day, index) => (
            <th key={`weekday-header--${index}`}>{day}</th>
          ))}
        </tr>
      </thead>
      <tbody>{TableGenerator()}</tbody>
    </table>
  )
}
