import { FC, MouseEventHandler, useRef } from 'react'
import { Link } from 'react-router-dom'

import { Box, ContentBox } from '@/components/box'
import { BlockButton, IconButton } from '@/components/button'
import { useNavList } from '@/hooks/useNavList'
import { noop } from '@/utils/noop'

import styles from './GlobalNav.module.scss'

interface GlobalNavProps {
  onBackdropClick?: MouseEventHandler<HTMLDivElement>
  onCloseButtonClick?: MouseEventHandler<HTMLButtonElement>
}

const GlobalNav: FC<GlobalNavProps> = ({
  onBackdropClick,
  onCloseButtonClick,
}) => {
  const { navList } = useNavList()

  const backdropRef = useRef<HTMLDivElement>(null)
  const handleBackdropClick: MouseEventHandler<HTMLDivElement> = (event) => {
    if (event.target === backdropRef.current) {
      event.preventDefault()
      event.stopPropagation()
      onBackdropClick?.(event)
    }
  }

  return (
    <div
      ref={backdropRef}
      role="button"
      tabIndex={-1}
      className={styles.container}
      onClick={handleBackdropClick}
      onKeyDown={noop}
    >
      <Box>
        <aside className={styles.navContainer}>
          <div className={styles.navHeader}>
            <span className={styles.navTitle}>Made by Seemspyo</span>
            <IconButton
              className={styles.navClose}
              onClick={onCloseButtonClick}
            >
              X
            </IconButton>
          </div>
          <nav>
            <ContentBox>
              {navList.map(
                ({
                  iconURL,
                  iconAlt,
                  title,
                  backgroundImageURL,
                  onClick,
                  to,
                }) => {
                  const buttonNode = (
                    <BlockButton
                      key={iconURL}
                      className={styles.navButton}
                      icon={
                        <img
                          className={styles.iconImage}
                          src={iconURL}
                          alt={iconAlt}
                        />
                      }
                      title={title}
                      backgroundImageURL={backgroundImageURL}
                      onClick={onClick}
                    />
                  )

                  return onClick ? (
                    buttonNode
                  ) : (
                    <Link to={to} className={styles.navButton}>
                      {buttonNode}
                    </Link>
                  )
                }
              )}
            </ContentBox>
          </nav>
        </aside>
      </Box>
    </div>
  )
}

export default GlobalNav
