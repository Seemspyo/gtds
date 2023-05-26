import { FC } from 'react'

import { Box } from '@/components/box'
import { Spinner } from '@/components/spinner'

import { useRecentRaidHistoryWithPerfectAttendanceMemberList } from './RecentPerfectAttendance.hooks'
import styles from './RecentPerfectAttendance.module.scss'

const RecentPerfectAttendance: FC = () => {
  const { isLoading, recentRaidHistoryWithPerfectAttendanceMemberList } =
    useRecentRaidHistoryWithPerfectAttendanceMemberList()

  return (
    <div className={styles.container}>
      {isLoading && <Spinner />}
      {recentRaidHistoryWithPerfectAttendanceMemberList && (
        <div className={styles.recentAttendance}>
          <img
            className={styles.backgroundImage}
            src="assets/images/reward.gif"
            alt="reward"
          />
          <div className={styles.recentAttendanceContentWrapper}>
            <div className={styles.recentAttendanceContent}>
              <Box>
                <h4 className={styles.contentTitle}>
                  🏆 시즌{' '}
                  {recentRaidHistoryWithPerfectAttendanceMemberList.raidNo} -{' '}
                  {recentRaidHistoryWithPerfectAttendanceMemberList.raidName}{' '}
                  개근맨
                </h4>
              </Box>
              <div className={styles.contentList}>
                {recentRaidHistoryWithPerfectAttendanceMemberList.perfectAttendanceMembers
                  .sort((a, b) => a.nickname.localeCompare(b.nickname))
                  .map(({ uid, nickname }) => (
                    <Box key={uid}>🎖️{nickname}</Box>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default RecentPerfectAttendance
