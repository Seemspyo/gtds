import { useMemo } from 'react'

import { useRaidRankListQuery } from './RaidRank.queries'

export const useRaidRank = () => {
  const raidRankListQuery = useRaidRankListQuery()
  const chartData = useMemo(() => {
    const histories = (raidRankListQuery.data ?? []).sort((a, b) =>
      b.no.localeCompare(a.no)
    )

    return {
      labels: ['순위'],
      datasets: [
        {
          label: '순위',
          data: histories.map(({ no, name, rank }) => {
            return {
              x: `${no}. ${name}`,
              y: rank,
            }
          }),
        },
      ],
    }
  }, [raidRankListQuery.data])
  const dataCount = raidRankListQuery.data?.length ?? 0

  return {
    isLoading: raidRankListQuery.isFetching,
    chartData,
    dataCount,
  }
}
