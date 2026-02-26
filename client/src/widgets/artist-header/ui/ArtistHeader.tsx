import type { FC } from 'react'
import { ArtistHeaderInfo, type IArtist } from '@/entities/artist'
import styles from './ArtistHeader.module.scss'
import { TStatus } from '@/shared/types'

interface ArtistHeaderProps {
    artist: IArtist
    artistStatus: TStatus
}

export const ArtistHeader: FC<ArtistHeaderProps> = ({ artist, artistStatus }) => {
    return (
        <div className={styles.wrapper}>
            <div className="container">
                {
                    artistStatus === 'success'
                    ?
                    <ArtistHeaderInfo artist={artist} />
                    :
                    <>Загрузка</>
                }
            </div>
        </div>
    )
}
