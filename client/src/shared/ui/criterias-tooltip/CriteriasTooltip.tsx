import { FC } from 'react'
import styles from './CriteriasTooltip.module.scss'
import { ReviewIcon } from '../icon'

interface CriteriasTooltipProps {
    avgCriterias: number[]
    isComment?: boolean
}

export const CriteriasTooltip: FC<CriteriasTooltipProps> = ({ avgCriterias, isComment }) => {

    const criteriaTitles = ['Текст', 'Бит и Ритм', 'Подача', 'Аранжировка', 'Атмосфера и Эмоции']

    return (
        <div className={styles.wrapper}>
            {
                isComment &&
                <div className={styles.review}>
                    <i className="ph ph-chat-text"></i>
                    <span className={styles.review__text}>ОТЗЫВ</span>
                </div>
            }
            <ul className={styles.list}>
                {
                    Object.values(avgCriterias).map((criteria, index) => {
                        return (
                            <li key={index} className={styles.item}>
                                <p className={styles.item__title}>{criteriaTitles[index]}</p>
                                <div className={styles.item__content}>
                                    <div className={styles.item__line}>
                                        <div className={styles.item__fill} style={{ width: `${(criteria ?? 0) * 10}%` }}></div>
                                    </div>
                                    <span className={styles.item__rating}>{criteria}</span>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}
