import React, { useState, useEffect, useRef, useMemo } from 'react'
import classNames from 'classnames'
import moment from 'moment'

import Calendar from '../icons/Calendar'
import Button, { IconButton } from '../Button'
import Input from '../Input'

import { MONTHS } from './constants'

import { DaySlotProps } from './DaySlot'
import { MonthSelector, MonthSelectorProps } from './MonthSelector'
import { YearSelector, YearSelectorProps } from './YearSelector'
import { CalendarTable, CalendarTableProps } from './CalendarTable'

import styles from './styles.module.css'
import { CalendarHeader } from './CalendarHeader'

// TODO: add locales

const getMonthIndex = (month: string) => MONTHS.indexOf(month)

export type DisplayView = 'BY_DAYS' | 'BY_MONTHS' | 'BY_YEARS'

type DatePickerProps = {
  placeholder?: string
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
  value: moment.MomentInput // TODO: add value
  bordered?: boolean
  onChange?: (value: moment.MomentInput) => void
}

const DatePicker = (props: DatePickerProps) => {
  // props
  const {
    className,
    style,
    format = 'YYYY-MM-DD',
    value,
    bordered = false,
    onChange,
    placeholder
  } = props

  // states
  const [open, setOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState(
    moment(value, format).isValid() ? moment(value, format) : moment(value)
  )
  const datePickerRef = useRef<any>(null)

  // style classes
  const classes = classNames(className, {
    [styles[`mono__datepicker--wrapper`]]: true,
    [styles.open]: open
  })

  const today = useMemo(() => moment(), [])

  // for display only
  const [month, setMonth] = useState<number>(
    getMonthIndex(selectedDate.format('MMMM'))
  )
  const [year, setYear] = useState<number>(
    parseInt(selectedDate.format('YYYY'))
  )
  const [startYear, setStartYear] = useState<number>(Math.floor(year / 12) * 12)

  const [display, setDisplay] = useState<DisplayView>('BY_DAYS') // BY_DAYS|BY_MONTHS|BY_YEARS

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
    setDisplay('BY_DAYS')
    setMonth(getMonthIndex(today.format('MMMM')))
    setYear(parseInt(today.format('YYYY')))
    setStartYear(Math.floor(year / 12) * 12)
    setSelectedDate(today)
    setOpen(false)
  }

  const handleCancel = () => {
    const selectedYear = parseInt(selectedDate.format('YYYY'))
    setDisplay('BY_DAYS')
    setMonth(parseInt(selectedDate.format('M')) - 1)
    setYear(selectedYear)
    setStartYear(Math.floor(selectedYear / 12) * 12)
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
    <div ref={datePickerRef} className={classes} style={style}>
      <Input
        bordered={bordered}
        value={selectedDate.format(format)}
        className={styles['mono__datepicker--input']}
        placeholder={placeholder}
        suffix={
          <IconButton
            size='xs'
            type='transparent'
            onClick={() => setOpen(true)}
          >
            <Calendar size={24} fill='#AEAEAE' />
          </IconButton>
        }
        onChange={(e) => {
          onChange && onChange(e.target.value)
        }}
      />
      <div className={styles.mono__calendar}>
        {/* Header */}
        <CalendarHeader
          display={display}
          year={year}
          startYear={startYear}
          month={month}
          goNext={goNext}
          goPrev={goPrev}
          setDisplay={setDisplay}
        />

        <div className={styles['mono__calendar--content']}>
          {display === 'BY_DAYS' && (
            <CalendarTable
              targetMonth={month + 1}
              targetYear={year}
              selectedDate={selectedDate}
              onSelectDayOfMonth={(day: number) => {
                const newDate = moment(
                  year + '-' + (month + 1) + '-' + day,
                  'YYYY-M-D'
                )
                setSelectedDate(newDate)
                onChange && onChange(moment(newDate, 'YYYY-M-D').format(format))
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

export { DatePicker }
export type {
  DatePickerProps,
  DaySlotProps,
  CalendarTableProps,
  MonthSelectorProps,
  YearSelectorProps
}

export default DatePicker
