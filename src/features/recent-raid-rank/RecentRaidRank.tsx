import { isNumber } from 'lodash-es'
import { FC } from 'react'

import { Spinner } from '@/components/spinner'

import styles from './RecentRaidRank.module.scss'
import { useRecentRaidHistoryQuery } from './RecentRaidRank.queries'

const RecentRaidRank: FC = () => {
  const { isFetching, data: [recentRaid, lastRaid] = [] } =
    useRecentRaidHistoryQuery()

  const rankDiff =
    recentRaid && lastRaid ? lastRaid.rank - recentRaid.rank : null
  const getRankSign = () => {
    if (rankDiff === null) {
      return ''
    }

    if (rankDiff === 0) {
      return '-'
    }

    if (rankDiff < 0) {
      return '▾'
    }

    return '▴'
  }

  return (
    <div className={styles.container}>
      {isFetching && <Spinner />}
      <img
        className={styles.backgroundImage}
        src="assets/images/party.gif"
        alt="파티"
      />
      {recentRaid && (
        <div className={styles.content}>
          <h4 className={styles.contentTitle}>
            최근 레이드(시즌{recentRaid.no})
          </h4>
          <span className={styles.contentSub}>{recentRaid.name}</span>
          <span className={styles.contentText}>
            {recentRaid.rank}위
            {isNumber(rankDiff) &&
              `(${getRankSign()}${
                rankDiff
                  ? Intl.NumberFormat('ko-KR', {
                      signDisplay: 'never',
                    }).format(rankDiff)
                  : ''
              })`}
          </span>
        </div>
      )}
    </div>
  )
}

export default RecentRaidRank
