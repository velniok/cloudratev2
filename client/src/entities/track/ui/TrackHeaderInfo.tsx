import { Link, useNavigate } from 'react-router-dom'
import styles from './TrackHeaderInfo.module.scss'
import type { ITrack } from '../model/types'
import { Cover, Rating } from '@/shared/ui'
import { useState, type FC } from 'react'

interface TrackHeaderInfoProps {
    track: ITrack
}

export const TrackHeaderInfo: FC<TrackHeaderInfoProps> = ({ track }) => {

    const navigate = useNavigate()

    const [criterias, setCriterias] = useState<boolean>(false)

    return (
        <div className={styles.inner}>
            <Cover url={track.coverUrl} width='200px' height='200px' borderRadius='12px' />
            <div className={styles.info}>
                <ul className={styles.artist__list}>
                    {
                        track.artists.map((artist) => {
                            return (
                                <li key={artist.id} className={styles.artist__item} onClick={() => navigate(`/artist/${artist.id}`)}>
                                    <Cover width='32px' height='32px' borderRadius='50%' url={artist.avatarUrl} />
                                    <h3 className={styles.artist__name}>{artist.name}</h3>
                                </li>
                            )
                        })
                    }
                </ul>
                <h2 className={styles.title}>{track.title}</h2>
                <div className={`${styles.rating} ${criterias ? styles.open : ''}`} onClick={() => setCriterias(!criterias)}>
                    <div className={`${styles.criterias} ${criterias ? styles.open : ''}`}>
                        <p className={styles.criterias__text}>Средние оценки по критериям</p>
                        <ul className={styles.criterias__list}>
                            <li className={styles.criterias__item}>
                                <p className={styles.criterias__title}>Продакшн</p>
                                <div className={styles.criterias__line}>
                                    <div className={styles.criterias__fill} style={{ width: `${track.avgCriterias.criteria1 * 10}%` }}></div>
                                </div>
                                <span className={styles.criterias__rating}>{track.avgCriterias.criteria1}</span>
                            </li>
                            <li className={styles.criterias__item}>
                                <p className={styles.criterias__title}>Текст</p>
                                <div className={styles.criterias__line}>
                                    <div className={styles.criterias__fill} style={{ width: `${track.avgCriterias.criteria2 * 10}%` }}></div>
                                </div>
                                <span className={styles.criterias__rating}>{track.avgCriterias.criteria2}</span>
                            </li>
                            <li className={styles.criterias__item}>
                                <p className={styles.criterias__title}>Подача</p>
                                <div className={styles.criterias__line}>
                                    <div className={styles.criterias__fill} style={{ width: `${track.avgCriterias.criteria3 * 10}%` }}></div>
                                </div>
                                <span className={styles.criterias__rating}>{track.avgCriterias.criteria3}</span>
                            </li>
                            <li className={styles.criterias__item}>
                                <p className={styles.criterias__title}>Мелодия</p>
                                <div className={styles.criterias__line}>
                                    <div className={styles.criterias__fill} style={{ width: `${track.avgCriterias.criteria4 * 10}%` }}></div>
                                </div>
                                <span className={styles.criterias__rating}>{track.avgCriterias.criteria4}</span>
                            </li>
                            <li className={styles.criterias__item}>
                                <p className={styles.criterias__title}>Оригинальность</p>
                                <div className={styles.criterias__line}>
                                    <div className={styles.criterias__fill} style={{ width: `${track.avgCriterias.criteria5 * 10}%` }}></div>
                                </div>
                                <span className={styles.criterias__rating}>{track.avgCriterias.criteria5}</span>
                            </li>
                        </ul>
                    </div>
                    <Rating>{track.avgRating}</Rating>
                    <div className={styles.rating__info}>
                        <p className={styles.rating__title}>СРЕДНИЙ БАЛЛ</p>
                        <p className={styles.rating__desc}>На основе {track.reviews.length} оценок</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
