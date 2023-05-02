import clsx from 'clsx'
import { FC, MouseEventHandler, ReactNode } from 'react'

import styles from './BlockButton.module.scss'

interface BlockButtonProps {
  icon?: ReactNode
  title?: string
  backgroundImageURL: string
  className?: string
  onClick?: MouseEventHandler<HTMLButtonElement>
}

const BlockButton: FC<BlockButtonProps> = ({
  icon,
  title,
  backgroundImageURL,
  className,
  onClick,
}) => {
  return (
    <button
      type="button"
      className={clsx(styles.blockButton, className)}
      onClick={onClick}
    >
      <img
        className={styles.backgroundImage}
        src={backgroundImageURL}
        alt={title}
      />
      <div className={styles.content}>
        {icon && <div className={styles.icon}>{icon}</div>}
        {title && <div className={styles.title}>{title}</div>}
      </div>
    </button>
  )
}

export default BlockButton
