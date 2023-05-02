import { FC } from 'react'

import { RaidRank } from '@/features/raid-rank'
import { RecentRaidRank } from '@/features/recent-raid-rank'

const Rank: FC = () => {
  return (
    <>
      <RecentRaidRank />
      <RaidRank />
    </>
  )
}

export default Rank
