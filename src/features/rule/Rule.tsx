import { FC } from 'react'

import { ruleList } from './Rule.constants'
import styles from './Rule.module.scss'

const Rule: FC = () => {
  return (
    <div>
      <div>
        <h3 className={styles.mainTitle}>⚔️ 운영 규칙</h3>
        {ruleList.map(({ title, descriptions }, index) => {
          const no = index + 1

          return (
            <div key={title}>
              <h4 className={styles.title}>
                {no}. {title}
              </h4>
              <ul className={styles.ruleList}>
                {descriptions.map((description) => (
                  <li
                    key={title + description}
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{ __html: description }}
                  />
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Rule
