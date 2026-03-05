import { InputRange, Rating } from '@/shared/ui'
import styles from './LeaveReview.module.scss'
import { FC } from 'react'
import { IReview } from '../model/types'

interface LeavedReviewProps {
    review: IReview
}

export const LeavedReview: FC<LeavedReviewProps> = ({ review }) => {

    const ranges = ['Продакшн', 'Текст', 'Подача', 'Мелодия', 'Оригинальность']
    const values = [review.criteria1, review.criteria2, review.criteria3, review.criteria4, review.criteria5]

    return (
        <>
            <div className={styles.content}>
                <div className={styles.grade}>
                    <ul className={styles.criteria__list}>
                        {
                            ranges.map((range, index) => {
                                return (
                                    <InputRange
                                        key={index}
                                        label={range}
                                        values={values}
                                        index={index}
                                        notChange={true}
                                    />
                                )
                            })
                        }
                    </ul>
                    <div className={styles.rating}>
                        <p className={styles.rating__title}>ОБЩАЯ ОЦЕНКА</p>
                        <Rating size='big'>{review.rating}</Rating>
                        <p className={styles.rating__desc}>из 70</p>
                    </div>
                </div>
                <div className={styles.rating__text}>
                    {review.text}
                </div>
            </div>
            <div className={styles.footer__leaved}>
                <p className={styles.footer__text}>Оценка зафиксирована</p>
            </div>
        </>
    )
}
