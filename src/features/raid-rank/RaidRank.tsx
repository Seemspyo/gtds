import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'
import { FC } from 'react'
import { Line } from 'react-chartjs-2'

import { Spinner } from '@/components/spinner'

import { useRaidRank } from './RaidRank.hooks'
import styles from './RaidRank.module.scss'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const RaidRank: FC = () => {
  const { isLoading, chartData, dataCount } = useRaidRank()

  return (
    <div>
      <h3 className={styles.mainTitle}>🏆 레이드 순위표</h3>
      <div className={styles.chartContainer}>
        {isLoading && <Spinner />}
        <div className={styles.chartWrapper}>
          <div
            className={styles.chart}
            style={{ width: `${dataCount * 50}px` }}
          >
            <Line
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                borderColor: 'skyblue',
                scales: {
                  y: {
                    title: {
                      display: true,
                      text: '순위',
                    },
                    reverse: true,
                    grid: {
                      tickWidth: 50,
                    },
                    ticks: {
                      stepSize: 20,
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default RaidRank
