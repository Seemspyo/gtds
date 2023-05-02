import { FC, PropsWithChildren } from 'react'

import styles from './ContentBox.module.scss'

const ContentBox: FC<PropsWithChildren> = ({ children }) => {
  return <div className={styles.contentBox}>{children}</div>
}

export default ContentBox
