import { FC } from 'react'
import styles from './SearchArtistsToTrack.module.scss'
import { getOptimizedAvatar } from '@/shared/lib'
import { Button, Cover } from '@/shared/ui'
import { IArtist, ITempArtist } from '@/entities/artist'
import { TStatus } from '@/shared/types'

interface SearchArtistsToTrackProps {
    searchList: boolean
    search: string
    resultStatus: TStatus
    result: IArtist[] | undefined
    setSearch: (prev: any) => void
    setErrors: (prev: any) => void
    artists: (IArtist | ITempArtist)[]
    setArtists: (prev: any) => void
}

export const SearchArtistsToTrack: FC<SearchArtistsToTrackProps> = ({ searchList, search, resultStatus, result, setErrors, setSearch, artists, setArtists }) => {

    const addArtist = (artist: IArtist | string) => {
        if (typeof artist === 'string') {
            const tempId = Date.now() + Math.floor(Math.random() * 1000)
            setArtists((prev: ITempArtist[]) => [...prev, { id: tempId, name: search, temp: true}])
        } else {
            setArtists((prev: IArtist[]) => [...prev, {...artist, temp: false}])
        }
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
                        <ul className={styles.search__list}>
                            <Button fontSize='12px' padding='8px 12px 8px 12px' color='accent' onClick={() => addArtist(search)}>Добавить в список</Button>
                        </ul>
                    }
                </>
                :
                <p className={styles.search__text}>Начните писать...</p>
            }
        </div>
    )
}

interface SearchArtistListToTrackProps {
    artists: (IArtist | ITempArtist)[]
    setArtists: (prev: any) => void
}

export const SearchArtistListToTrack: FC<SearchArtistListToTrackProps> = ({ artists, setArtists }) => {

    const removeArtist = (id: number | string) => {
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
