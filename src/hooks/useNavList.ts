import { useMemo } from 'react'
import { To } from 'react-router-dom'

import { useOpenOuterLink } from '@/hooks/useOpenOuterLink'

interface CommonNavData {
  iconURL: string
  iconAlt: string
  title: string
  backgroundImageURL: string
}

export interface OuterNavData extends CommonNavData {
  onClick: () => void
  to?: undefined
}

export interface InnterNavData extends CommonNavData {
  onClick?: undefined
  to: To
}

export type NavData = OuterNavData | InnterNavData

export const useNavList = () => {
  const openOuterLink = useOpenOuterLink()
  const getNavList = (): NavData[] => {
    return [
      {
        iconURL: 'assets/images/daum-cafe.png',
        iconAlt: '가디언 테일즈 공식 카페',
        title: '공식 카페',
        backgroundImageURL: 'assets/images/daum-cafe-bg.webp',
        onClick: () => {
          openOuterLink('https://cafe.daum.net/GuardianTales')
        },
      },
      {
        iconURL: 'assets/images/rank.png',
        iconAlt: '때려잡기',
        title: '레이드 순위',
        backgroundImageURL: 'assets/images/rank-bg.webp',
        to: '/ranks',
      },
      {
        iconURL: 'assets/images/vacation.png',
        iconAlt: '안녕',
        title: '휴가 현황표',
        backgroundImageURL: 'assets/images/vacation-bg.webp',
        to: '/attendance',
      },
      {
        iconURL: 'assets/images/raid-history.png',
        iconAlt: '보스',
        title: '레이드 일지',
        backgroundImageURL: 'assets/images/raid-history-bg.webp',
        to: '/raid-histories',
      },
    ]
  }

  const navList = useMemo(() => getNavList(), [])

  return {
    navList,
  }
}
