import { Member } from '@/models/member/member.model'

import { requester } from './requester'

export const getMembers = () => {
  return requester.get<Member[]>('/api/members.json')
}
