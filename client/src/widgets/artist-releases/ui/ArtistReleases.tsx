import { PaginationButtons, Table, Title } from '@/shared/ui'
import styles from './ArtistReleases.module.scss'
import { FC } from 'react'
import { IArtist } from '@/entities/artist'
import { TStatus } from '@/shared/types'
import { TrackRow, TrackRowSkelton } from '@/entities/track'
import { useAppSelector, usePagination } from '@/shared/lib'
import { getArtistTracksThunk, selectArtistTracks, selectArtistTracksPagination, selectArtistTracksStatus } from '@/features/artist'

interface ArtistReleasesProps {
    artist: IArtist
    artistStatus: TStatus
}

export const ArtistReleases: FC<ArtistReleasesProps> = ({ artist, artistStatus }) => {

    const { hundleNextPage, hundlePrevPage, hundlePage, limit } = usePagination(getArtistTracksThunk, `/artist/${artist.id}`, 10, artist.id )
    const tracksStatus = useAppSelector(selectArtistTracksStatus)
    const tracks = useAppSelector(selectArtistTracks)
    const tracksPagination = useAppSelector(selectArtistTracksPagination)

    return (
        <div className={styles.wrapper}>
            <div className="container">
                <Title>ДИСКОГРАФИЯ АРТИСТА</Title>
                    <ul className={styles.list}>
                        {
                            tracksStatus === 'success' ?
                            <>
                            {
                                tracks.length > 0 ?
                                <>
                                <p className={styles.text}>Показано {((+tracksPagination?.page - 1) * limit) + 1}-{(limit * +tracksPagination?.page)} из {+tracksPagination?.total}</p>
                                {
                                    tracks.map((track) => {
                                        return <TrackRow key={track.id} track={track} />
                                    })
                                }
                                </>
                                :
                                <>Треков нет</>
                            }
                            </>
                            :
                            Array.from({ length: 10 }).map((_, index) => {
                                return <TrackRowSkelton key={index} />
                            })
                        }
                    </ul>
                    <div className={styles.bottom}>
                    {
                        tracksStatus === 'success' &&
                        <PaginationButtons
                            page={+tracksPagination.page}
                            totalPages={tracksPagination.totalPages}
                            hundleNextPage={hundleNextPage}
                            hundlePrevPage={hundlePrevPage}
                            hundlePage={hundlePage}
                        />
                    }
                    </div>
            </div>
        </div>
    )
}
