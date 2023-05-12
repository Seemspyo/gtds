import { isNil, keyBy } from 'lodash-es'
import { useMemo } from 'react'

import { useVacationCalculation } from '@/hooks/useVacationCalculation'

import {
  useActiveMemberListQuery,
  useRaidAttendanceListQuery,
  useRaidHistoryListQuery,
} from './Vacation.queries'

export const useVacation = () => {
  const activeMemberListQuery = useActiveMemberListQuery()
  const raidHistoryListQuery = useRaidHistoryListQuery()
  const raidAttendanceListQuery = useRaidAttendanceListQuery()

  const isLoading =
    activeMemberListQuery.isFetching ||
    raidHistoryListQuery.isFetching ||
    raidAttendanceListQuery.isFetching

  const { getVacationEndDate, isValidVacation } = useVacationCalculation()

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
        availableVacationCount: memberVacationCountMap[member.uid],
        // TODO
        usedVacationCount: 0,
      }))
      .sort((a, b) => a.nickname.localeCompare(b.nickname))
  }, [activeMemberListQuery.data, raidHistoryListQuery.data])

  const recentRaidHistoryWithPerfectAttendanceMember = useMemo(() => {
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
    memberWithVacationCountList,
    recentRaidHistoryWithPerfectAttendanceMember,
  }
}
