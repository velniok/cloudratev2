import { Button, Rating } from '@/shared/ui'
import styles from './ReviewCreated.module.scss'
import { CSSProperties, FC } from 'react'
import { IReview } from '../model/types'

interface ReviewCreatedProps {
    review: IReview
}

export const ReviewCreated: FC<ReviewCreatedProps> = ({ review }) => {

    const ranges = ['Продакшн', 'Текст', 'Подача', 'Мелодия', 'Оригинальность']
    const values = ([review.criteria1, review.criteria2, review.criteria3, review.criteria4, review.criteria5])
    const rating = review.rating
    const text = review.text

    return (
        <>
            <div className={styles.content}>
                <div className={styles.grade}>
                    <ul className={styles.criteria__list}>
                        {
                            ranges.map((range, index) => {
                                return (
                                    <li key={index} className={styles.criteria__item}>
                                        <label className={styles.criteria__label}>{range}</label>
                                        <input style={{ '--value': `${values[index]}` } as CSSProperties} type="range" min='0' max="10" step='1' value={values[index]} className={styles.criteria__range} />
                                        <Rating>{values[index]}</Rating>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <div className={styles.rating}>
                        <p className={styles.rating__title}>ОБЩАЯ ОЦЕНКА</p>
                        <Rating size='big'>{rating}</Rating>
                        <p className={styles.rating__desc}>из 70</p>
                    </div>
                </div>
                
            </div>
            <div className={styles.footer}>
                <p className={styles.footer__text}>Оценка зафиксирована</p>
            </div>
        </>
    )
}
