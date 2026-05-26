import { FC, MouseEvent } from 'react'
import styles from './ArtistRowAdmin.module.scss'
import { IArtist } from '../model/types'
import { Link } from 'react-router-dom'
import { Cover, Rating } from '@/shared/ui'
import { getOptimizedAvatar } from '@/shared/lib'

interface ArtistRowAdminProps {
    artist: IArtist
    hundleUpdateArtist: (e: MouseEvent, id: number) => void
    hundleDeleteArtist: (e: MouseEvent, id: number) => void
}

export const ArtistRowAdmin: FC<ArtistRowAdminProps> = ({ artist, hundleUpdateArtist, hundleDeleteArtist }) => {
    return (
        <li className={styles.item}>
            <Link to={`/artist/${artist.id}`} className={styles.link}>
                <span className={styles.id}>#{artist.id}</span>
                <div className={styles.artist}>
                    <Cover
                        url={getOptimizedAvatar(artist.avatarUrl ?? '', 32, 32)}
                        width='32px'
                        height='32px'
                        borderRadius='50%'
                    />
                    <h3 className={styles.artist__name}>{artist.name}</h3>
                </div>
                {
                    artist.avgRating ? <Rating>{artist.avgRating}</Rating> : <Rating>-</Rating>
                }
                <span className={styles.tracks}>{artist.tracksCount}</span>
                <div className={styles.actions}>
                    <i className={`ph ph-pencil-simple ${styles.actions__edit}`} onClick={(e) => hundleUpdateArtist(e, artist.id)}></i>
                    <i className={`ph ph-trash ${styles.actions__delete}`} onClick={(e) => hundleDeleteArtist(e, artist.id)}></i>
                </div>
            </Link>
        </li>
    )
}
