import React, { useState } from 'react'
import classNames from 'classnames'

import ArrowRight from '../icons/ArrowRight'
import ArrowLeft from '../icons/ArrowLeft'
// eslint-disable-next-line no-unused-vars
import DropDown, { DropdownOptionProps } from '../DropDown'

import styles from './styles.module.css'

const showPageSizeOptions = (
  options: Array<number | string>
): Array<DropdownOptionProps> => {
  const result: Array<DropdownOptionProps> = []
  options.forEach((op: number | string) => {
    result.push({
      value: op,
      label: op
    })
  })
  return result
}

type PaginationProps = {
  /**
   * The first page's index, default: 1
   */
  firstIndex?: number
  current: number
  pageSize: number
  pageSizeOptions?: Array<number | string>
  total: number
  onChange?: (page: number) => void
  onShowSizeChange?: (currentPage: number, pageSize: number) => void
  className?: string
  style?: React.CSSProperties
}

const Pagination = (props: PaginationProps) => {
  const {
    firstIndex = 1,
    total,
    className,
    current = firstIndex,
    pageSize = 5,
    pageSizeOptions = [5, 10, 20, 30, 40],
    onChange,
    onShowSizeChange,
    style
  } = props
  const [currentPage, setCurrentPage] = useState(current)
  const [_pageSize, setPageSize] = useState(pageSize)

  const getNumOfPgs = (_total = total, _size = _pageSize) => {
    return _total % _size > 0
      ? Math.floor(_total / _size) + 1
      : Math.floor(_total / _size)
  }

  const classes = classNames(className, {
    [styles.mono__pagination]: true
  })

  const prev = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1)
      onChange && onChange(currentPage - 1)
    }
  }

  const next = () => {
    if (currentPage !== getNumOfPgs()) {
      setCurrentPage(currentPage + 1)
      onChange && onChange(currentPage + 1)
    }
  }

  return (
    <ul className={classes} style={style}>
      <li
        key='previous-page'
        title='Previous Page'
        className={classNames({
          [styles['mono__pagination--item']]: true,
          [styles['mono__pagination--item-prev']]: true
        })}
        aria-disabled='true'
        onClick={prev}
      >
        <ArrowLeft size={18} />
      </li>

      {[...Array(getNumOfPgs())].map((_: any, i: number) => (
        <li
          key={`page-${i + 1}`}
          title={`${i + 1}`}
          className={classNames({
            [styles['mono__pagination--item']]: true,
            [styles['mono__pagination--item-active']]: i + 1 === currentPage
          })}
          tabIndex={i}
          onClick={() => {
            setCurrentPage(i + 1)
            onChange && onChange(i + 1)
          }}
        >
          <a>{i + 1}</a>
        </li>
      ))}
      <li
        key='next-page'
        title='Next Page'
        tabIndex={0}
        className={classNames({
          [styles['mono__pagination--item']]: true,
          [styles['mono__pagination--item-next']]: true
        })}
        aria-disabled='false'
        onClick={next}
      >
        <ArrowRight size={18} />
      </li>
      {pageSizeOptions && (
        <li className={styles['mono__pagination--options']}>
          <DropDown
            size='xs'
            style={{ width: '100px' }}
            value={pageSizeOptions[0]}
            options={showPageSizeOptions(pageSizeOptions)}
            onChange={(targetPageSize: number) => {
              setPageSize(targetPageSize)
              onShowSizeChange && onShowSizeChange(currentPage, targetPageSize)
            }}
          />
        </li>
      )}
    </ul>
  )
}

export { Pagination, PaginationProps }
export default Pagination
