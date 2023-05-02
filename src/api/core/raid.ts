import { RaidAttendance } from '@/models/raid/raid-attendance.model'
import { RaidHistory } from '@/models/raid/raid-history.model'

import { requester } from './requester'

export const getRaidHistories = () => {
  return requester.get<RaidHistory[]>('/api/raid-histories.json')
}

export const getRaidAttendances = () => {
  return requester.get<RaidAttendance[]>('/api/raid-attendances.json')
}
