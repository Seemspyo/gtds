import { FC } from 'react'

import { Box } from '@/components/box'
import { Spinner } from '@/components/spinner'

import { useVacation } from './Vacation.hooks'
import styles from './Vacation.module.scss'

const Vacation: FC = () => {
  const {
    isLoading,
    memberWithVacationCountList,
    recentRaidHistoryWithPerfectAttendanceMember,
  } = useVacation()

  return (
    <div className={styles.container}>
      {isLoading && <Spinner />}
      {recentRaidHistoryWithPerfectAttendanceMember && (
        <div className={styles.recentAttendance}>
          <img
            className={styles.backgroundImage}
            src="assets/images/reward.gif"
            alt="reward"
          />
          <div className={styles.recentAttendanceContent}>
            <h4 className={styles.contentTitle}>
              시즌 {recentRaidHistoryWithPerfectAttendanceMember.raidNo} -{' '}
              {recentRaidHistoryWithPerfectAttendanceMember.raidName} 개근맨
            </h4>
            <div className={styles.contentList}>
              {recentRaidHistoryWithPerfectAttendanceMember.perfectAttendanceMembers
                .sort((a, b) => a.nickname.localeCompare(b.nickname))
                .map(({ uid, nickname }) => (
                  <Box key={uid}>👍{nickname}</Box>
                ))}
            </div>
          </div>
        </div>
      )}
      <h3 className={styles.mainTitle}>🤑 휴가 현황표</h3>
      <ul className={styles.vacationList}>
        {memberWithVacationCountList.map((data) => (
          <li key={data.uid} className={styles.vacationItem}>
            <span>{data.nickname}</span>
            <div className={styles.vacationCount}>
              <span>
                남은 휴가: <b>{data.availableVacationCount}일</b>
              </span>
              <span>
                사용한 휴가: <b>{data.usedVacationCount}일</b>
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Vacation
