import { InfoIcon, InputRange, Rating } from '@/shared/ui'
import styles from './LeaveReview.module.scss'
import { FC, useState } from 'react'
import { IReview } from '../model/types'

interface LeavedReviewProps {
    review: IReview
}

export const LeavedReview: FC<LeavedReviewProps> = ({ review }) => {

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
    const values = [review.criteria1, review.criteria2, review.criteria3, review.criteria4, review.criteria5]
    const [info, setInfo] = useState<boolean>(false)

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
                                    <li className={styles.info__item}>
                                        <h4 className={styles.info__title}>{range}: </h4>
                                        <p className={styles.info__desc}>{infoDesc[index]}</p>
                                    </li>
                                )
                            })
                            :
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
