import { Button, Rating, Title } from '@/shared/ui'
import styles from './TrackGrade.module.scss'
import { ChangeEvent, CSSProperties, FC, useEffect, useState } from 'react'
import { createReviewApi } from '@/features/review'
import { ITrack } from '@/entities/track'
import { useAppSelector } from '@/shared/lib'
import { selectAuthUser } from '@/features/auth'

interface TrackGradeProps {
    track: ITrack
}

export const TrackGrade: FC<TrackGradeProps> = ({ track }) => {

    const user = useAppSelector(selectAuthUser)

    const [values, setValues] = useState<number[]>([5, 5, 5, 5, 5])
    const [rating, setRating] = useState<number>(20)

    useEffect(() => {
        setRating(prev => prev = values[0] + values[1] + values[2] + values[3] + values[4])
    }, [values])

    const hundleChangeValue = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        setValues((prev) => prev.map((prev, prevIndex) => {
            if (prevIndex === index) return Number(e.target.value)
            return prev
        }))
    }

    const onSubmit = async () => {
        await createReviewApi({
            text: 'njdsfjhdsfkj',
            userId: user.id,
            trackId: track.id,
            criteria1: values[0],
            criteria2: values[1],
            criteria3: values[2],
            criteria4: values[3],
            criteria5: values[4],
        })
    }

    return (
        <div className={styles.wrapper}>
            <div className="container">
                <Title>ВАША ОЦЕНКА</Title>
                <div className={styles.content}>
                    <div className={styles.grade}>
                        <ul className={styles.criteria__list}>
                            <li className={styles.criteria__item}>
                                <label className={styles.criteria__label}>Продакшн</label>
                                <input style={{ '--value': `${values[0]}` } as CSSProperties} type="range" min='0' max="10" step='1' value={values[0]} onChange={(e) => hundleChangeValue(e, 0)} className={styles.criteria__range} />
                                <Rating>{values[0]}</Rating>
                            </li>
                            <li className={styles.criteria__item}>
                                <label className={styles.criteria__label}>Текст</label>
                                <input style={{ '--value': `${values[1]}` } as CSSProperties} type="range" min='0' max="10" step='1' value={values[1]} onChange={(e) => hundleChangeValue(e, 1)} className={styles.criteria__range} />
                                <Rating>{values[1]}</Rating>
                            </li>
                            <li className={styles.criteria__item}>
                                <label className={styles.criteria__label}>Подача</label>
                                <input style={{ '--value': `${values[2]}` } as CSSProperties} type="range" min='0' max="10" step='1' value={values[2]} onChange={(e) => hundleChangeValue(e, 2)} className={styles.criteria__range} />
                                <Rating>{values[2]}</Rating>
                            </li>
                            <li className={styles.criteria__item}>
                                <label className={styles.criteria__label}>Мелодия</label>
                                <input style={{ '--value': `${values[3]}` } as CSSProperties} type="range" min='0' max="10" step='1' value={values[3]} onChange={(e) => hundleChangeValue(e, 3)} className={styles.criteria__range} />
                                <Rating>{values[3]}</Rating>
                            </li>
                            <li className={styles.criteria__item}>
                                <label className={styles.criteria__label}>Оригинальность</label>
                                <input style={{ '--value': `${values[4]}` } as CSSProperties} type="range" min='0' max="10" step='1' value={values[4]} onChange={(e) => hundleChangeValue(e, 4)} className={styles.criteria__range} />
                                <Rating>{values[4]}</Rating>
                            </li>
                        </ul>
                        <div className={styles.rating}>
                            <p className={styles.rating__title}>ОБЩАЯ ОЦЕНКА</p>
                            <Rating size='big'>{rating}</Rating>
                            <p className={styles.rating__desc}>из 70</p>
                        </div>
                    </div>
                </div>
                <div className={styles.footer}>
                    <Button color='default' padding='12px 18px 9px 18px'>Оставить отзыв</Button>
                    <Button color='accent' padding='14px 24px 10px 24px' onClick={onSubmit}>Отправить оценку</Button>
                </div>
            </div>
        </div>
    )
}
