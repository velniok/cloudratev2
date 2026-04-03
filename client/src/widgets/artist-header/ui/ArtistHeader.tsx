import type { FC } from 'react'
import { ArtistHeaderInfo, ArtistHeaderInfoSkeleton, type IArtist } from '@/entities/artist'
import styles from './ArtistHeader.module.scss'
import { TStatus } from '@/shared/types'
import { FollowArtistToggle, toggleFollowThunk } from '@/features/artist'

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
                    <ArtistHeaderInfo artist={artist} actions={<FollowArtistToggle thunk={toggleFollowThunk} isFollowed={artist.follow.isFollowed} artistId={artist.id} />} />
                    :
                    <ArtistHeaderInfoSkeleton />
                }
            </div>
        </div>
    )
}
