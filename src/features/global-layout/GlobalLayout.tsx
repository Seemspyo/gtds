import { FC, PropsWithChildren, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { Box } from '@/components/box'
import { IconButton } from '@/components/button'
import { GlobalNav } from '@/features/global-nav'

import styles from './GlobalLayout.module.scss'

const GlobalLayout: FC<PropsWithChildren> = ({ children }) => {
  const [isNavOpen, setIsNavOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setIsNavOpen(false)
  }, [location.key])

  return (
    <div className={styles.container}>
      <img
        className={styles.backgroundImage}
        src="assets/images/banner.jpg"
        alt="Discovery"
      />
      <header className={styles.header}>
        <Link to="/">
          <Box>
            <h1 className={styles.title}>
              <img
                className={styles.titleIcon}
                src="assets/images/logo.webp"
                alt="가디언 테일즈"
              />{' '}
              Discovery 길드
            </h1>
          </Box>
        </Link>
        <IconButton
          className={styles.menuButton}
          onClick={() => setIsNavOpen(true)}
        >
          ⚙️
        </IconButton>
      </header>
      <main className={styles.content}>{children}</main>
      {isNavOpen && (
        <GlobalNav
          onBackdropClick={() => setIsNavOpen(false)}
          onCloseButtonClick={() => setIsNavOpen(false)}
        />
      )}
    </div>
  )
}

export default GlobalLayout
