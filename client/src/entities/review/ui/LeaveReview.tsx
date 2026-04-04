import { Button, InfoIcon, InputRange, Rating } from '@/shared/ui'
import styles from './LeaveReview.module.scss'
import { ChangeEvent, FC, useEffect, useState } from 'react'
import { IReviewReq } from '@/features/review'
import { IReview } from '../model/types'
import { useAppSelector } from '@/shared/lib'
import { selectAuthUser } from '@/features/auth'

interface LeaveReviewProps {
    onSubmit?: (req: IReviewReq) => void
    onSubmitText?: (req: { id: number, req: { text: string, userId: number } }) => void
    userId: number
    trackId: number
    textOnly?: boolean
    review?: IReview
    errorText: string
    clearErrorText: () => void
    createReviewLoading: boolean
}

export const LeaveReview: FC<LeaveReviewProps> = ({ onSubmit, userId, trackId, textOnly, review, errorText, onSubmitText, clearErrorText, createReviewLoading }) => {

    const authUser = useAppSelector(selectAuthUser)

    useEffect(() =>{
        if (textOnly) {
            setValues(prev => prev.map((_, index) => {
                const criteria = `criteria` + `${index + 1}`
                return (review as any)[criteria]
            }))
        }
    }, [])

    const ranges = ['Текст', 'Бит и Ритм', 'Мастерство Подачи', 'Аранжировка', 'Атмосфера и Эмоции']
    const infoDesc = [
        ` - Техника: Рифмы, игра слов, поэтические приемы.
 - Содержание: Оригинальность сюжета, глубина мысли, искренность эмоций.
 - Запоминаемость: Есть ли "крючки" и строчки, которые хочется повторить?`,
        ` - Моторика: Насколько физически ощутим и притягателен ритм?
 - Сложность: Интересные ли ритмические рисунки, сбивки, изменения?
 - Энергия: Трек заряжает, расслабляет или вводит в транс?`,
        ` - Флоу: Ритмическая уникальность, умение "кататься" по биту.
 - Дикция: Четкость произношения, акценты.
 - Эмоциональность: Передача настроения через голос: агрессия, меланхолия, радость.`,
        ` - Качество: Насколько чистый, современный и профессиональный звук?
 - Текстуры: Богатство и разнообразие звуковых слоев (пады, синты, эффекты).
 - Динамика: Есть ли развитие от куплета к припеву, интересные переходы, брейкдауны?
 - Детали: Слышны ли уникальные звуковые вкрапления, которые открываются при многократном прослушивании?`,
        ` - Целостность: Насколько все компоненты (текст, бит, вокал, продакшн) работают на одну общую идею?
 - Уникальность: Есть ли у трека своё неповторимое лицо и настроение?
 - Эмоциональный отклик: Какой след оставляет трек после прослушивания? Восторг? Грусть? Прилив сил?`
    ]
    const [values, setValues] = useState<number[]>([5, 5, 5, 5, 5])
    const [rating, setRating] = useState<number>(20)
    const [text, setText] = useState<string>('')
    const [info, setInfo] = useState<boolean>(false)

    const [textarea, setTextarea] = useState<boolean>(false)

    useEffect(() => {
        setRating(prev => prev = Math.round( ( (values[0] * 1.3) + (values[1] * 1.3) + (values[2] * 1.3) + (values[3] * 1.3) + (values[4] * 1.8) ) ))
    }, [values])

    const hundleChangeValue = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        setValues((prev) => prev.map((prev, prevIndex) => {
            if (prevIndex === index) return Number(e.target.value)
            return prev
        }))
    }

    const hundleChangeTextarea = (e: ChangeEvent<HTMLTextAreaElement>) => {
        clearErrorText()
        setText(e.target.value)
    }

    return (
        <>
            <div className={styles.content}>
                <div className={styles.grade}>
                    <ul className={styles.criteria__list}>
                        <span className={`${styles.info__btn} ${info ? styles.active : ''}`}>
                            <InfoIcon onClick={() => setInfo(!info)} />
                        </span>
                        {
                            info ?
                            ranges.map((range, index) => {
                                return (
                                    <li className={styles.info__item} key={index}>
                                        <h4 className={styles.info__title}>{range}: </h4>
                                        <p className={styles.info__desc}>{infoDesc[index]}</p>
                                    </li>
                                )
                            })
                            :
                            <>
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
                    <textarea
                        placeholder='Напишите ваш отзыв о треке (более 300 и менее 3000 символов)...'
                        className={`${styles.textarea} ${errorText && styles.error}`}
                        onChange={hundleChangeTextarea}
                        value={text}
                        minLength={100}
                        maxLength={3000}
                    />
                    {
                        errorText &&
                            <p className={styles.errorMessage}>
                                <InfoIcon />
                                {errorText}
                            </p>
                    }
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
                        textarea && review && authUser &&
                        <Button
                            color='accent'
                            padding='14px 24px 10px 24px'
                            onClick={() => onSubmitText?.({
                                id: review.id,
                                req: {
                                    text: text,
                                    userId: authUser.id,
                                }
                            })}
                        >
                            {
                                createReviewLoading ? 'Загрузка..' : 'Отправить отзыв'
                            }
                        </Button>
                    }
                    </>
                    :
                    <Button
                        color='accent'
                        padding='14px 24px 10px 24px'
                        onClick={() => onSubmit?.({
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
                        {
                            createReviewLoading ? 'Загрузка..' : 'Отправить оценку'
                        }
                    </Button>
                }
            </div>
        </>
    )
}