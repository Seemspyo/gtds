import { useQuery } from 'react-query'

import { getMembers } from '@/api/core/member'
import { getRaidAttendances, getRaidHistories } from '@/api/core/raid'
import { MemberStatus } from '@/models/member/member.model'

export const useActiveMemberListQuery = () => {
  return useQuery({
    queryKey: ['getMembers'],
    queryFn: getMembers,
    select: (data) =>
      data.filter(({ status }) => status === MemberStatus.ACTIVE),
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
