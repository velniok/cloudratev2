import { FC } from 'react'
import styles from './SearchArtistsToTrack.module.scss'
import { getOptimizedAvatar } from '@/shared/lib'
import { Cover } from '@/shared/ui'
import { IArtist } from '@/entities/artist'
import { TStatus } from '@/shared/types'

interface SearchArtistsToTrackProps {
    searchList: boolean
    search: string
    resultStatus: TStatus
    result: IArtist[] | undefined
    setSearch: (prev: any) => void
    setErrors: (prev: any) => void
    artists: IArtist[]
    setArtists: (prev: any) => void
}

export const SearchArtistsToTrack: FC<SearchArtistsToTrackProps> = ({ searchList, search, resultStatus, result, setErrors, setSearch, artists, setArtists }) => {

    const addArtist = (artist: IArtist) => {
        setArtists((prev: IArtist[]) => [...prev, artist])
        setSearch('')
        setErrors((prev: { [key: string]: string }) => ({ ...prev, artistIds: '' }))
    }

    return (
        <div className={`${styles.wrapper} ${searchList ? styles.open : ''}`}>
            {
                search !== '' ?
                resultStatus === 'success' &&
                <>
                    {
                        result?.length ?
                        <ul className={styles.search__list}>
                            {
                            result.map((artist) => {
                                if (artists.some((obj) => obj.id === artist.id)) return false
                                return (
                                    <li onClick={() => addArtist(artist)} key={artist.id} className={styles.search__item}>
                                        <Cover
                                            borderRadius='50%'
                                            width='50px'
                                            height='50px'
                                            url={getOptimizedAvatar(artist.avatarUrl ?? '', 50, 50)}
                                        />
                                        <p className={styles.search__name}>{artist.name}</p>
                                    </li>
                                )
                            })
                            }
                        </ul>
                        :
                        <p className={styles.search__text}>Ничего не найдено</p>
                    }
                </>
                :
                <p className={styles.search__text}>Начните писать...</p>
            }
        </div>
    )
}

interface SearchArtistListToTrackProps {
    artists: IArtist[]
    setArtists: (prev: any) => void
}

export const SearchArtistListToTrack: FC<SearchArtistListToTrackProps> = ({ artists, setArtists }) => {

    const removeArtist = (id: number) => {
        setArtists((prev: IArtist[]) => prev = prev.filter((artist: IArtist) => artist.id !== id))
    }

    return (
        <ul className={styles.search__artistList}>
            {
                artists.map((artist) => {
                    return (
                        <li onClick={() => removeArtist(artist.id)} key={artist.id} className={styles.search__artistItem}>
                            <Cover
                                borderRadius='50%'
                                width='32px'
                                height='32px'
                                url={getOptimizedAvatar(artist.avatarUrl ?? '', 32, 32)}
                            />
                            <p className={styles.search_artistName}>{artist.name}</p>
                            <i className="ph ph-x-circle"></i>
                        </li>
                    )
                })
            }
        </ul>
    )
}
