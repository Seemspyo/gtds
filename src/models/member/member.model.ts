import { GuardianUid } from '@/models/types'

export const MemberStatus = {
  ACTIVE: 'ACTIVE',
  RESIGNED: 'RESIGNED',
  KICKED_ABANDON_DUTY: 'KICKED_ABANDON_DUTY',
  KICKED_ABSCENT: 'KICKED_ABSCENT',
} as const
export type MemberStatus = (typeof MemberStatus)[keyof typeof MemberStatus]

export interface Member {
  uid: GuardianUid
  nickname: string
  status: MemberStatus
  inactivatedAt: string | null
}
