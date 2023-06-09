import { FC } from 'react'

import styles from './Spinner.module.scss'

const Spinner: FC = () => {
  return (
    <div className={styles.spinner}>
      <span className={styles.loader} />
    </div>
  )
}

export default Spinner
