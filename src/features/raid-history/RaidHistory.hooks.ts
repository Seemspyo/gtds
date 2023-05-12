import { keyBy } from 'lodash-es'
import { useMemo } from 'react'

import { useVacationCalculation } from '@/hooks/useVacationCalculation'

import {
  useMemberListQuery,
  useRaidAttendanceListQuery,
  useRaidHistoryListQuery,
} from './RaidHistory.queries'

export const useRaidHistory = () => {
  const memberListQuery = useMemberListQuery()
  const raidHistoryListQuery = useRaidHistoryListQuery()
  const raidAttendanceListQuery = useRaidAttendanceListQuery()

  const isLoading =
    memberListQuery.isFetching ||
    raidHistoryListQuery.isFetching ||
    raidAttendanceListQuery.isFetching

  const { getVacationEndDate } = useVacationCalculation()

  const raidHistoryWithPerfectAttendanceMemberList = useMemo(() => {
    const { data: memberList = [] } = memberListQuery
    const { data: raidHistoryList = [] } = raidHistoryListQuery
    const { data: raidAttendanceList = [] } = raidAttendanceListQuery

    const memberMap = keyBy(memberList, 'uid')
    const raidMap = keyBy(raidHistoryList, 'no')

    return raidAttendanceList
      .map(({ raidNo, raidEndedAt, perfectAttendanceMemberUids }) => {
        const { name: raidName } = raidMap[raidNo]

        return {
          raidNo,
          raidName,
          raidEndedAt,
          vacationEndedAt:
            getVacationEndDate(raidEndedAt).toFormat('yyyy/MM/dd'),
          perfectAttendanceMembers: perfectAttendanceMemberUids.map(
            (memberUid) => memberMap[memberUid]
          ),
        }
      })
      .sort((a, b) => b.raidNo.localeCompare(a.raidNo))
  }, [
    memberListQuery.data,
    raidAttendanceListQuery.data,
    raidHistoryListQuery.data,
  ])

  return {
    isLoading,
    raidHistoryList: raidHistoryWithPerfectAttendanceMemberList,
  }
}
