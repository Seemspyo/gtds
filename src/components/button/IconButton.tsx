import clsx from 'clsx'
import { FC, MouseEventHandler, PropsWithChildren } from 'react'

import styles from './IconButton.module.scss'

type IconButtonProps = PropsWithChildren<{
  className?: string
  onClick?: MouseEventHandler<HTMLButtonElement>
}>

const IconButton: FC<IconButtonProps> = ({ children, className, onClick }) => {
  return (
    <button
      type="button"
      className={clsx(styles.iconButton, className)}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default IconButton
