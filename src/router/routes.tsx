import { RouteObject } from 'react-router-dom'

import { NotFound } from '@/components/not-found'

import Attendance from './Attendance.page'
import Home from './Home.page'
import Main from './Main'
import Rank from './Rank.page'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Main />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/ranks',
        element: <Rank />,
      },
      {
        path: '/attendance',
        element: <Attendance />,
      },
    ],
  },
]
