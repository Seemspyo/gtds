import { GuardianUid } from '@/models/types'

export interface RaidAttendance {
  raidNo: string
  raidEndedAt: string
  perfectAttendanceMemberUids: GuardianUid[]
}
