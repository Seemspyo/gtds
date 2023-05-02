import { FC } from 'react'
import { Outlet } from 'react-router-dom'

import { GlobalLayout } from '@/features/global-layout'

const Main: FC = () => {
  return (
    <GlobalLayout>
      <Outlet />
    </GlobalLayout>
  )
}

export default Main
