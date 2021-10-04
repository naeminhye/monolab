import React, { useState, useEffect, useRef } from 'react'
import classNames from 'classnames'
import moment from 'moment'

import Calendar from '../icons/Calendar'
import ArrowLeft from '../icons/ArrowLeft'
import ArrowRight from '../icons/ArrowRight'
import Button from '../Button'
import Input from '../Input'

import { MONTHS, SHORT_MONTHS, WEEKDAYS } from './constants'

import styles from './styles.module.css'

const getMonthIndex = (month: string) => MONTHS.indexOf(month)

type DaySlotProps = {
  selected: any
  value: any
  today: any
  onSelectDay: (value: any) => void
}
const DaySlot = (props: DaySlotProps) => {
  // style classes for DaySlot

  const daySlotClasses = classNames(styles.slot, {
    [styles.selected]: props.selected === props.value,
    [styles.today]: props.today === props.value
  })

  return (
    <td
      className={daySlotClasses}
      onClick={() => props.onSelectDay(props.value)}
    >
      <span className={styles['mono__calendar--day']}>{props.value}</span>
    </td>
  )
}

type CalendarTableProps = {
  targetMonth: any
  targetYear: any
  selectedDate: any
  onSelectDayOfMonth: (day: number) => void
}

const CalendarTable = (props: CalendarTableProps) => {
  const { targetMonth, targetYear, selectedDate, onSelectDayOfMonth } = props

  const getToday = () => {
    // check if month and year is the same
    if (
      parseInt(moment().format('M')) === targetMonth &&
      moment().format('YYYY') === targetYear
    ) {
      return parseInt(moment().format('D'))
    } else {
      return -1
    }
  }

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
    for (let index = 0; index < weekCount; index++) {
      const weekContent = []
      for (let _index = 0; _index < 7; _index++) {
        if (index === 0 && _index === 0 && getFirstDayIndexOfMonth() > 0) {
          weekContent.push(<td colSpan={getFirstDayIndexOfMonth()}>&nbsp;</td>)
          _index = getFirstDayIndexOfMonth() - 1
        } else {
          if (dayCount <= getDaysInMonth()) {
            weekContent.push(
              <DaySlot
                today={getToday()}
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
      table.push(<tr key={`week--${index}`}>{weekContent}</tr>)
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

type MonthSelectorProps = {
  onSelectMonth: (monthIndex: number) => void
}
const MonthSelector = ({ onSelectMonth }: MonthSelectorProps) => {
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

type YearSelectorProps = {
  onSelectYear: (year: number) => void
  startYear: number
}
const YearSelector = (props: YearSelectorProps) => {
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

export type DatePickerProps = {
  className?: string
  style?: React.CSSProperties
  format?:
    | 'YYYY-MM-DD'
    | 'YYYY/MM/DD'
    | 'M/D/YYYY'
    | 'M/D/YY'
    | 'MM/DD/YY'
    | 'MM/DD/YYYY'
    | 'YY/MM/DD'
    | 'DD-MMM-YY'
  value: any
  bordered?: boolean
}
const DatePicker = (props: DatePickerProps) => {
  // props
  const {
    className,
    style,
    format = 'YYYY-MM-DD',
    value,
    bordered = false
  } = props

  // states
  const [open, setOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState(
    moment(value, format).isValid() ? moment(value, format) : moment()
  )
  const datePickerRef = useRef<any>(null)

  // style classes
  const classes = classNames(className, {
    [styles[`mono__datepicker--wrapper`]]: true,
    [styles.open]: open
  })

  // for display only
  const [month, setMonth] = useState<number>(
    getMonthIndex(selectedDate.format('MMMM'))
  )
  const [year, setYear] = useState<number>(
    parseInt(selectedDate.format('YYYY'))
  )
  const [startYear, setStartYear] = useState(Math.floor(year / 12) * 12)

  const [display, setDisplay] = useState('BY_DAYS') // BY_DAYS|BY_MONTHS|BY_YEARS

  const goNext = () => {
    if (display === 'BY_DAYS') {
      if (month === 11) {
        setMonth(0)
        setYear(year + 1)
      } else {
        setMonth(month + 1)
      }
    } else if (display === 'BY_MONTHS') {
      setYear(year + 1)
    } else {
      setStartYear(startYear + 12)
    }
  }

  const goPrev = () => {
    if (display === 'BY_DAYS') {
      if (month === 0) {
        setMonth(11)
        setYear(year - 1)
      } else {
        setMonth(month - 1)
      }
    } else if (display === 'BY_MONTHS') {
      setYear(year - 1)
    } else {
      setStartYear(startYear - 12)
    }
  }

  const goToToday = () => {
    setSelectedDate(moment())
    setMonth(getMonthIndex(selectedDate.format('MMMM')))
    setYear(parseInt(selectedDate.format('YYYY')))
    setStartYear(Math.floor(year / 12) * 12)
    setDisplay('BY_DAYS')
    setOpen(false)
  }

  const handleCancel = () => {
    setSelectedDate(
      moment(value, format).isValid() ? moment(value, format) : moment()
    )
    setMonth(parseInt(moment().format('M')) - 1)
    setYear(parseInt(moment().format('YYYY')))
    setStartYear(Math.floor(year / 12) * 12)
    setDisplay('BY_DAYS')
    setOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (datePickerRef && !datePickerRef?.current?.contains(event.target)) {
        handleCancel()
      }
    }

    window.addEventListener('mousedown', handleClickOutside)

    // clean up
    return () => window.removeEventListener('mousedown', handleClickOutside)
  }, []) // empty array => run only once

  // open
  return (
    <div
      ref={datePickerRef}
      className={classes}
      style={style}
      // className={`mono__datepicker--wrapper${open ? " open" : ""}`}
    >
      <Input
        value={selectedDate.format(format)}
        className={styles['mono__datepicker--input']}
        placeholder='Try me..'
        onFocus={() => setOpen(true)}
        suffix={<Calendar size={24} fill='#AEAEAE' />}
        bordered={bordered}
      />
      <div className={styles.mono__calendar}>
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
              <>
                <span
                  className={styles['mono__calendar--months-current-month']}
                >
                  {MONTHS[month]}
                </span>
                <span className={styles['mono__calendar--months-current-year']}>
                  {year}
                </span>
              </>
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

        <div className={styles['mono__calendar--content']}>
          {display === 'BY_DAYS' && (
            <CalendarTable
              targetMonth={month + 1}
              targetYear={year}
              selectedDate={selectedDate}
              onSelectDayOfMonth={(day: number) => {
                setSelectedDate(
                  moment(year + '-' + (month + 1) + '-' + day, 'YYYY-M-D')
                )
                setOpen(false)
              }}
            />
          )}
          {display === 'BY_MONTHS' && (
            <MonthSelector
              onSelectMonth={(monthIndex) => {
                setMonth(monthIndex)
                setDisplay('BY_DAYS')
              }}
            />
          )}
          {display === 'BY_YEARS' && (
            <YearSelector
              startYear={startYear}
              onSelectYear={(year) => {
                setYear(year)
                setDisplay('BY_MONTHS')
              }}
            />
          )}
        </div>

        <div style={{ textAlign: 'center' }}>
          <Button size='xs' style={{ width: '50%' }} onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            type='primary'
            size='xs'
            style={{ width: '50%' }}
            onClick={goToToday}
          >
            Today
          </Button>
        </div>
      </div>
    </div>
  )
}

export default DatePicker
