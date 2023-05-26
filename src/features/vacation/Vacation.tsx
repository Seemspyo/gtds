import { FC } from 'react'

import { Spinner } from '@/components/spinner'
import { RecentPerfectAttendance } from '@/features/recent-perfect-attendance'

import { useMemberListWithVacationCount } from './Vacation.hooks'
import styles from './Vacation.module.scss'

const Vacation: FC = () => {
  const { isLoading, memberWithVacationCountList } =
    useMemberListWithVacationCount()

  return (
    <div className={styles.container}>
      {isLoading && <Spinner />}
      <RecentPerfectAttendance />
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
