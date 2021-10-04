import React from 'react'
import classNames from 'classnames'

import styles from './styles.module.css'

type AvatarBorderProps = {
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
type AvatarProps = {
  src: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | number
  shape?: 'circle' | 'square'
  alt?: string
  bordered?: boolean
  borderStyle?: AvatarBorderProps
  className?: string
  style?: React.CSSProperties
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

  const classes = classNames(className, {
    [styles.mono__avatar]: true,
    [styles[`mono__avatar--${size}`]]:
      size && typeof size === 'string' && size !== 'md',
    [styles[`mono__avatar--${shape}`]]: shape && shape !== 'circle',
    [styles.bordered]: bordered
  })

  const imageStyles: React.CSSProperties = {
    width: typeof size === 'number' ? `${size}px` : '40px',
    height: typeof size === 'number' ? `${size}px` : '40px',
    lineHeight: typeof size === 'number' ? `${size}px` : '40px',
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

export { Avatar, AvatarProps, AvatarBorderProps }
export default Avatar
