import { isNil } from 'lodash-es'
import { useMemo } from 'react'

import { useVacationCalculation } from '@/hooks/useVacationCalculation'

import {
  useActiveMemberListQuery,
  useRaidAttendanceListQuery,
  useRaidHistoryListQuery,
} from './Vacation.queries'

export const useMemberListWithVacationCount = () => {
  const activeMemberListQuery = useActiveMemberListQuery()
  const raidHistoryListQuery = useRaidHistoryListQuery()
  const raidAttendanceListQuery = useRaidAttendanceListQuery()

  const isLoading =
    activeMemberListQuery.isFetching ||
    raidHistoryListQuery.isFetching ||
    raidAttendanceListQuery.isFetching

  const { isValidVacation } = useVacationCalculation()

  const memberWithVacationCountList = useMemo(() => {
    const { data: activeMemberList = [] } = activeMemberListQuery
    const { data: raidAttendanceList = [] } = raidAttendanceListQuery

    const memberVacationCountMap = raidAttendanceList.reduce<
      Record<string, number>
    >((acc, { raidEndedAt, perfectAttendanceMemberUids }) => {
      perfectAttendanceMemberUids.forEach((memberUid) => {
        if (isNil(acc[memberUid])) {
          acc[memberUid] = 0
        }

        if (isValidVacation(raidEndedAt)) {
          acc[memberUid] += 1
        }
      })

      return acc
    }, {})

    return activeMemberList
      .map((member) => ({
        ...member,
        availableVacationCount: memberVacationCountMap[member.uid] ?? 0,
        // TODO
        usedVacationCount: 0,
      }))
      .sort((a, b) => a.nickname.localeCompare(b.nickname))
  }, [activeMemberListQuery.data, raidAttendanceListQuery.data])

  return {
    isLoading,
    memberWithVacationCountList,
  }
}
