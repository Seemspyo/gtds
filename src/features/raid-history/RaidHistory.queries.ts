import { useQuery } from 'react-query'

import { getMembers } from '@/api/core/member'
import { getRaidAttendances, getRaidHistories } from '@/api/core/raid'

export const useMemberListQuery = () => {
  return useQuery({
    queryKey: ['getMembers'],
    queryFn: getMembers,
  })
}

export const useRaidHistoryListQuery = () => {
  return useQuery({
    queryKey: ['getRaidHistories'],
    queryFn: getRaidHistories,
  })
}

export const useRaidAttendanceListQuery = () => {
  return useQuery({
    queryKey: ['getRaidAttendances'],
    queryFn: getRaidAttendances,
  })
}
