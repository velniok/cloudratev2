import { Button, Rating } from '@/shared/ui'
import styles from './ReviewCreate.module.scss'
import { createReviewApi } from '../api/reviewApi'
import { ChangeEvent, CSSProperties, FC, useEffect, useState } from 'react'
import { useAppSelector } from '@/shared/lib'
import { selectAuthUser } from '@/features/auth'
import { ITrack } from '@/entities/track'

interface ReviewCreateProps {
    track: ITrack
}

export const ReviewCreate: FC<ReviewCreateProps> = ({ track }) => {

    const user = useAppSelector(selectAuthUser)

    const ranges = ['Продакшн', 'Текст', 'Подача', 'Мелодия', 'Оригинальность']
    const [values, setValues] = useState<number[]>([5, 5, 5, 5, 5])
    const [rating, setRating] = useState<number>(20)
    const [text, setText] = useState<string>('')

    const [textarea, setTextarea] = useState<boolean>(false)

    useEffect(() => {
        setRating(prev => prev = values[0] + values[1] + values[2] + values[3] + values[4])
    }, [values])

    const hundleChangeValue = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        setValues((prev) => prev.map((prev, prevIndex) => {
            if (prevIndex === index) return Number(e.target.value)
            return prev
        }))
    }

    const hundleChangeTextarea = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value)
    }

    const onSubmit = async () => {
        await createReviewApi({
            text: text,
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
        <>
            <div className={styles.content}>
                <div className={styles.grade}>
                    <ul className={styles.criteria__list}>
                        {
                            ranges.map((range, index) => {
                                return (
                                    <li key={index} className={styles.criteria__item}>
                                        <label className={styles.criteria__label}>{range}</label>
                                        <input style={{ '--value': `${values[index]}` } as CSSProperties} type="range" min='0' max="10" step='1' value={values[index]} onChange={(e) => hundleChangeValue(e, index)} className={styles.criteria__range} />
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
                <div className={`${styles.textarea__wrapper} ${textarea ? styles.show : ''}`}>
                    <textarea className={styles.textarea} onChange={hundleChangeTextarea} value={text}></textarea>
                </div>
            </div>
            <div className={styles.footer}>
                <Button color='default' padding='12px 18px 9px 18px' onClick={() => setTextarea(!textarea)}>
                    {
                        textarea ?
                        "Скрыть отзыв"
                        :
                        "Оставить отзыв"
                    }
                </Button>
                <Button color='accent' padding='14px 24px 10px 24px' onClick={onSubmit}>Отправить оценку</Button>
            </div>
        </>
    )
}
