import React, { useState, useRef } from 'react'
import classNames from 'classnames'
import CheckBox from '../CheckBox'
// eslint-disable-next-line no-unused-vars
import Pagination, { PaginationProps } from '../Pagination'
import LoadingRows from '../LoadingRows'
import NoData from '../NoData'

import SortDown from '../icons/SortDown'
import Sort from '../icons/Sort'
import SortUp from '../icons/SortUp'

import styles from './styles.module.css'

import { getNumOfPgs } from '../../utils'

const renderDefaultNoData = () => <NoData />

interface TableColumnProps<T> {
  dataIndex: number | string
  title: string
  key: string
  render?: (cell: any, rowData: T) => React.ReactNode
  sortable?: boolean
  align?: string
}

interface TableProps<T> {
  className?: string
  style?: React.CSSProperties
  columns: TableColumnProps<T | any>[]
  dataSource: T[]
  keyName?: string
  rowSelection?: any
  bordered?: boolean
  striped?: boolean
  hover?: boolean
  separated?: boolean
  title?: string
  pagination?: PaginationProps
  loading?: boolean
  renderNoData?: () => React.ReactNode
  /**
   * TODO: add props
   * columnWidth
   * columnTitle
   * fixed
   * getCheckboxProps
   * hideDefaultSelections
   * renderCell
   * selectedRowKeys
   * selections
   * type: checkbox | radio
   * onChange
   * onSelect: Callback executed when select/deselect one row
   * onSelectAll
   * onSelectInvert
   */
}
// sorting: arrayOf(
//   shape({
//     key: string,
//     sortDirection: oneOf(['ascending', 'descending'])
//   })
// ),
// pagination: objectOf({
//   current: number.isRequired,
//   pageSize: number.isRequired,
//   pageSizeOptions: arrayOf(
//     oneOfType([string, number])
//   ),
//   total: number,
//   onChange: func,
//   onShowSizeChange: func
// }),

interface SortingRuleProps {
  // ascending === true
  // descending === false
  sortDirection: boolean //
  colIndex: number
}

function Table<T>(props: TableProps<T>) {
  const {
    className,
    title,
    columns,
    dataSource,
    keyName = 'key',
    // width,
    // sorting,
    // separated = false,
    bordered = false,
    striped = false,
    // hover = false,
    rowSelection = null,
    pagination = null,
    loading = false,
    renderNoData = renderDefaultNoData,
    ...others
  } = props

  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const [sortingRule, setSortingRule] = useState<SortingRuleProps>()
  const [currentPage, setCurrentPage] = useState(
    (pagination && pagination.current) || 1
  )
  const [pageSize, setPageSize] = useState(
    (pagination && pagination.pageSize) || 1
  )
  const tableRef = useRef(null)

  const classes = classNames(className, {
    [styles.mono__table]: true,
    [styles.bordered]: bordered,
    [styles.striped]: striped
  })

  const sortTable = (isAsc: boolean, colIndex: number) => {
    let rows
    let switching
    let i
    let x
    let y
    let shouldSwitch
    let switchcount = 0
    const table: any = tableRef.current

    if (!table) return

    switching = true
    // Set the sorting direction to ascending:
    /** Make a loop that will continue until
     * no switching has been done:
     */
    while (switching) {
      // start by saying: no switching is done:
      switching = false
      rows = table?.children
      /** Loop through all table rows (except the
       *  first, which contains table headers): */
      for (i = 1; i < rows.length - 1; i++) {
        // start by saying there should be no switching:
        shouldSwitch = false
        /** Get the two elements you want to compare,
         *  one from current row and one from the next: */
        x = rows[i].children[colIndex]
        y = rows[i + 1].children[colIndex]
        /** check if the two rows should switch place,
         * based on the direction, asc or desc:
         */

        if (isAsc) {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            // if so, mark as a switch and break the loop:
            shouldSwitch = true
            break
          }
        } else {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            // if so, mark as a switch and break the loop:
            shouldSwitch = true
            break
          }
        }

        // numerical sorting
        if (Number(x.innerHTML) > Number(y.innerHTML)) {
          // if so, mark as a switch and break the loop:
          shouldSwitch = true
          break
        }
      }
      if (shouldSwitch) {
        /** If a switch has been marked, make the switch
         * and mark that a switch has been done:
         */
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i])
        switching = true
        // Each time a switch is done, increase this count by 1:
        switchcount++
      } else {
        /** If no switching has been done AND the direction is "asc",
         * set the direction to "desc" and run the while loop again.
         * */
        if (switchcount === 0 && isAsc) {
          isAsc = false
          switching = true
        }
      }
    }
  }

  const handleSort = (colIndex: number) => {
    // ascending === true
    // descending === false
    let sortDirection = true
    if (sortingRule) {
      sortDirection = !sortingRule.sortDirection
    }
    setSortingRule({
      colIndex,
      sortDirection
    })
    sortTable(sortDirection, colIndex)
  }

  const getShownData = () => {
    if (!pagination) return dataSource

    if (currentPage > getNumOfPgs(dataSource.length, pageSize)) return []

    return dataSource.filter((_, index) => {
      return Math.floor(index / pageSize) + 1 === currentPage
    })
  }

  const onDefaultPaginationChange = (targetPage: number) => {
    setCurrentPage(targetPage)
    pagination?.onChange && pagination.onChange(targetPage)
  }

  const onDefaultShowSizeChange = (currentPage: number, pageSize: number) => {
    setCurrentPage(1)
    setPageSize(pageSize)
    pagination?.onShowSizeChange &&
      pagination.onShowSizeChange(currentPage, pageSize)
  }

  return (
    <div>
      <div className={styles['mono__table--container']}>
        <div className={classes} {...others} ref={tableRef}>
          {/* Check Loading Status */}
          <div
            className={classNames(
              styles['mono__table--head'],
              styles['mono__table--tr']
            )}
          >
            {rowSelection && (
              <div
                className={classNames(
                  styles.checkbox,
                  styles['mono__table--th']
                )}
              >
                {/* Select/Deselect All Checkbox */}
                <CheckBox
                  halfCheck={
                    dataSource.length > selectedRows.length &&
                    selectedRows.length > 0
                  }
                  checked={dataSource.length === selectedRows.length}
                  onChange={(checked) => {
                    const checkedAll = checked
                    const selectedRowKeys: string[] = []
                    if (checkedAll) {
                      dataSource.map((data, rowIndex) => {
                        const key = data[keyName] || `${rowIndex}`
                        if (selectedRowKeys.indexOf(key) === -1) {
                          selectedRowKeys.push(key)
                        }
                        return null
                      })
                    }
                    setSelectedRows(selectedRowKeys)
                    if (rowSelection) {
                      // Callback executed when select/deselect all rows
                      if (rowSelection.onSelectAll) {
                        rowSelection.onSelectAll(checkedAll, selectedRowKeys)
                      }
                    }
                  }}
                />
              </div>
            )}
            {columns.map((col: TableColumnProps<T>, index: number) => {
              const colIndex = rowSelection ? index + 1 : index
              let sortIcon = null
              if (col.sortable) {
                sortIcon = <Sort size={16} fill='gray' />

                if (sortingRule && sortingRule.colIndex === colIndex) {
                  if (sortingRule.sortDirection) {
                    // === "ascending"
                    sortIcon = <SortDown size={16} fill='gray' />
                  } else {
                    // === "descending"
                    sortIcon = <SortUp size={16} fill='gray' />
                  }
                }
              }
              return (
                <div
                  key={col.key}
                  className={classNames([
                    styles['mono__table--th'],
                    styles[`mono__table--td-${col.align || 'left'}`]
                  ])}
                  //  className={styles['mono__table--th']}
                >
                  {col.title}
                  {sortIcon && (
                    <div
                      onClick={() => handleSort(colIndex)}
                      className={styles['mono__table--sort-icon']}
                    >
                      {sortIcon}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {loading ? (
            <div
              className={classNames(
                styles['mono__table--body'],
                styles['mono__table--tr']
              )}
            >
              <div
                // colSpan={rowSelection ? columns.length + 1 : columns.length}
                className={classNames(
                  styles['table-cell-loader'],
                  styles['mono__table--td']
                )}
              >
                <LoadingRows rows={5} loading={loading} />
              </div>
            </div>
          ) : getShownData().length > 0 ? (
            getShownData().map((data, rowIndex) => {
              const keys: string[] = Object.keys(data)
              const row: any = []
              columns.map((col: TableColumnProps<T>) => {
                if (keys.indexOf(`${col.dataIndex}`) !== -1) {
                  if (!col.render) {
                    row.push(
                      <div
                        className={classNames([
                          styles['mono__table--td'],
                          styles[`mono__table--td-${col.align || 'left'}`]
                        ])}
                        key={col.dataIndex}
                      >
                        {data[col.dataIndex]}
                      </div>
                    )
                  } else {
                    row.push(
                      <div
                        className={classNames([
                          styles['mono__table--td'],
                          styles[`mono__table--td-${col.align || 'left'}`]
                        ])}
                        key={col.dataIndex}
                      >
                        {col.render(data[col.dataIndex], data)}
                      </div>
                    )
                  }
                } else {
                  if (!col.render) {
                    row.push(
                      <div
                        className={classNames([
                          styles['mono__table--td'],
                          styles[`mono__table--td-${col.align || 'left'}`]
                        ])}
                        key={col.key}
                      />
                    )
                  } else {
                    row.push(
                      <div
                        className={classNames([
                          styles['mono__table--td'],
                          styles[`mono__table--td-${col.align || 'left'}`]
                        ])}
                        key={col.key}
                      >
                        {col.render(null, data)}
                      </div>
                    )
                  }
                }
                return null
              })

              return (
                <div
                  className={classNames(
                    styles['mono__table--body'],
                    styles['mono__table--tr']
                  )}
                  key={`row--${data[keyName] || rowIndex}`}
                >
                  {rowSelection && (
                    <div
                      key={`row--${data[keyName] || rowIndex}--checkbox`}
                      className={classNames(
                        styles.checkbox,
                        styles['mono__table--td']
                      )}
                    >
                      <CheckBox
                        checked={
                          //
                          data[keyName]
                            ? selectedRows.indexOf(data[keyName]) !== -1
                            : // : selectedRows.indexOf(rowIndex) !== -1
                              selectedRows.indexOf(
                                `${(currentPage - 1) * pageSize + rowIndex}`
                              ) !== -1
                        }
                        onChange={(checked) => {
                          const key: string =
                            data[keyName] ||
                            `${(currentPage - 1) * pageSize + rowIndex}`
                          const selectedRowKeys = [...selectedRows]

                          if (checked && selectedRowKeys.indexOf(key) === -1) {
                            selectedRowKeys.push(key)
                          } else if (
                            !checked &&
                            selectedRowKeys.indexOf(key) !== -1
                          ) {
                            selectedRowKeys.splice(
                              selectedRowKeys.indexOf(key),
                              1
                            )
                          }

                          setSelectedRows(selectedRowKeys)

                          if (rowSelection) {
                            // Callback executed when select/deselect one row
                            if (rowSelection.onSelect) {
                              rowSelection.onSelect(
                                data, // record of row data
                                checked, // true or false
                                selectedRowKeys
                                // event // nativeEvent
                              )
                            }
                            // Callback executed when selected rows change
                            if (rowSelection.onChange) {
                              rowSelection.onChange(selectedRowKeys)
                            }
                          }
                        }}
                      />
                    </div>
                  )}
                  {row}
                </div>
              )
            })
          ) : (
            <div
              className={classNames(
                styles['mono__table--body'],
                styles['mono__table--tr']
              )}
            >
              <div
                // colSpan={rowSelection ? columns.length + 1 : columns.length}
                className={classNames(
                  styles['table-cell-loader'],
                  styles['mono__table--td']
                )}
              >
                {renderNoData()}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={styles['mono__table--extra']}>
        {rowSelection && (
          <div className={styles['mono__table--extra-selected-count']}>
            Selected {selectedRows.length}/{dataSource.length} item(s)
          </div>
        )}
        {pagination && (
          <Pagination
            {...pagination}
            total={pagination.total || dataSource.length}
            onChange={onDefaultPaginationChange}
            onShowSizeChange={onDefaultShowSizeChange}
            current={currentPage}
          />
        )}
      </div>
    </div>
  )
}

export { Table }
export type { TableProps, TableColumnProps, SortingRuleProps }
export default Table
