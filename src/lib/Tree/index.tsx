import React, { useCallback, useEffect, useMemo, useState } from 'react'
import classNames from 'classnames'

import ArrowDown from '../icons/ArrowDown'
import ArrowRight from '../icons/ArrowRight'
import CheckBox from '../CheckBox'

import { generateUniqueKey, recursiveSearch } from '../../utils'

import styles from './styles.module.css'

export const getAllChildKeys = (children: any): any =>
  children && children.length > 0 ? recursiveSearch(children, 'value') : []

export type SingleTreeProps = {
  value: string
  title: string
  children?: any
  renderItem?: (props: TreeNodeProps) => any
  itemClassName?: string
  treeViewClassName?: string
  childrenClassName?: string
  switcherClassName?: string
  onExpand?: any
  onSelect?: any
  onCheck?: any
  collapsedIcon?: any
  expandedIcon?: any
  selectable?: boolean
  multiple?: boolean
  checkable?: boolean
  selectedList: Array<any>
  setSelectedList: any
  expandedList: Array<string>
  setExpandedList: any
  checkedList: Array<string>
  setCheckedList: any
}

const SingleTree = ({ value, title, children, ...others }: SingleTreeProps) => {
  const {
    renderItem,
    itemClassName,
    treeViewClassName,
    childrenClassName,
    switcherClassName,
    onExpand = () => {},
    onSelect = () => {},
    onCheck = () => {},
    collapsedIcon,
    expandedIcon,
    selectable = false,
    multiple = false,
    checkable = false,
    selectedList = [],
    setSelectedList = () => {},
    expandedList = [],
    setExpandedList = () => {},
    checkedList = [],
    setCheckedList = () => {}
  } = others

  const childKeys = useMemo(() => getAllChildKeys(children), [children])

  const collapsed = useMemo(
    () => expandedList.indexOf(value) === -1,
    [expandedList, value]
  )

  const selected = useMemo(
    () => selectedList.indexOf(value) !== -1,
    [selectedList, value]
  )

  const isHalfCheck = useMemo(() => {
    if (childKeys.length > 0) {
      const isCheckedAll = childKeys.every(
        (item: any) => checkedList.indexOf(item) !== -1
      )
      const atLeastOne = childKeys.some(
        (item: any) => checkedList.indexOf(item) !== -1
      )
      return atLeastOne && !isCheckedAll
    }
    return false
  }, [checkedList, childKeys])

  // If this node is included in the `checkedList` => checked
  const checked = useMemo(
    () => checkedList.indexOf(value) !== -1,
    [checkedList, value]
  )

  /**
   * If all child nodes are checked => add this node to the `checkedList`
   */
  useEffect(() => {
    if (childKeys.length > 0) {
      const isCheckedAll = childKeys.every(
        (item: any) => checkedList.indexOf(item) !== -1
      )

      if (isCheckedAll && checkedList.indexOf(value) === -1) {
        setCheckedList([...checkedList, value])
      } else if (!isCheckedAll && checkedList.indexOf(value) !== -1) {
        // Remove from checkedList
        setCheckedList(checkedList.filter((key: any) => key !== value))
      }
    }
  }, [checkedList, childKeys, setCheckedList, value])

  const handleExpand = useCallback(() => {
    const isExpanding = collapsed
    // Expanding
    if (isExpanding) {
      // Add this key to expandedList
      setExpandedList([...expandedList, value])
    }
    // Collapsing
    else {
      // Remove this key from expandedList
      setExpandedList(expandedList.filter((key: any) => key !== value))
    }
    onExpand(expandedList, { expanded: isExpanding, current: value })
  }, [collapsed, expandedList, onExpand, setExpandedList, value])

  const handleSelect = useCallback(
    (e) => {
      const isSelecting = !selected
      const isMulti = multiple && (e.metaKey || e.ctrlKey)

      // Selecting
      if (isSelecting) {
        // Add this key to selectedList
        setSelectedList(isMulti ? [...selectedList, value] : [value])
      }
      // Deselecting
      else {
        // Remove this key from selectedList
        setSelectedList(
          isMulti ? selectedList.filter((key: any) => key !== value) : []
        )
      }
      onSelect(selectedList, {
        selected: isSelecting,
        current: value,
        event: e
      })
    },
    [multiple, onSelect, selected, selectedList, setSelectedList, value]
  )

  const handleCheck = useCallback(
    (e) => {
      const isChecking = !checked

      // Selecting
      if (isChecking) {
        setCheckedList([
          ...checkedList,
          // Add this key to selectedList
          value,
          // Check all children nodes
          ...childKeys
        ])
      }
      // Deselecting
      else {
        // Remove this key from selectedList
        setCheckedList(
          checkedList.filter(
            (key) => key && key !== value && childKeys.indexOf(key) === -1
          )
        )
      }
      onCheck(checkedList, {
        checked: isChecking,
        current: value,
        event: e
      })
    },
    [checked, checkedList, childKeys, onCheck, setCheckedList, value]
  )

  return (
    <div
      className={classNames({
        [styles.mono__tree]: true,
        [treeViewClassName || '']: treeViewClassName
      })}
    >
      <div
        className={classNames({
          [styles[`mono__tree--item`]]: true,
          [itemClassName || '']: itemClassName
        })}
      >
        <span
          className={classNames({
            [styles[`mono__tree--switcher`]]: true,
            [switcherClassName || '']: switcherClassName
          })}
          onClick={handleExpand}
        >
          {children
            ? collapsed
              ? collapsedIcon || <ArrowRight size={8} />
              : expandedIcon || <ArrowDown size={8} />
            : null}
        </span>
        {checkable && (
          <span className={styles[`mono__tree--item-checkbox`]}>
            <CheckBox
              checked={checked}
              onChange={handleCheck}
              halfCheck={isHalfCheck}
            />
          </span>
        )}
        <span
          className={classNames({
            [styles[`mono__tree--item-title`]]: true,
            [styles[`mono__tree--item-title-selected`]]: selectable && selected
          })}
          onClick={selectable ? handleSelect : children && handleExpand}
        >
          {renderItem ? renderItem({ value, title, children }) : title}
        </span>
      </div>
      {children && (
        <div
          className={classNames({
            [styles[`mono__tree--children`]]: true,
            [styles[`mono__tree--children-collapsed`]]: collapsed,
            [childrenClassName || '']: childrenClassName
          })}
        >
          {collapsed
            ? null
            : children.map((node: any) => (
                <div key={generateUniqueKey(node.value)}>
                  <SingleTree {...node} {...others} />
                </div>
              ))}
        </div>
      )}
    </div>
  )
}

type TreeNodeProps = {
  value: string
  title: string
  children?: any
}
type TreeProps = {
  dataSource: Array<TreeNodeProps>
  className?: string
  itemClassName?: string
  treeViewClassName?: string
  childrenClassName?: string
  switcherClassName?: string
  defaultSelectedKeys?: Array<string>
  defaultExpandedKeys?: Array<string>
  defaultCheckedKeys?: Array<string>
  onExpand?: any
  onSelect?: any
  onCheck?: any
  renderItem?: (props: TreeNodeProps) => any
  collapsedIcon?: any
  expandedIcon?: any
  selectable?: boolean
  multiple?: boolean
  checkable?: boolean
}

const Tree = ({
  className,
  dataSource,
  defaultSelectedKeys = [],
  defaultExpandedKeys = [],
  defaultCheckedKeys = [],
  ...others
}: any) => {
  const classes = classNames({
    [styles.mono__tree]: true,
    [className || '']: className
  })

  const [expandedList, setExpandedList] = useState(defaultExpandedKeys)
  const [selectedList, setSelectedList] = useState(defaultSelectedKeys)
  const [checkedList, setCheckedList] = useState(defaultCheckedKeys)

  return (
    <div className={classes}>
      {dataSource.map((node: TreeNodeProps) => {
        return (
          <div key={generateUniqueKey(node.value)}>
            <SingleTree
              {...node}
              {...others}
              expandedList={expandedList}
              setExpandedList={setExpandedList}
              selectedList={selectedList}
              setSelectedList={setSelectedList}
              checkedList={checkedList}
              setCheckedList={setCheckedList}
            />
          </div>
        )
      })}
    </div>
  )
}

export { Tree, TreeNodeProps, TreeProps }
export default Tree
