import { FC } from 'react'
import { Link } from 'react-router-dom'

import { BlockButton } from '@/components/button'
import { useNavList } from '@/hooks/useNavList'

import styles from './MainNav.module.scss'

const MainNav: FC = () => {
  const { navList } = useNavList()

  return (
    <div className={styles.container}>
      {navList.map(
        ({ iconURL, iconAlt, title, backgroundImageURL, onClick, to }) => {
          const buttonNode = (
            <BlockButton
              key={iconURL}
              className={styles.navButton}
              icon={
                <img className={styles.iconImage} src={iconURL} alt={iconAlt} />
              }
              title={title}
              backgroundImageURL={backgroundImageURL}
              onClick={onClick}
            />
          )

          return onClick ? (
            buttonNode
          ) : (
            <Link to={to} className={styles.navButton} key={iconURL}>
              {buttonNode}
            </Link>
          )
        }
      )}
    </div>
  )
}

export default MainNav
