import type { FC } from 'react'
import { ArtistHeaderInfo, type IArtist } from '@/entities/artist'
import styles from './ArtistHeader.module.scss'

interface ArtistHeaderProps {
    artist: IArtist
}

export const ArtistHeader: FC<ArtistHeaderProps> = ({ artist }) => {
    return (
        <div className={styles.wrapper}>
            <div className="container">
                <ArtistHeaderInfo artist={artist} />
            </div>
        </div>
    )
}
