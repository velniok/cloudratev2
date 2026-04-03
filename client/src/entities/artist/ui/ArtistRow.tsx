import { FC, ReactNode } from 'react'
import styles from './ArtistRow.module.scss'
import { IArtist } from '../model/types'
import { useNavigate } from 'react-router-dom'
import { getOptimizedAvatar, pluralize } from '@/shared/lib'
import { Cover } from '@/shared/ui'

interface ArtistRowProps {
    artist: IArtist
    action?: ReactNode
}

export const ArtistRow: FC<ArtistRowProps> = ({ artist, action }) => {

    const navigate = useNavigate()

    return (
       <li className={styles.row} onClick={() => navigate(`/artist/${artist.id}`)}>
            <div className={styles.row__left}>
                <Cover url={getOptimizedAvatar(artist.avatarUrl, 48, 48)} height='48px' width='48px' borderRadius='8px' />
                <div className={styles.row__info}>
                    <h3 className={styles.row__name}>{artist.name}</h3>
                    <p className={styles.row__followers}>{artist.follow.followersCount} {pluralize(artist.follow.followersCount, 'Подписчик', 'Подписчика', 'Подписчиков')}</p>
                </div>
            </div>
            <div className={styles.row__right}>
                <div className={styles.row__action}>
                    {action}
                </div>
            </div>
       </li>
    )
}
