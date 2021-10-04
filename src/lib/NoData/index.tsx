import React from 'react'
import classNames from 'classnames'
import Blank from '../icons/Blank'

import styles from './styles.module.css'

export type NoDataProps = {
  text?: string
  icon?: React.ReactNode
  className?: string
  style?: React.CSSProperties
}
const NoData = (props: NoDataProps) => {
  const { className, text = 'No Data', icon, style } = props

  const classes = classNames(className, {
    [styles[`mono__no-data`]]: true
  })

  return (
    <div className={classes} style={style}>
      {icon || <Blank fill='#aeaeae' />}
      <span className={styles['mono__no-data--text']}>{text}</span>
    </div>
  )
}

export default NoData
