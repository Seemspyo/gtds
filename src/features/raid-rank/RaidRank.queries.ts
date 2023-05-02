import { useQuery } from 'react-query'

import { getRaidHistories } from '@/api/core/raid'

export const useRaidRankListQuery = () => {
  return useQuery({
    queryKey: ['RaidRank__raidRankList'],
    queryFn: getRaidHistories,
    placeholderData: [],
  })
}
