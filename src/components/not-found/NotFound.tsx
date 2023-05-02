import { FC } from 'react'

import styles from './NotFound.module.scss'

const NotFound: FC = () => {
  return (
    <div className={styles.container}>
      <img src="assets/images/404.webp" alt="404 NOT FOUND" />
    </div>
  )
}

export default NotFound
