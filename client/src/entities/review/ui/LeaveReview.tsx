import { Button, InputRange, Rating } from '@/shared/ui'
import styles from './LeaveReview.module.scss'
import { ChangeEvent, FC, useEffect, useState } from 'react'
import { IReviewReq } from '@/features/review'
import { IReview } from '../model/types'

interface LeaveReviewProps {
    onSubmit: (req: IReviewReq | { id: number, req: { text: string } }) => void
    userId: number
    trackId: number
    textOnly?: boolean
    review?: IReview
}

export const LeaveReview: FC<LeaveReviewProps> = ({ onSubmit, userId, trackId, textOnly, review }) => {

    useEffect(() =>{
        if (textOnly) {
            setValues(prev => prev.map((_, index) => {
                const criteria = `criteria` + `${index + 1}`
                return review[criteria]
            }))
        }
    }, [])

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

    return (
        <>
            <div className={styles.content}>
                <div className={styles.grade}>
                    <ul className={styles.criteria__list}>
                        {
                            textOnly ?
                            <>
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
                            </>
                            :
                            <>
                                {
                                    ranges.map((range, index) => {
                                        return (
                                            <InputRange
                                                key={index}
                                                label={range}
                                                values={values}
                                                index={index}
                                                onChange={(e) => hundleChangeValue(e, index)}
                                            />
                                        )
                                    })
                                }
                            </>
                        }
                    </ul>
                    <div className={styles.rating}>
                        <p className={styles.rating__title}>ОБЩАЯ ОЦЕНКА</p>
                        <Rating size='big'>{rating}</Rating>
                        <p className={styles.rating__desc}>из 70</p>
                    </div>
                </div>
                <div className={`${styles.textarea__wrapper} ${textarea ? styles.show : ''}`}>
                    <textarea placeholder='Напишите ваш отзыв о треке (более 100 и менее 3000 символов)...' className={styles.textarea} onChange={hundleChangeTextarea} value={text}></textarea>
                </div>
            </div>
            <div className={styles.footer}>
                <Button
                    color='default'
                    padding='12px 18px 9px 18px'
                    onClick={() => setTextarea(!textarea)}
                >
                    {
                        textarea ?
                        "Скрыть отзыв"
                        :
                        "Оставить отзыв"
                    }
                </Button>
                {
                    textOnly ?
                    <>
                    {
                        textarea &&
                        <Button
                            color='accent'
                            padding='14px 24px 10px 24px'
                            onClick={() => onSubmit({
                                id: review.id,
                                req: {
                                    text: text
                                }
                            })}
                        >
                            Отправить отзыв
                        </Button>
                    }
                    </>
                    :
                    <Button
                        color='accent'
                        padding='14px 24px 10px 24px'
                        onClick={() => onSubmit({
                            text: text,
                            userId: userId,
                            trackId: trackId,
                            criteria1: values[0],
                            criteria2: values[1],
                            criteria3: values[2],
                            criteria4: values[3],
                            criteria5: values[4],
                        })}
                    >
                        Отправить оценку
                    </Button>
                }
            </div>
        </>
    )
}