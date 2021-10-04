import React from 'react'
import classNames from 'classnames'

import styles from './styles.module.css'

export type LoadingRowsProps = {
  rows?: number
  loading?: boolean
}

const LoadingRows = ({ rows = 1, loading = true }) => {
  const classes = classNames({
    [styles['u-flex__cell']]: true,
    [styles['u-mg--sm']]: true,
    [styles['u-pd--sm']]: true,
    [styles['loading-animation']]: true
  })

  if (!loading) return null

  const arr = Array.from(Array(rows), (_, index) => index + 1)
  return (
    <div>
      {arr.map((i) => (
        <div key={i} className={styles['u-flex']}>
          <div className={classes} />
        </div>
      ))}
    </div>
  )
}

export default LoadingRows
