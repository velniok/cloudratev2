import type { FC } from 'react'
import { ArtistHeaderInfo, ArtistHeaderInfoSkeleton, type IArtist } from '@/entities/artist'
import styles from './ArtistHeader.module.scss'
import { FollowArtistToggle, toggleFollowThunk } from '@/features/artist'

interface ArtistHeaderProps {
    artist: IArtist
}

export const ArtistHeader: FC<ArtistHeaderProps> = ({ artist }) => {
    return (
        <div className={styles.wrapper}>
            <div className="container">
                <ArtistHeaderInfo artist={artist} actions={<FollowArtistToggle thunk={toggleFollowThunk} isFollowed={artist.follow?.isFollowed ?? false} artistId={artist.id} />} />
            </div>
        </div>
    )
}
