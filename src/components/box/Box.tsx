import { FC, PropsWithChildren } from 'react'

import styles from './Box.module.scss'

const Box: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={styles.box}>
      <div className={styles.innerBox}>{children}</div>
    </div>
  )
}

export default Box
