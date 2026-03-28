import { FC, useState } from 'react'
import styles from './ArtistCard.module.scss'
import { IArtist } from '../model/types'
import { Cover } from '@/shared/ui'
import { Link } from 'react-router-dom'
import { getOptimizedAvatar } from '@/shared/lib'

interface ArtistCardProps {
    artist: IArtist
}

export const ArtistCard: FC<ArtistCardProps> = ({ artist }) => {

    const [isHovered, setIsHovered] = useState<boolean>(false)

    return (
        <div className={styles.card} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <Link to={`/artist/${artist.id}`}>
                <Cover className={styles.avatar} isHovered={isHovered} width='140px' height='140px' borderRadius='50%' url={getOptimizedAvatar(artist.avatarUrl, 140, 140)} />
            </Link>
            <h3 className={styles.name}>{artist.name}</h3>
        </div>
    )
}
