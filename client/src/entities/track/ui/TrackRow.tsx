import { FC, MouseEvent, useState } from 'react'
import styles from './TrackRow.module.scss'
import { ITrack } from '../model/types'
import { Cover, CriteriasPopup, Rating } from '@/shared/ui'
import { getOptimizedAvatar } from '@/shared/lib'
import { useNavigate } from 'react-router-dom'

interface TrackRowProps {
    track: ITrack
}

export const TrackRow: FC<TrackRowProps> = ({ track }) => {

    const navigate = useNavigate()

    const [criterias, setCriterias] = useState<boolean>(false)
    const handleOpenCriterias = (e: MouseEvent) => {
        e.stopPropagation()

        if (true) {
            document.dispatchEvent(new Event('closePopups'))
        }
        setCriterias(!criterias)
    }

    return (
       <li className={styles.row} onClick={() => navigate(`/track/${track.id}`)}>
            <div className={styles.row__left}>
                <Cover url={getOptimizedAvatar(track.coverUrl, 48, 48)} height='48px' width='48px' borderRadius='8px' />
                <div className={styles.row__info}>
                    <h3 className={styles.row__title}>{track.title}</h3>
                    <p className={styles.row__artistItem}>{track.artist.name}</p>
                    <ul className={styles.row__artistList}>
                        {
                            track.featArtists?.map((artist) => {
                                return (
                                    <li key={artist.id} className={styles.row__artistItem}>{artist.name}</li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
            <div className={styles.row__right}>
                <p className={styles.row__release}>{new Date(track.releaseData).getUTCFullYear()}</p>
                {/* <div className={styles.row__rating}>
                    {
                        track.avgRating ?
                        <Rating active={criterias} isHover={true} onClick={(e: MouseEvent) => handleOpenCriterias(e)}>{track.avgRating}</Rating>
                        :
                        <Rating>0</Rating>
                    }
                    <CriteriasPopup close={() => setCriterias(false)} position={'left'} show={criterias} avgCriterias={Object.values(track.avgCriterias)} />
                </div> */}
            </div>
       </li>
    )
}
