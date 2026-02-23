import { Link } from 'react-router-dom'
import styles from './TrackHeaderInfo.module.scss'
import type { ITrack } from '../model/types'
import { Cover } from '@/shared/ui'
import type { FC } from 'react'

interface TrackHeaderInfoProps {
    track: ITrack
}

export const TrackHeaderInfo: FC<TrackHeaderInfoProps> = ({ track }) => {

    return (
        <div className={styles.inner}>
            <Cover size={`maxSize`} />
            <div className={styles.info}>
                <Link to={'/artist'} className={styles.artist}>
                    <div className={styles.avatar}></div>
                    <h3 className={styles.name}>{track.artist}</h3>
                </Link>
                <h2 className={styles.title}>{track.title}</h2>
                <div className={styles.rating}>
                    <p className={styles.rating__num}>{track.rating}</p>
                    <div className={styles.rating__info}>
                        <p className={styles.rating__title}>СРЕДНИЙ БАЛЛ</p>
                        <p className={styles.rating__desc}>На основе 128 оценок</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
