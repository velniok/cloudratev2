import { FC, useEffect } from 'react'
import styles from './CriteriasPopup.module.scss'
import { ReviewIcon } from '../icon'

interface CriteriasPopupProps {
    show: boolean
    avgCriterias: number[]
    position: 'bottom' | 'top'
    close: () => void
    review?: boolean
}

export const CriteriasPopup: FC<CriteriasPopupProps> = ({ show, avgCriterias, position, close, review }) => {

    const criteriaTitles = ['Продакшн', 'Текст', 'Подача', 'Мелодия', 'Оригинальность']

    useEffect(() => {
        document.addEventListener('closePopups', close)
        document.addEventListener('click', close)
        return () => {
            document.removeEventListener('closePopups', close)
            document.addEventListener('click', close)
        }
    }, [])

    return (
        <div className={`${styles.criterias} ${show ? styles.open : ''} ${styles[position]}`}>
            <div className={styles.criterias__top}>
            <p className={styles.criterias__text}>Средние оценки по критериям</p>
            {
                review &&
                <div className={styles.criterias__review}>
                    <ReviewIcon />
                    <span className={styles.criterias__reviewText}>ОТЗЫВ</span>
                </div>
            }
            </div>
            <ul className={styles.criterias__list}>
                {
                    Object.values(avgCriterias).map((criteria, index) => {
                        return (
                            <li key={index} className={styles.criterias__item}>
                                <p className={styles.criterias__title}>{criteriaTitles[index]}</p>
                                <div className={styles.criterias__line}>
                                    <div className={styles.criterias__fill} style={{ width: `${criteria * 10}%` }}></div>
                                </div>
                                <span className={styles.criterias__rating}>{criteria}</span>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}
