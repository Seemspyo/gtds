import { FC } from 'react'

import { Spinner } from '@/components/spinner'

import styles from './RecentRaidRank.module.scss'
import { useRecentRaidHistoryQuery } from './RecentRaidRank.queries'

const RecentRaidRank: FC = () => {
  const { isFetching, data } = useRecentRaidHistoryQuery()

  return (
    <div className={styles.container}>
      {isFetching && <Spinner />}
      <img
        className={styles.backgroundImage}
        src="assets/images/party.gif"
        alt="파티"
      />
      {data && (
        <div className={styles.content}>
          <h4 className={styles.contentTitle}>직전 레이드(시즌{data.no})</h4>
          <span className={styles.contentSub}>{data.name}</span>
          <span className={styles.contentText}>{data.rank}위</span>
        </div>
      )}
    </div>
  )
}

export default RecentRaidRank
