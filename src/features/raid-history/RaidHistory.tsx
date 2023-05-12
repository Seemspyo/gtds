import { FC } from 'react'

import { ContentBox } from '@/components/box'
import { Spinner } from '@/components/spinner'

import { useRaidHistory } from './RaidHistory.hooks'
import styles from './RaidHistory.module.scss'

const RaidHistory: FC = () => {
  const { isLoading, raidHistoryList } = useRaidHistory()

  return (
    <div className={styles.container}>
      {isLoading && <Spinner />}
      <h3 className={styles.mainTitle}>🎲 레이드 일지</h3>
      <ul className={styles.raidList}>
        {raidHistoryList.map((history) => (
          <li key={history.raidNo} className={styles.raidItem}>
            <div className={styles.raidItemContent}>
              <span className={styles.raidTitle}>
                🏆 {history.raidNo}. {history.raidName}
              </span>
              <div className={styles.raidDate}>
                <span>시즌 종료일: {history.raidEndedAt}</span>
                <span>휴가 만기일: {history.vacationEndedAt}</span>
              </div>
            </div>
            <span className={styles.raidMembers}>
              <ContentBox>
                <b>😍 개근맨</b>
                <br />
                <br />
                {history.perfectAttendanceMembers
                  .map(({ nickname }) => nickname)
                  .join(', ')}
              </ContentBox>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RaidHistory
