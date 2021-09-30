import React from 'react'
import classNames from 'classnames'

import styles from './styles.module.css'

export type AvatarBorderProps = {
  border: string
  borderStyle:
    | 'dotted'
    | 'dashed'
    | 'solid'
    | 'double'
    | 'groove'
    | 'ridge'
    | 'inset'
    | 'outset'
  borderWidth: string
  borderColor: string
}
export type AvatarProps = {
  src: string
  className?: string
  size?: 'xs' | 'sm' | 'md' | 'lg'
  shape?: 'circle' | 'square'
  alt?: string
  style?: any
  bordered?: boolean
  borderStyle?: AvatarBorderProps
}

const Avatar = (props: AvatarProps) => {
  const {
    className,
    src,
    shape = 'circle',
    size = 'md',
    alt,
    style,
    bordered = false,
    borderStyle
  } = props

  const classes = classNames({
    [styles.mono__avatar]: true,
    [className || '']: className || '',
    [styles[`mono__avatar--${size}`]]:
      size && typeof size === 'string' && size !== 'md',
    [styles[`mono__avatar--${shape}`]]: shape && shape !== 'circle',
    [styles.bordered]: bordered
  })

  const imageStyles = {
    width: typeof size === 'number' && size + 'px',
    height: typeof size === 'number' && size + 'px',
    lineHeight: typeof size === 'number' && size + 'px',
    ...style
  }

  if (bordered && borderStyle) {
    Object.assign(imageStyles, { ...borderStyle })
  }

  return (
    <span className={classes} style={imageStyles}>
      {src && (
        <img className={styles[`mono__avatar--image`]} src={src} alt={alt} />
      )}
    </span>
  )
}

export default Avatar
