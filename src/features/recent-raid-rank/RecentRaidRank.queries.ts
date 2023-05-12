import { useQuery } from 'react-query'

import { getRaidHistories } from '@/api/core/raid'

export const useRecentRaidHistoryQuery = () => {
  return useQuery({
    queryKey: ['getRaidHistories'],
    queryFn: getRaidHistories,
    select: (data) => {
      const sortedData = data.sort((a, b) => b.no.localeCompare(a.no))

      return [sortedData.at(0), sortedData.at(1)] as const
    },
  })
}
