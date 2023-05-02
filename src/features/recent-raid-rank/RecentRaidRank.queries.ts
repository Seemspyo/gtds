import { useQuery } from 'react-query'

import { getRaidHistories } from '@/api/core/raid'

export const useRecentRaidHistoryQuery = () => {
  return useQuery({
    queryKey: ['RecentRaidRank__recentRaidHistory'],
    queryFn: getRaidHistories,
    select: (data) => data.sort((a, b) => b.no.localeCompare(a.no)).at(0),
  })
}
