import React from 'react'
import classNames from 'classnames'
// eslint-disable-next-line no-unused-vars
import Button, { ButtonProps } from '../index'

import styles from '../styles.module.css'

export interface IconButtonProps extends ButtonProps {}

export const IconButton = (props: IconButtonProps) => {
  const { className, size, shape, children, ...others } = props

  const classes = classNames(className, {
    [styles[`mono__icon-btn`]]: true,
    [styles[`mono__icon-btn--size-${size}`]]: size && size !== 'md',
    [styles[`mono__icon-btn--shape-${shape}`]]: shape && shape !== 'square' // circle, round, square
  })

  return (
    <Button className={classes} {...others}>
      {children}
    </Button>
  )
}

export default IconButton
