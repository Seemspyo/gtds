import { keyBy } from 'lodash-es'
import { useMemo } from 'react'

import { useVacationCalculation } from '@/hooks/useVacationCalculation'

import {
  useActiveMemberListQuery,
  useRaidAttendanceListQuery,
  useRaidHistoryListQuery,
} from './RecentPerfectAttendance.queries'

export const useRecentRaidHistoryWithPerfectAttendanceMemberList = () => {
  const activeMemberListQuery = useActiveMemberListQuery()
  const raidHistoryListQuery = useRaidHistoryListQuery()
  const raidAttendanceListQuery = useRaidAttendanceListQuery()

  const isLoading =
    activeMemberListQuery.isFetching ||
    raidHistoryListQuery.isFetching ||
    raidAttendanceListQuery.isFetching

  const { getVacationEndDate } = useVacationCalculation()

  const recentRaidHistoryWithPerfectAttendanceMemberList = useMemo(() => {
    const { data: activeMemberList = [] } = activeMemberListQuery
    const { data: raidHistoryList = [] } = raidHistoryListQuery
    const { data: raidAttendanceList = [] } = raidAttendanceListQuery

    const memberMap = keyBy(activeMemberList, 'uid')
    const raidAttendance = raidAttendanceList
      .sort((a, b) => b.raidNo.localeCompare(a.raidNo))
      .at(0)

    if (!raidAttendance) {
      return null
    }

    const raid = raidHistoryList.find(({ no }) => raidAttendance.raidNo === no)

    if (!raid) {
      return null
    }

    return {
      raidNo: raid.no,
      raidName: raid.name,
      raidEndedAt: raidAttendance.raidEndedAt,
      vacationEndedAt: getVacationEndDate(raidAttendance.raidEndedAt).toFormat(
        'yyyy/MM/dd'
      ),
      perfectAttendanceMembers: raidAttendance.perfectAttendanceMemberUids
        .map((memberUid) => memberMap[memberUid])
        .filter((member) => !!member),
    }
  }, [
    activeMemberListQuery.data,
    raidAttendanceListQuery.data,
    raidHistoryListQuery.data,
  ])

  return {
    isLoading,
    recentRaidHistoryWithPerfectAttendanceMemberList,
  }
}
